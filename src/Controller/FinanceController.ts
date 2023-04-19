import { Request, Response } from "express";
import { FinanceBusines } from "../Business/FinanceBusiness";

export class FinanceController{

    financeBusiness = new FinanceBusines()

    getFinance = async (req:Request, res:Response)=>{
        try {
              const id = req.params.id

              const result = await this.financeBusiness.getFinance(id)
            res.status(200).send(result)

        } catch (error:any) {
            res.status(400).send(error.message);
        }
    }

    createFinance = async (req:Request, res:Response)=>{
        try {
            const idUser = req.params.idUser
            const { value, type, description } = req.body

            const newFinance:any = {
                value,
                type,
                description,
                idUser
            }
            
            await this.financeBusiness.createFinance(newFinance)
            res.status(201).send('Financa adicionada com sucesso.')

        } catch (error:any) {
         res.status(400).send(error.message);
        }
    }

    deleteFinance = async (req:Request, res:Response)=>{
        try {
            const idFinance = req.params.idFinance

            await this.financeBusiness.deleteFinance(idFinance)
            res.status(200).send({message:"Finança excluida!"})
        } catch (error:any) {
            res.status(400).send(error.message);
        }
    }
    
}