import { Component, OnInit } from '@angular/core';
import { user } from 'src/datamodel/user.model';
import { Router } from '@angular/router';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AuthServiceService } from '../http-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  firstName: any;
  users: MatTableDataSource<user>;
  friends : MatTableDataSource<user>;
  array : any[];
  array2 : user[];
  displayedColumns = ['Name','Surname','Email']; 

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router,private authService : AuthServiceService) { }

  ngOnInit(): void {
   
    this.authService.getAllUsers();
    this.authService.getAllFriends(this.authService.loggedInUser.ID);
    this.array=this.authService.AllUers;
    this.array2=this.authService.AllFriends;
    this.users= new MatTableDataSource(this.array);
    this.friends= new MatTableDataSource(this.array2);
    
  }

  ngAfterViewInit() {
    this.users.paginator = this.paginator;
    this.users.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();

    if (this.users.paginator) {
      this.users.paginator.firstPage();
    }
  }


  Search()
  {
    if(this.firstName=="")
    {
      this.ngOnInit();
      this.ngAfterViewInit();
    }
    else{
      this.array= this.array.filter(res=>{
        return res.UsersName.toLocaleLowerCase().match(this.firstName.toLocaleLowerCase());
      })
      this.users= new MatTableDataSource(this.array);
      
    }
  }



  DeleteAccount(){
   
    this.authService.removeAccount(this.authService.loggedInUser.ID);
      
  }

  LogOut()
  {
    this.router.navigate(['auth']);
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);

    this.router.navigate(['add'],{queryParams:{email:row.UsersEmail,name:row.UsersName,surname:row.UsersSurname,id:row.ID}});
}

onRowClicked2(row) {
  console.log('Row clicked: ', row);

  this.router.navigate(['delete'],{queryParams:{email:row.UsersEmail,name:row.UsersName,surname:row.UsersSurname,id:row.ID}});
}

refresh()
{
  this.ngOnInit();
  this.ngAfterViewInit();

}

}

