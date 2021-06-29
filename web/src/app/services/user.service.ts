import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private endpoint = 'http://127.0.0.1:8080/uploader/users';

  constructor(
    private http: HttpClient
  ) { }

  save(user: any) { 
    return this.http.post(this.endpoint, user)
  }

  validUsername(username: string) {
    return this.http.get(`${this.endpoint}/validUsername/${username}`)
  }
}
