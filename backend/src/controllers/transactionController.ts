import { Request, Response } from "express";
import * as transactionService from "../services/transactionService";
import user from "../models/user";

const create = async (req: Request, res: Response) =>{
        
    try{
            const {  type, amount, category, description, date } = req.body

            const transaction = await transactionService.create(
                req.userId!,
                type,
                amount,
                category,
                description,
                date
            )
            res.status(201).json(transaction)
        } 
        
    catch(error: any){
            res.status(400).json({
                message: error.message
                })
        }
}

const getAll = async (req: Request, res: Response) =>{
    
    try{
        const transaction = await transactionService.getAll(req.userId!)

        res.status(200).json(transaction)
    } 
    
    catch(error: any){
                res.status(400).json({
                    message: error.message
                })
        }
}

const getById = async (req: Request<{id: string}>, res : Response) =>{
    
    try{
        const transaction = await transactionService.getById(
            req.params.id,
            req.userId!
        )

        res.status(200).json(transaction)
    }

    catch(error: any){
                res.status(400).json({
                    message: error.message
                })
        }
}

const update = async (req: Request<{id: string}>, res: Response) =>{
        try{

            const transaction = await transactionService.update(
                req.params.id,
                req.userId!,
                req.body
            )
            res.status(200).json({transaction, 
                message: "updated successfully!"})
        }
        
        catch(error: any){
            res.status(400).json({
                message: error.message
            })
        }
}

const remove = async (req: Request<{id: string}>, res: Response) =>{
    try{
        const transaction = await transactionService.remove(
            req.params.id,
            req.userId!
        )

        res.status(200).json({
            message: "Transaction deleted successfully."
        })
    }

    catch(error: any){
            res.status(400).json({
                message: error.message
            })
        }
}

export { create, getAll, getById, update, remove }