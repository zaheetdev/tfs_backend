import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { EmployeeRequest } from "../models/request/employee.request";
import { PasswordHash } from "../security/passwordHash";

exports.createEmployee = async (req: Request, res: Response, next) => {
    try {
        const userRepo = AppDataSource.getRepository(User);
        const body: EmployeeRequest = req.body;

        if (await userRepo.findOneBy({ email: body.email })) {
            throw new Error("email already in use");
        }
        console.log(body)
        const user = new User();
        user.firstName = body.firstName;
        user.lastName = body.lastName;
        user.username = body.userName;
        user.email = body.email;
        user.password = await PasswordHash.hashPassword(body.password || "admin@123");
        user.age = body.age;
        user.idStore = body.idStore
        user.idProfile = 2
        user.createdBy = body.createdBy

        await userRepo.save(user);
        return res.json(user)

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}