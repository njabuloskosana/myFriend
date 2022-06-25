export class user{
     UsersName : string;
     UsersEmail : string;
     UsersPassword : string;
     UsersSurname : string;
     ID : string;

     constructor(UsersName:string, UsersSurname: string,UsersEmail:string,UsersPassword:string,ID:string)
     {
        this.UsersName=UsersName;
        this.UsersSurname=UsersSurname;
        this.UsersEmail=UsersEmail;
        this.UsersPassword=UsersPassword;
        this.ID=ID;
     }

}