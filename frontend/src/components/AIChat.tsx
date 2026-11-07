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
            return "Session outdated or not login yet, please Login again"
        }
        if (status === 400) {
            return backendMessage ?? "The information sent is incorrect";
        }

        if (status === 500) {
            return backendMessage ?? "An error occurred in the backend or the AI service";
        }

        return backendMessage ?? "cannot connect to the server";
    }
    return "An error of unknown cause occurred"
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
                <p>Your financial advisor</p>
            </div>

            <div className="ai-chat__settings">
                <label htmlFor="financial-period">
                    analyzing data
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
                        this month
                    </option>

                    <option value="last month">
                        last month
                    </option>
                </select>
            </div>

            <div className="ai-chat__messages">
                {messages.length === 0 && (
                    <div className="ai-chat__empty">
                        <h3>Hello! Anything to help?</h3>
                        <p>
                            Try asking about their income, expenses,
                            or spending habits.
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
                                ? "you"
                                : "AI Assistant"}
                        </span>

                        <p>{message.content}</p>
                    </div>
                ))}

                {isLoading && (
                    <div className="ai-chat__loading">
                        AI is analyzing...
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
                <input
                type="text"
                value={input}
                onChange={(event) =>
                setInput(event.target.value)}
                placeholder="asking about your financial statement..."
                maxLength={2000}
                disabled={isLoading}
                />

                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                >
                    {isLoading ? "sending" : "send"}
                </button>
            </form>
        </div>
    );
}

export default AIChat;