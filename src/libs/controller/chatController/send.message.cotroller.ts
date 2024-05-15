import { Request, Response } from "express";
import { Dependencies } from "../../../utils/interfaces/dependencies.interface";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";

export default (dependencies: Dependencies) => {
  const {
    useCase: { sendMessageUsecase },
  } = dependencies;

  const sendMessageController = async (req: Request, res: Response) => {
    try {
      const recieverId = req.params.userId;
      const { senderId, message } = req.body;

      const response = await sendMessageUsecase(dependencies).executeFunction(
        senderId,
        recieverId,
        message
      );

      if (response.status) {
        res
          .status(HttpStatus.CREATED)
          .json({
            status: true,
            message: "message sent successfully",
            sentMessage: response.savedMessage,
          });
      }
    } catch (error) {
      console.log("error in send message controller:", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: false, message: "message not sent successfully" });
    }
  };

  return sendMessageController;
};
