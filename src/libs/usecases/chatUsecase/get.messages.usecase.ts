import { Dependencies } from "../../../utils/interfaces/dependencies.interface";

export const getMessagesUseCase = (dependencies: Dependencies) => {
  const {
    repository: { chatRepository },
  } = dependencies;

  const executeFunction = async (senderId: string, recieverId: string) => {
    try {
      const conversation = await chatRepository.getMessages(
        senderId,
        recieverId
      );
      if (conversation.status) {
        return {
          status: true,
          message: conversation.message,
          conversation: conversation.conversation,
        };
      } else {
        return {
          status: false,
          message: conversation.message,
        };
      }
    } catch (error) {
      console.log("error in get messages usecase:", error);
      return { status: false, message: "error in get messages usecase" };
    }
  };
  return { executeFunction };
};
