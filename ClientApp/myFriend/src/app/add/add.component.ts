import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { user } from 'src/datamodel/user.model';
import { AuthServiceService } from '../http-service.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  selectedUser : user;
  data : any;
  constructor(private Activatedroute:ActivatedRoute,private router: Router,private authService : AuthServiceService) { }

  ngOnInit(): void {
    this.Activatedroute.queryParams
      .subscribe(params => {
        this.selectedUser= new user('','','','',"");
        this.selectedUser.UsersEmail=params['email'];
        this.selectedUser.UsersName=params['name'];
        this.selectedUser.UsersSurname=params['surname'];
        this.selectedUser.ID=params['id'];
      }
    );
  }

  return()
  {
    this.router.navigate(['main']);
  }

  Add(){
    this.Activatedroute.queryParams
      .subscribe(params => {
        console.log(params); 
        this.authService.AddFriend(this.authService.loggedInUser.ID,this.selectedUser.ID=params['id']);

      }
    );
  }

}
