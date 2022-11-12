import { UserModel } from "../UserModel";

export class AuthenticationResponse{
    token :string;
    refreshToken:string;
    user:UserModel;
}