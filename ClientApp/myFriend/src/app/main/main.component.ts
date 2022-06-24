import { Component, OnInit } from '@angular/core';
import { user } from 'src/datamodel/user.model';
import { Router } from '@angular/router';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  firstName: any;
  users: MatTableDataSource<user>;
  friends : MatTableDataSource<user>;
  array : user[];
  array2 : user[];
  displayedColumns = ['Name','Surname','Email']; 

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.array = [
      new user('Nabulo','Skosana','njabuloskosanadev@gmail.com'),
      new user('Clife','Mhlongo','njabuloskosanadev@gmail.com'),
      new user('Nabulo','Skosana','njabuloskosanadev@gmail.com'),
      new user('Clife','Mhlongo','njabuloskosanadev@gmail.com'),
      new user('Nabulo','Skosana','njabuloskosanadev@gmail.com'),
      new user('Clife','Mhlongo','njabuloskosanadev@gmail.com')
   
    ];
    this.users= new MatTableDataSource(this.array);
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

  DeleteAccount()
  {
    this.router.navigate(['auth']);
  }

  LogOut()
  {
    this.router.navigate(['auth']);
  }
}

