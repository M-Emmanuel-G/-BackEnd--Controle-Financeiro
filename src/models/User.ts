export class User{
    constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    ){}

    getId(){
        return this.id;
    }

    getName(){
        return this.name
    }

    getEmail(){
        return this.email;
    }

    getPassword(){
        return this.password;
    }

    setId(id: string){
        this.id = id;
    }

    setName(name: string){
        this.name = name;
    }

    setEmail(email: string){
        this.email = email;
    }

    setPassword(password: string){
        this.password = password;
    }
}

export interface UserInputDTO{
    email: string;
    password: string;
    name: string;
}

export interface LoginInputDTO{
    email: string;
    password: string;
}

export enum UserRole{
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export interface NewUser{
    id: string,
    email: string;
    password: string;
    name: string;
}

export interface AuthenticatorData{
    id:string
}