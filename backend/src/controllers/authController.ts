import { Request, Response } from "express"
import * as authService from "../services/authService"

const authChecking = async (req: Request, res: Response) => {
    try{
        const {name, email, password} = req.body;

        const user = await authService.register(
            name,
            email,
            password
        )
        res.status(201).json(user);
    }
    catch(error: any){
        res.status(400).json({
            message: error.message
        })
    }
}

const loginChecking = async( req: Request, res: Response) => {
        try{
            const { email, password} = req.body;

            const result = await authService.login(
                email,
                password
            )
            res.status(200).json(result);
        }
        catch(error: any){
            res.status(400).json({
                message: error.message
            })
        }
}

export { authChecking, loginChecking }