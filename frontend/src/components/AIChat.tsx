import { useState } from "react";
import axios from "axios";
import { sendFinancialMessage } from "../services/aiService";
import type { FinancialPeriod } from "../types/ai";
import "../styles/AIChat.css"

type Chatmessage = {
    id: string;
    role: "user" | "assistant";
    content: string;
}

function getErrorMessage(error: unknown): string {
    if(axios.isAxiosError<{ message?:string}>(error)){
        const status = error.response?.status
        const backendMessage = error.response?.data?.message;
        
        if(status === 401){
            return "Session หมดอายุหรือยังไม่ได้เข้าสู่ระบบ กรุณา Login ใหม่"
        }
        if (status === 400) {
            return backendMessage ?? "ข้อมูลที่ส่งไปไม่ถูกต้อง";
        }

        if (status === 500) {
            return backendMessage ?? "เกิดข้อผิดพลาดจาก Backend หรือบริการ AI";
        }

        return backendMessage ?? "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้";
    }
    return "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ"
}

function AIChat(){
    const [input, setInput] = useState("");
    const [period, setPeriod] = useState<FinancialPeriod>("this month") 
    const [messages, setMessages] = useState<Chatmessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        const message = input.trim();

        if(!message || isLoading){
            return;
        }

        const UserMessage: Chatmessage = {
            id: crypto.randomUUID(),
            role: "user",
            content: message
        };
        setMessages(prev => [...prev, UserMessage]);
        setInput("");
        setError(null);
        setIsLoading(true);
    try{
        const response = await sendFinancialMessage({
            message: message,
            period: period
        });

        const aiMessage: Chatmessage = {
            id: crypto.randomUUID(),
            role: "assistant",
            content: response.reply
        }
     
        setMessages(prev => [...prev, aiMessage]);

    } catch (error: unknown) {
        setError(getErrorMessage(error));

    } finally {
        setIsLoading(false);
    }
}
    return(
        <div className="ai-chat">
            <div className="ai-chat__header">
                <h2>AI Financial Assistant</h2>
                <p>ผู้ช่วยวิเคราะห์การเงินส่วนบุคคลของคุณ</p>
            </div>

            <div className="ai-chat__settings">
                <label htmlFor="financial-period">
                    วิเคราะห์ข้อมูล
                </label>

                <select
                    id="financial-period"
                    value={period}
                    onChange={(event) =>
                        setPeriod(event.target.value as FinancialPeriod)
                    }
                    disabled={isLoading}
                >
                    <option value="this month">
                        เดือนนี้
                    </option>

                    <option value="last month">
                        เดือนก่อน
                    </option>
                </select>
            </div>

            <div className="ai-chat__messages">
                {messages.length === 0 && (
                    <div className="ai-chat__empty">
                        <h3>สวัสดี! มีอะไรให้ช่วยวิเคราะห์ไหม?</h3>
                        <p>
                            ลองถามเกี่ยวกับรายรับ รายจ่าย
                            หรือพฤติกรรมการใช้เงินของคุณ
                        </p>
                    </div>
                )}

                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`ai-chat__message ai-chat__message--${message.role}`}
                    >
                        <span className="ai-chat__role">
                            {message.role === "user"
                                ? "คุณ"
                                : "AI Assistant"}
                        </span>

                        <p>{message.content}</p>
                    </div>
                ))}

                {isLoading && (
                    <div className="ai-chat__loading">
                        AI กำลังวิเคราะห์ข้อมูล...
                    </div>
                )}
            </div>

            {error && (
                <div className="ai-chat__error" role="alert">
                    {error}
                </div>
            )}

            <form
            className="ai-chat__form"
            onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit();
        }}
>
                <textarea
                    value={input}
                    onChange={(event) =>
                        setInput(event.target.value)
                    }
                    placeholder="ถามเกี่ยวกับการเงินของคุณ..."
                    maxLength={2000}
                    rows={2}
                    disabled={isLoading}
                />

                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                >
                    {isLoading ? "กำลังส่ง..." : "ส่งข้อความ"}
                </button>
            </form>
        </div>
    );
}

export default AIChat;