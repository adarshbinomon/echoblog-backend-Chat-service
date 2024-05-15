import { Dependencies } from "../../../utils/interfaces/dependencies.interface";

export const sendVideocallUseCase = (dependencies: Dependencies) => {
  const {
    repository: { chatRepository },
  } = dependencies;

  const executeFunction = async (
    recieverId: string,
    senderId: string,
    roomId: string
  ) => {
    try {
      const response = await chatRepository.videoCall(
        recieverId,
        senderId,
        roomId
      );

      if (response.status) {
        return response;
      }
    } catch (error) {
      console.log("error in send videocall usecase", error);
      return { status: false, message: "error in send videocall usecase" };
    }
  };

  return { executeFunction };
};
