import dotenv from 'dotenv';
import { model } from 'mongoose'
import { MichelsonMap, TezosToolkit } from '@taquito/taquito';
import { InMemorySigner, importKey } from '@taquito/signer';
import { bytes2Char, char2Bytes } from '@taquito/utils';
import { Contract } from '../models/Contract';
import { Config } from '../config/constants';
const ContractModel = model<Contract>('Contract')

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

	async call_entrypoint(contractAddress: string, entrypoint: string, amount: number) {
		console.log("call_entrypoint", contractAddress, entrypoint, amount);
		try {
			const contract = await this.tezos.contract.at(contractAddress)

			const methods = contract.parameterSchema.ExtractSignatures();
			const method = methods.find(m => m[0] === entrypoint);
			console.log('method', method)
			if (!method) {
				return false;
			}

			const transaction = await contract.methods[entrypoint](amount).send();
			const confirm = await transaction.confirmation();
			return true;
		} catch (e) {
			console.error('call_entrypoint', e);
			return false;
		}
	}
}

export = new ContractController();
