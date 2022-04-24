import dotenv from 'dotenv';
import { model } from 'mongoose'
import { MichelsonMap, TezosToolkit } from '@taquito/taquito';
import { InMemorySigner, importKey } from '@taquito/signer';
import { bytes2Char, char2Bytes } from '@taquito/utils';
import { Entrypoint } from '../models/Entrypoint';
import { Config } from '../config/constants';
const EntrypointModel = model<Entrypoint>('Entrypoint')

dotenv.config({
	path: '.env',
});

class ContractController {
	private tezos: TezosToolkit;

	constructor() {
		this.tezos = new TezosToolkit(Config.RPC);
		this.tezos.setProvider({
			signer: new InMemorySigner(process.env.PRIVATE_KEY as string),
		});
	}

	async callEntrypoint(contractAddress: string, entrypoint: string, amount: number) {
		console.log("call_entrypoint", contractAddress, entrypoint, amount);
		try {
			const contract = await this.tezos.contract.at(contractAddress)

			const methods = contract.parameterSchema.ExtractSignatures();
			const method = methods.find(m => m[0] === entrypoint);
			console.log('method', method)
			if (!method) {
				return {
					success: false, 
					message: 'Invalid method'
				};
			}

			const transaction = await contract.methods[entrypoint](amount).send();
			const confirm = await transaction.confirmation();
			return null;

		} catch (e) {
			console.error('call_entrypoint', e);
			return {
				success: false,
				error: e
			};
		}
	}

	async getEntrypoints() {
		try {
			const entrypoints = await EntrypointModel.find()
			return { success: true, entrypoints }
		} catch (err) {
			console.error(err);
			return { success: false };
		}
	}

	async saveEntrypoint(data: Entrypoint) {
		const {contract, method} = data;
		console.log('entrypoints', contract, method, data)
		
		try {
			let model = await EntrypointModel.findOne({contract, method})
			console.log('model', model)
			if (model) {
				model.amount = data.amount;
				model.running = data.running;
			} else {
				model = await new EntrypointModel(data)
			}
			await model.save();
			return true;
		}catch (err) {
			console.error(err);
			return false;
		}
	}
}

export = new ContractController();
