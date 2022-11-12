import { User } from "../entity/User";
import { UserModel } from "../models/UserModel";

export class EntityToModel{
    
    public static userModel(user:User):UserModel
    {   
        const userModel:UserModel = new UserModel();
        userModel.id = user.id;
        userModel.username = user.username;
        userModel.email = user.email;
        userModel.age = 25;      
        userModel.idStore = user.idStore;
        console.log(userModel)
        return userModel;
    }
}