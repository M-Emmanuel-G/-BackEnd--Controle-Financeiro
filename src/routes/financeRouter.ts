import express from "express";
import { FinanceController } from "../Controller/FinanceController";



export const financeRouter = express.Router();

const financeController = new FinanceController();

financeRouter.get('/:id', financeController.getFinance)
financeRouter.delete('/:id', financeController.deleteFinance)
financeRouter.post('/create/:id', financeController.createFinance)