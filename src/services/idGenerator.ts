import { v4 } from "uuid";

export abstract class IdGenerator{

    static newID(): string{
        return v4();
    }
}