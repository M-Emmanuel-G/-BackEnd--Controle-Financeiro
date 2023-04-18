import { Request, Response } from "express";
import { UserBusiness } from "../Business/UserBusines";
import { LoginInputDTO, UserInputDTO } from "../models/User";

export class UserController {
   userBusiness = new UserBusiness();

    signup = async (req: Request, res: Response)=> {
        try {

            const newUser: UserInputDTO = {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
            }

            const token = await this.userBusiness.signup(newUser)

            res.status(200).send({message:'Cadastro realizado com sucesso.', token})

        } catch (error:any) {
            res.status(400).send({ error: error.message });
        }
    }

    login = async(req: Request, res: Response)=> {

        try {
            const loginData: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            };

            const token = await this.userBusiness.login(loginData)

            res.status(200).send({message:'Login realizado com sucesso.', token})
        } catch (error:any) {
            res.status(400).send({ error: error.message });
        }
    }

    getProfile = async (req:Request, res:Response)=>{
        try {
            const authToken = req.headers.authorization as string

            const result = await this.userBusiness.getProfile(authToken)
            res.status(200).send(result);
        } catch (error:any) {
            res.status(400).send(error.message);
        }
    }

    allUsers = async (req:Request, res:Response)=>{
        try {
          const result = await this.userBusiness.allUsers()
          res.status(200).send(result)
        } catch (error:any) {
          res.status(400).send(error.message);
          
        }
      }

}