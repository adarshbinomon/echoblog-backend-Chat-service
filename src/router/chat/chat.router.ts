import express from "express";
import { chatController } from "../../libs/controller";
import { verifyUser } from "../../utils/jwt/verify.user";
import { Dependencies } from "../../utils/interfaces/dependencies.interface";

export default (dependencies: Dependencies) => {
  const router = express();

  const {
    sendMessageController,
    getMessagesController,
    getConversationsController,
    sendVideoCallController,
  } = chatController(dependencies);

  router.post("/get-messages/:userId", verifyUser, getMessagesController);
  router.post("/send/:userId", verifyUser, sendMessageController);
  router.post("/get-conversations", verifyUser, getConversationsController);
  router.post("/videocall/:recieverId", verifyUser, sendVideoCallController);

  return router;
};
