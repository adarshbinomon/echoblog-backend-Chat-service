import { Request, Response } from "express";
import { UserData } from "../../../utils/interface";
import { Dependencies } from "../../../utils/dependencies.interface";

export const updateUserController = async (dependencies: Dependencies,data: UserData) => {
  const {
    consumeUsecase: { updateUserUsecase },
  } = dependencies;
  
  const response = await updateUserUsecase(dependencies)?.executeFunction(data);
};
 