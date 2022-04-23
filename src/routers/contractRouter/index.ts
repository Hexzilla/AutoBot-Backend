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

		this._router.get('/state/:userAddress', async (req, res) => {
			const result = await this._controller.getState(req.params.userAddress);
			return res.status(200).json(result);
		});

		this._router.post('/state/:userAddress', async (req, res) => {
			const result = await this._controller.saveState(req.params.userAddress, req.body);
			return res.status(200).json(result);
		});
	}
}
export = new ContractRouter().router;
