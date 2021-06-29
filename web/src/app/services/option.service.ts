import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Option } from '../models/option';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  private endpoint = 'http://127.0.0.1:8080/uploader/options';

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Option> { 
    return this.http.get<Option>(this.endpoint)
  }
}
