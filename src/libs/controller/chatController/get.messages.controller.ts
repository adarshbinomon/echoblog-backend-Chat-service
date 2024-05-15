import { Request, Response } from "express";
import { Dependencies } from "../../../utils/interfaces/dependencies.interface";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";

export default (dependencies: Dependencies) => {
  const {
    useCase: { getMessagesUseCase },
  } = dependencies;

  const getMessagesController = async (req: Request, res: Response) => {
    try {
      const recieverId = req.params.userId;
      const { senderId } = req.body;
      
      
      const conversation = await getMessagesUseCase(
        dependencies
      ).executeFunction(senderId, recieverId);
      if (conversation.status) {
        res.status(HttpStatus.OK).json({
          status: true,
          message: conversation.message,
          conversation: conversation.conversation,
        });
      } else {
        res.status(HttpStatus.NOT_FOUND).json({ status: false, message: conversation.message });
      }
    } catch (error) {
      console.log("error in get messages controller:", error);
      res.status(HttpStatus.NOT_FOUND).json("Conversation not found");
    }
  };
  return getMessagesController;
};
