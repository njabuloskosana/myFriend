export class user{
     UsersName : string;
     UsersEmail : string;
     UsersPassword : string;
     UsersSurname : string;

     constructor(Username:string, UsersSurname: string,UsersEmail:string)
     {
        this.UsersName=Username;
        this.UsersSurname=UsersSurname;
        this.UsersEmail=UsersEmail;
     }

}