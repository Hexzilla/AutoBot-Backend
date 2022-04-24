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
			const result = await this._controller.callEntrypoint(contract, entrypoint, amount);
			return res.status(200).json(result);
		});

		this._router.get('/entrypoint', async (req, res) => {
			const result = await this._controller.getEntrypoints();
			return res.status(200).json(result);
		});

		this._router.post('/entrypoint', async (req, res) => {
			const success = await this._controller.saveEntrypoint(req.body);
			return res.status(200).json({success: success});
		});
	}
}
export = new ContractRouter().router;
