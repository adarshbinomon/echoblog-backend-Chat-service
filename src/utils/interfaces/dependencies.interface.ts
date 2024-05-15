export interface Dependencies {
  useCase: UseCase;
  repository: Repository;
  consumeUsecase: ConsumeUsecase;
}

export interface ConsumeUsecase {
  createUserUsecase: Function;
  updateUserUsecase: Function;
}

export interface UseCase {
  sendMessageUsecase: Function;
  getMessagesUseCase: Function;
  getConversationsUsecase: Function;
  sendVideocallUseCase: Function;
}

export interface Repository {
  chatRepository: ChatRepository;
}

export interface ChatRepository {
  sendMessage: Function;
  getMessages: Function;
  getConversations: Function;
  videoCall: Function;
}
