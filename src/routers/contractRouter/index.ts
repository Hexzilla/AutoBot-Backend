import { Response, Router } from 'express';
import LedgerController from '../../controllers/contractController';

class ContractRouter {
	private _router = Router();
	private _controller = LedgerController;

	get router() {
		return this._router;
	}

	constructor() {
		this._configure();
	}

	private _configure() {
		this._router.post('/call', async (req, res) => {
			const {contract, entrypoint, amount} = req.body;
			const result = await this._controller.call_entrypoint(contract, entrypoint, amount);
			return res.status(200).json(result);
		});
	}
}
export = new ContractRouter().router;
