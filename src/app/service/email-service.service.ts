import { Injectable } from '@angular/core';
import { EmailRequest } from '../model/EmailRequest';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {

  baseUrl = "http://localhost:8091/api/email";

  constructor(private http: HttpClient) {}

  sendEmail(emailRequest : EmailRequest): Observable<string> {
    return this.http.post<string>(this.baseUrl+"/send-email", emailRequest);
  }

}
