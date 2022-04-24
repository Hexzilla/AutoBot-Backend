import { Document, Schema, model } from 'mongoose'

export interface Entrypoint {
    contract: string,
    method: string,
    amount: number,
    running: boolean
}
  
const EntrypointSchema = new Schema<Entrypoint>({
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
},
{
    timestamps: true 
})

EntrypointSchema.index({ contract: 1, method: 1 }, { unique: true });

export default model<Entrypoint>('Entrypoint', EntrypointSchema);
