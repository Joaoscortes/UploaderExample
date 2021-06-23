import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploaderService {
  endpoint = 'http://127.0.0.1:8080/uploader/resources/files';

  constructor(
    private http: HttpClient
  ) { }

  upload(file: File) { 
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(this.endpoint, formData, {responseType: 'text'})
  }
}
