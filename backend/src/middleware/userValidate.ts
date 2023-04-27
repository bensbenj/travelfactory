import { NextFunction, Request, Response } from "express";
import { userSchema } from "../schema/users";

export const userValidate = (req: Request, res: Response, next: NextFunction) => {
    const isValidate = userSchema.validate(req.body);
    if(!isValidate) {
        res.status(401).json({
            success: false,
            message: "User is not validate",
            data: isValidate
        });
    }
    next();
};
