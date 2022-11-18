import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User"
import { RegisterRequest } from "../models/request/register.request";
import { JWT } from "../security/jwt";
import { LoginRequest } from "../models/request/login.request";
import { EntityToModel } from "../util/EntityToModel";
import { RefreshToken } from "../entity/RefreshToken";
import { RefreshTokenRequest } from "../models/request/RefreshTokenRequest";
import { PasswordHash } from "../security/passwordHash";
import { AuthenticationResponse } from "../models/response/authentication.response";


exports.register = async (req: Request, res: Response, next) => {
    try {
        const userRepo = AppDataSource.getRepository(User);
        const body: RegisterRequest = req.body;

        //validate body
        if (body.password !== body.confirmPassword)
            throw new Error("password not matched");


        //validate email already used
        if (await userRepo.findOneBy({ email: body.email }))
            throw new Error("email already in use");


        //store user
        const user = new User();

        user.firstName = body.username;
        user.lastName = body.username;
        user.username = body.username;
        user.email = body.email;
        user.password = await PasswordHash.hashPassword(body.password);
        user.age = 25;

        await userRepo.save(user);
        const authenticationResponse: AuthenticationResponse = new AuthenticationResponse();
        authenticationResponse.user = EntityToModel.userModel(user);

        //impleament token generation
        const security = await JWT.generateToken(user);
        authenticationResponse.token = security.token;
        authenticationResponse.refreshToken = security.refreshToken;

        res.json(authenticationResponse);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

exports.login = async (req: Request, res: Response, next) => {
    const request: LoginRequest = req.body;
    const userRepo = AppDataSource.getRepository(User);

    try {
        const userxs = await userRepo.findOneBy({ email: request.username });
        var user = await userRepo.findOne(
            { where:
                { email: request.email }
            }
        );
        if (!user)
            throw new Error("Email does not exist");

        if (!await PasswordHash.isPasswordValid(request.password, user.password))
            throw new Error("Password is invalid");

        const { token, refreshToken } = await JWT.generateToken(user);

        const authenticationResponse = new AuthenticationResponse();
        console.log("------------")
        authenticationResponse.user = EntityToModel.userModel(user);
        authenticationResponse.token = token;
        authenticationResponse.refreshToken = refreshToken;

        res.json(authenticationResponse);

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.refreshToken = async (req: Request, res: Response, next) => {
    try {
        const request: RefreshTokenRequest = req.body;

        if (!JWT.isTokenValid(request.token))
            throw new Error("Token in not validate");

        const jwtId = JWT.getJwtId(request.token);

        const user = await AppDataSource.getRepository(User).findOneBy({ id: JWT.getJwtPayloadValueByKey(request.token, "id") });

        if (!user) throw new Error("User not exist");

        const refreshTokenRepo = AppDataSource.getRepository(RefreshToken);
        const refreshToken = await refreshTokenRepo.findOneBy({ id: request.refreshToken });

        if (!await JWT.isRefreshTokenLinkedToToken(refreshToken, jwtId))
            throw new Error("Token does not match with refresh token");

        if (await JWT.isRefreshTokenExpired(refreshToken))
            throw new Error("Refresh token has expired");

        if (await JWT.isRefreshTokenUsedOrInvalidated(refreshToken))
            throw new Error("Refresh token has been used or invalidated");

        refreshToken.used = true;

        refreshTokenRepo.save(refreshToken);

        const security = await JWT.generateToken(user);

        const authenticationResponse = new AuthenticationResponse();

        authenticationResponse.user = EntityToModel.userModel(user);
        authenticationResponse.token = security.token;
        authenticationResponse.refreshToken = security.refreshToken;
        res.json(authenticationResponse);
        return authenticationResponse;
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}