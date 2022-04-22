import { Document, Schema, model } from 'mongoose'

export interface Contract extends Document {
    address: string,
    entrypoint: string,
    symbol: string,
    decimals: string,
}
  
const ContractSchema = new Schema<Contract>({
    address: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    entrypoint: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    decimals: {
        type: String,
        required: true
    },
},
{
    timestamps: true 
})

export default model<Contract>('Contract', ContractSchema);
