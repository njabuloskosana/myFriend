import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { 

   
    
  }

  login(data):Observable<any>{
    return this.http.post('${baseUrl}users/login',data)
  }

  register(data):Observable<any>{
    const headers = { 'Content-Type':'application/json','Access-Control-Allow-Origin':'https://localhost:44383'};
    return this.http.post('https://localhost:44383/api/Users',data,{headers})
  }
}
