
import { BaseDatabase } from "./BaseDatabase";
import { AuthenticatorData, NewUser, User } from "../models/User";

export class UserDatabase extends BaseDatabase {

    TABLE_NAME = "Users";

    signup = async (user:NewUser)=>{
    try {
        const {id, name,  email, password} = user
        const newUser = {
          id,
          name,
          email,
          password,
        }

        await UserDatabase.connection(this.TABLE_NAME)
        .insert(newUser)
    } catch (error:any) {
      throw new Error(error.message);
      
    }
  }

    getUserByEmail = async (email: string) =>{
    try {
        const result = await UserDatabase.connection(this.TABLE_NAME)
          .select()
          .where({email})
        return result  
    } catch (error:any) {
      throw new Error(error.message);
    }
  }

    getProfile = async (token:AuthenticatorData)=>{
    try {
      const result = await UserDatabase.connection(this.TABLE_NAME)
        .select()
        .where({id: token.id})
        return result[0]       
    } catch (error:any) {
        throw new Error(error.message);
    }
  }

    getUserById = async (id:string)=>{
    try {
      const result = await UserDatabase.connection(this.TABLE_NAME)
      .select()
      .where({
        id:id
      })
      return result
    } catch (error:any) {
      throw new Error(error.message);
    }
  }

  allUsers = async ()=>{
    try {
      const result = await UserDatabase.connection(this.TABLE_NAME)
        .select()
        return result
    } catch (error:any) {
      throw new Error(error.message);
      
    }
  }

}