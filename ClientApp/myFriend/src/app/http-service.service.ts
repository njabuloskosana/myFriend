import { HttpClient ,HttpParams, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/datamodel/user.model';

export interface req{
 ID:string,
 UsersName:string,
 UsersSurname:string,
 UsersEmail:string,
 UsersPassword:string

}
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  readonly APIUrl="https://localhost:44383/api";
  readonly PhotoUrl="";
  person:user;
  loggedInUser:user;
  AllUers: any[];
  holder : any[];
  AllFriends : any[];

  constructor(private http:HttpClient,private router: Router) { 

   this.loggedInUser=new user("","","","","");
   this.person=new user("","","","","");
   
   
  }

  register(data:any){

    this.http.post(this.APIUrl+'/Users',data).subscribe(res => {
      console.log(res);
      this.loggedInUser.UsersEmail=data.UsersEmail;
      this.loggedInUser.UsersPassword=data.UsersPassword;

    });

  }

  login(email:string,password:string){

    this.loggedInUser.UsersEmail="";
    this.loggedInUser.UsersPassword=""; 


    this.http.get<any[]>(this.APIUrl+'/Auth/'+email+'/'+password).subscribe(res => {
      console.log(res);
      this.holder=res;

      if(this.holder.length==0)
      {
          console.log("not registered");
      }
      else{
          console.log("registered");
          this.loggedInUser.UsersEmail=email;
          this.loggedInUser.UsersPassword=password;
          this.loggedInUser.ID=this.holder[0].ID;
          console.log(this.loggedInUser);
          this.router.navigate(['main']);
      }

      //this.router.navigate(['main']);


    });
      

  }

  getAllUsers(){

    this.http.get<any[]>(this.APIUrl+'/Users').subscribe(res => {
      console.log(res);
      this.AllUers=res;
      console.log(this.AllUers);
    });

  }

  getAllFriends(id:string){
    this.http.get<any[]>(this.APIUrl+'/Friends/'+id).subscribe(res => {
      console.log(res);
      this.AllFriends=res;
      console.log(this.AllFriends);
    });
  }

  AddFriend(user1:any,user2:any){
    this.http.get<any[]>(this.APIUrl+'/Friends/Add/'+user1+'/'+user2).subscribe(res => {
      console.log(res);
      this.router.navigate(['main']);

    });
  }


  removeFriend(id:string){


    this.http.delete(this.APIUrl+'/Friends/'+id).subscribe(res => {
      console.log(res);
      this.router.navigate(['main']);


    });

  }

  removeAccount(id:string){


    this.http.delete(this.APIUrl+'/Users/'+id).subscribe(res => {
      console.log(res);
      this.router.navigate(['auth']);


    });

  }
 

}
