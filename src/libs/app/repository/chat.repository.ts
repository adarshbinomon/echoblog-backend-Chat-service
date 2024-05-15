import { schema } from "../database";
const { User, Message, Conversation } = schema;
import { io } from "../../../app";
import { getRecieverSocketId } from "../../../socket/socket";

export default {
  sendMessage: async (
    senderId: string,
    recieverId: string,
    message: string
  ) => {
    try {
      const conversation = await Conversation.findOne({
        participants: { $all: [senderId, recieverId] },
      });

      const recieverSocketId = getRecieverSocketId(recieverId);

      if (!conversation) {
        const newConversation = await Conversation.create({
          participants: [senderId, recieverId],
        });
        const newMessage = new Message({
          senderId,
          recieverId,
          message,
        });

        if (newMessage) {
          newConversation.messages.push(newMessage._id);

          if (recieverSocketId) {
            io.to(recieverSocketId).emit("newMessage", newMessage);
          }
        }

        const [savedConversation, savedMessage] = await Promise.all([
          newConversation.save(),
          newMessage.save(),
        ]);

        if (savedConversation && savedMessage) {
          return {
            status: true,
            message: "message saved",
            response: { savedConversation, savedMessage },
          };
        } else {
          return { status: false, message: "message save failed" };
        }
      } else {
        const newMessage = new Message({
          senderId,
          recieverId,
          message,
        });

        if (newMessage) {
          conversation.messages.push(newMessage._id);
          if (recieverSocketId) {
            console.log(recieverSocketId, "recieverSocketId");
            io.to(recieverSocketId).emit("newMessage", newMessage);
          }
        }

        const savedMessage = await newMessage.save();
        const savedConversation = await conversation.save();

        if (savedMessage) {
          return {
            status: true,
            message: "message saved",
            response: { savedMessage },
          };
        } else {
          return { status: false, message: "message save failed" };
        }
      }
    } catch (error) {
      console.error("Error in sendMessage:", error);
      return { status: false, message: "message save failed" };
    }
  },

  getMessages: async (senderId: string, recieverId: string) => {
    try {
      const conversation = await Conversation.findOne({
        participants: { $all: [senderId, recieverId] },
      }).populate("messages");
      if (conversation) {
        return {
          status: true,
          message: "conversation found",
          conversation: conversation,
        };
      } else {
        return {
          status: false,
          message: "conversation not found",
        };
      }
    } catch (error) {
      console.log("error in finding conversation repository:", error);
      return { status: false, message: "error in finding conversation" };
    }
  },

  getConversations: async (following: string[], userId: string) => {
    try {
      const conversations = await Conversation.find({
        $and: [
          { participants: { $in: following } }, // Match participants in 'following' array
          { participants: userId }, // Match specific 'userId'
        ],
      })
        .sort({ updatedAt: -1 })
        .populate({
          path: "participants",
          match: { _id: { $in: following } },
          select: "userName name email profilePicture",
        })
        .select("participants");

      console.log("conversations", conversations);

      const participantsArray = conversations.map((conversation) => {
        const firstParticipant = conversation.participants[0];
        return {
          ...firstParticipant,
        };
      });

      if (conversations) {
        return {
          status: true,
          message: "conversations found",
          participantsArray,
        };
      } else {
        return { status: false, message: "error in finding conversation" };
      }
    } catch (error) {
      return { status: false, message: "error in finding conversation" };
    }
  },

  videoCall: async (recieverId: string, senderId: string, roomId: string) => {
    try {
      const reciever = await User.findById(recieverId);
      const sender = await User.findById(senderId);

      if (reciever) {
        const recieverSocketId = getRecieverSocketId(reciever._id);
        if (recieverSocketId) {
          const callDetails = { sender, roomId };
          io.to(recieverSocketId).emit("videoCall", callDetails);
        }
      }

      return { status: true, message: `Calling ${reciever?.name}` };
    } catch (error) {
      console.log("error in videaCall repo", error);
      return { status: true, message: `error in calling` };
    }
  },
};
