import { Request, Response } from "express";
import { getFinancialContext } from "../services/aiService";

const financialChat =async (req: Request, res: Response) => {
    try{
        const userId = req.userId;
        const {message, period} = req.body;

        if(!userId){
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        if(
            typeof message !== "string" || message.trim().length === 0 || message.length > 2000){
                return res.status(400).json({
                    message: "message must be between 1 and 2000 characters"
                })
            }
            const selectedPeriod = period === "last month" ? "last month" : "this month"

            const financialContext = await getFinancialContext(userId, selectedPeriod)

            return res.status(200).json({
                message: message.trim(), financialContext
            })
        } catch(error){
            console.error("Financial chat error", error);

            return res.status(500).json({
                message: "Fail to process financial chat request"
            })
        }
    }

    export {financialChat}