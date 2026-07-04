import { Schema, model } from "mongoose";

const transactionSchema = new Schema(
    {
        userId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true   
        },
        type:{
            type: String,
            enum: ["income", "expense"],
            required: true
        },
        amount:{
            type: Number,
            required: true
        },
        category:{
            type: String,
            required: true
        },
        description:{
            type: String
        },
        date:{
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
)

export default model("Transaction", transactionSchema)