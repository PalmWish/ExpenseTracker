import api from "../api/axios";
import type { FinancialResponse, FinancialChatPayload } from "../types/ai";


const sendFinancialMessage = async (data: FinancialChatPayload): Promise<FinancialResponse> => {
    const response = await api.post<FinancialResponse>("/ai/financial-chat", data)
    return response.data
}

export { type FinancialChatPayload, sendFinancialMessage}