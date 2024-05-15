import { Dependencies } from "../../../utils/interfaces/dependencies.interface";

export const getConversationsUsecase = (dependencies: Dependencies) => {
  const {
    repository: { chatRepository },
  } = dependencies;

  const executeFunction = async (following: string[],userId:string) => {
    try {
      const conversations = await chatRepository.getConversations(following,userId);
      const participantsArray = conversations.participantsArray;

      const participants = participantsArray.map((conversation: any) => {
        return conversation._doc;
      });


      if (conversations.status) {
        return {
          status: true,
          message: conversations.message,
          conversations: participants,
        };
      } else {
        return { conversations };
      }
    } catch (error) {
      return { status: false, message: "error in get conversations usecase" };
    }
  };
  return { executeFunction };
};
