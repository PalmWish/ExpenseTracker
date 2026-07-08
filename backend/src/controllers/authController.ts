import { Request, Response } from "express"
import * as authService from "../services/authService"
import user from "../models/user";

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

const profile = async (req: Request, res: Response) => {
    return res.json({
        message: "Authenticated",
        userId: req.userId
    })
}

const idUser = async (req: Request, res: Response) =>{
    
    try{
    
        const user = await authService.getIdUser(req.userId!)

        res.status(200).json(user)
        
    }
    catch(error: any){

        res.status(400).json({
            message: error.message
        
        })
    }
}
const updateUser = async (req: Request, res: Response) =>{
    try{
        const user = await authService.updateUser(req.userId!,req.body)

        res.status(200).json(user)

    }
    catch(error: any){
        res.status(400).json({
            message: error.message
        })
    }
}

const deleteUser = async (req: Request, res: Response) =>{
    try{
        const user = await authService.deleteUser(req.userId!)

        res.status(200).json({
            message: "Account deleted successfully!"
        })
    }
    catch(error: any){
        res.status(400).json({
            message: error.message
        })
    }
}

export { authChecking, loginChecking, profile, idUser, updateUser, deleteUser }