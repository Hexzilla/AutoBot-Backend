import { Document, Schema, model } from 'mongoose'

export interface Entrypoint {
    contract: string,
    method: string,
    amount: number,
    running: boolean
}

export interface Contract extends Document {
    userAddress: string,
    entrypoints: Entrypoint[]
}
  
const ContractSchema = new Schema<Contract>({
    userAddress: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    entrypoints: [{
        contract: {
            type: String,
            required: true,
        },
        method: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        running: {
            type: Boolean,
            required: true,
        }
    }],
},
{
    timestamps: true 
})

export default model<Contract>('Contract', ContractSchema);
