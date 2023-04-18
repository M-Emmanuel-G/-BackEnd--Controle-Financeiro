import { IdGenerator } from './../services/idGenerator';
import { FinanceDatabase } from "../Database/FinanceDatabase"
import { UserDatabase } from "../Database/UserDatabase"
import { BodyNotInserted, UserNotFound } from "../models/customError"

export class FinanceBusines{

    financeDatabase = new FinanceDatabase()
    userDatabase = new UserDatabase()

    getFinance = async (id:string)=>{
        try {
            if(!id) throw new Error("Id nao do usuario foi inserido");
            
            const verifyUser = await this.userDatabase.getUserById(id)
            if(verifyUser.length === 0) throw new UserNotFound();

            const result = await this.financeDatabase.getFinance(id)
            return result
            
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    createFinance = async (finance:any)=>{
        try {
            const {idUser, value, description, type} = finance

            const verifyUser = await this.userDatabase.getUserById(idUser)
            if(verifyUser.length === 0) throw new UserNotFound();

            if(!value || !description || !type) throw new BodyNotInserted()
            if(isNaN(value)) throw new Error("Serao aceito somente numeros...");
            
            const id = IdGenerator.newID()

            const newFinance = {
                idFinance:id,
                value,
                description,
                type,
                idUser
            }
            
            await this.financeDatabase.createFinance(newFinance)

        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    deleteFinance = async (idFinance:string)=>{
        try {
            if (!idFinance) throw new Error("ID nao foi inserido.");

            await this.financeDatabase.deleteFinance(idFinance)
            
        } catch (error:any) {
            throw new Error(error.message);
        }
    }
}