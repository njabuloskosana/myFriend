import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthServiceService} from "../auth-service.service"

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  formGroupLogin : FormGroup;
  formGroupRegister : FormGroup;

  constructor(private authService : AuthServiceService,private router: Router) { 
    
  }

  ngOnInit(): void {
    this.initForm();
  }
  
  initForm()
  {
    this.formGroupLogin = new FormGroup({
      email : new FormControl('',[Validators.required]),
      password : new FormControl('',[Validators.required])
    })

    this.formGroupRegister = new FormGroup({
      UsersName : new FormControl('',[Validators.required]),
      UsersSurname : new FormControl('',[Validators.required]),
      UsersEmail : new FormControl('',[Validators.required]),
      UsersPassword : new FormControl('',[Validators.required]),
      confirm_password_register : new FormControl('',[Validators.required])
    })
  }

  LoginProcess()
  {
    console.log(this.formGroupLogin.value)
    /*if(this.formGroup.valid){
      this.authService.login(this.formGroup.value).subscribe(result =>{
        if(result.sucess)
        {
          console.log(result);
          alert(result.message);
        }
      })
    }*/
    this.router.navigate(['main']);
  }

  RegistrationProcess()
  {
    console.log(this.formGroupRegister.value)
    /*if(this.formGroupRegister.valid){
      this.authService.register(this.formGroupRegister.value).subscribe(result =>{
        if(result.sucess)
        {
          console.log(result);
          alert(result.message);
        }
      })
    }*/
    this.router.navigate(['main']);
  }

}
