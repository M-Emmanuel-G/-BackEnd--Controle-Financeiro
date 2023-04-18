import { BodyNotInserted } from './../models/customError';
import { UserDatabase } from "../Database/UserDatabase"
import { EmailExist, EmailFormat, PasswordWrong, UserNotFound } from "../error/UserError"
import { NotAuthorized, TokenNotInserted } from "../models/customError"
import { LoginInputDTO, UserInputDTO } from "../models/User"
import { Authenticator } from "../services/authenticator"
import { IdGenerator } from "../services/idGenerator"


export class UserBusiness {
    userDatabase = new UserDatabase()
    authenticator = new Authenticator()
    
    signup = async (user: UserInputDTO)=> {
        
        const {name, email, password} = user
        const verifyEmail = await this.userDatabase.getUserByEmail(email)
        
        if(!name || !email || !password) throw new BodyNotInserted
        if(verifyEmail.length == 1) throw new EmailExist
        console.log(verifyEmail.length);
        if(!email.includes('@')) throw new EmailFormat
        
        const id = IdGenerator.newID()

        const newUser = {
            id,
            name,
            email,
            password,
        }
        const token = this.authenticator.generateToken({id})

        await this.userDatabase.signup(newUser);
        
        return token
    }

    login = async(user: LoginInputDTO)=>{

            const {email, password} = user

            if(!email || !password) throw new BodyNotInserted;
            

            const verifyEmail = await this.userDatabase.getUserByEmail(email as string)
            if(verifyEmail.length !== 1) throw new UserNotFound
            if(verifyEmail[0].password !== password) throw new PasswordWrong

            const token = this.authenticator.generateToken({id: verifyEmail[0].id})
            return token
            
    }

    getProfile = async (authToken:string)=>{
        try {

            if(!authToken) throw new TokenNotInserted
            
            const token = this.authenticator.getData(authToken) 

            if(!token) throw new NotAuthorized

            const result = await this.userDatabase.getProfile(token)
            return result
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    allUsers = async ()=>{
        try {
            const result = await this.userDatabase.allUsers()
            return result
        } catch (error:any) {
          throw new Error(error.message);
          
        }
      }
}