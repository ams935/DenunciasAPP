import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL_API: string = 'http://localhost:8080/API/';

  constructor(private http: HttpClient) { }

  login(user: any): Observable<any> {
    return this.http.get(this.URL_API + 'consult-user/' + user.email_address + ',' + user.password);
  }
}
