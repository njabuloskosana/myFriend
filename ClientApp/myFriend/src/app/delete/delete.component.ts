import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { user } from 'src/datamodel/user.model';
import { AuthServiceService } from '../http-service.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  

  selectedUser : user;
  data : any;
  constructor(private Activatedroute:ActivatedRoute,private router: Router,private authService : AuthServiceService) { }

  ngOnInit(): void {
    this.Activatedroute.queryParams
      .subscribe(params => {
        this.selectedUser= new user('','','','','');
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

  RemoveFriend(){
    this.Activatedroute.queryParams
      .subscribe(params => {
        console.log(params); 
        this.authService.removeFriend(params['id'])
      }
    );
  }

  

}
