import { Request, Response } from "express";
import { getFinancialContext, compareMonthlyExpenses, compareExpenseCategories, askGemini, askGeminiForExpenseComparison } from "../services/aiService";


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
            const selectedPeriod = period === undefined || period === "this month"
                ? "this month"
                : period === "last month"
                    ? "last month"
                    : (() => { throw new Error("Invalid period"); })();

            const financialContext = await getFinancialContext(userId, selectedPeriod)

            const reply = await askGemini({
                message: message.trim(),
                financialContext
            })

            return res.status(200).json({
                message: message.trim(), financialContext, reply
            })
        } catch(error){
            console.error("Financial chat error", error);

            return res.status(500).json({
                message: "Fail to process financial chat request"
            })
        }
    }

const monthlyExpenseComparison = async (
    req: Request,
    res: Response
) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const [comparison, categoryComparison] =
            await Promise.all([
                compareMonthlyExpenses(userId),
                compareExpenseCategories(userId)
            ]);

        const comparisonData = {
            currentMonth: comparison.currentMonth,
            previousMonth: comparison.previousMonth,
            comparison: {
                difference: comparison.difference,
                percentageChange:
                    comparison.percentageChange === null
                        ? null
                        : Number(comparison.percentageChange),
                trend: comparison.trend
            },
            categoryComparison
        };

        let reply: string | null = null
        let aiError = false

        try {
            reply = (await askGeminiForExpenseComparison(comparisonData)) ?? null;
        } catch (error) {
            aiError = true;
            console.error("Gemini comparison error:", error);
        }

        return res.status(200).json({
            ...comparisonData,
            reply
        });
    } catch (error) {
        console.error("Monthly expense comparison error:", error);

        return res.status(500).json({
            message: "Failed to compare monthly expenses"
        });
    }
};

    export {financialChat, monthlyExpenseComparison}