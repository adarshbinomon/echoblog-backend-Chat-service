import sendMessageController from "./send.message.cotroller";
import getMessagesController from "./get.messages.controller";
import getConversationsController from "./get.conversations.controller";
import { Dependencies } from "../../../utils/interfaces/dependencies.interface";
import sendVideoCallController from "./send.videocall.controller";

export default (dependencies: Dependencies) => {
  return {
    sendMessageController: sendMessageController(dependencies),
    getMessagesController: getMessagesController(dependencies),
    getConversationsController: getConversationsController(dependencies),
    sendVideoCallController: sendVideoCallController(dependencies),
  };
};
