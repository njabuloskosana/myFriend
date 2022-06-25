import { user } from "./user.model";

export class response{
    status : string;
    data : user[];
   

    constructor(Status:string, Data: user[])
    {
       this.status=Status;
       this.data=Data;
       
    }

}