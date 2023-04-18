import { BaseDatabase } from "./BaseDatabase";

export class FinanceDatabase extends BaseDatabase{

    TABLE_NAME = 'C_Financeiro'
    
    getFinance = async (id:string)=>{
        try {
            const result = await FinanceDatabase.connection(this.TABLE_NAME)
                .select()
                .join("Users","C_Financeiro.fk_user","=","Users.id")
                .where({
                    idFinance: id
                })
            return result    
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    createFinance = async (finance:any)=>{
        try {
            
                const {idFinance, value, description, type, idUser} = finance
                await FinanceDatabase.connection(this.TABLE_NAME)
                    .insert({
                        idFinance,
                        value,
                        description,
                        type,
                        fk_user:idUser
                    })
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    deleteFinance = async (idFinance:string)=>{
        try {
              await FinanceDatabase.connection(this.TABLE_NAME)
                .delete()
                .where({
                    idFinance: idFinance
                }) 

        } catch (error:any) {
            throw new Error(error.message);
        }
    }
    
}