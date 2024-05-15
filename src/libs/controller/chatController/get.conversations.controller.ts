import { Request, Response } from "express";
import { Dependencies } from "../../../utils/interfaces/dependencies.interface";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";
import { UserData } from "../../../utils/interfaces/interface";

interface AuthenticatedRequest extends Request {
  user?: UserData;
}
export default (dependencies: Dependencies) => {
  const {
    useCase: { getConversationsUsecase },
  } = dependencies;

  const getConversationsController = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { following } = req.body;
      const { user } = req;

     

      const conversations = await getConversationsUsecase(
        dependencies
      ).executeFunction(following, user?._id);

      if (conversations) {
        res.status(HttpStatus.OK).json(conversations.conversations);
      } else {
        res.status(HttpStatus.NOT_FOUND).json({ error: "No conversations found" });
      }
    } catch (error) {
      console.error("Error in getConversationsController:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
  };

  return getConversationsController;
};
