import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { SignupRequest } from '../model/SignupRequest';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<SignupRequest>;
  public currentUser: Observable<SignupRequest>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<SignupRequest>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): SignupRequest {
    return this.currentUserSubject.value;
  }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions).pipe(
      map((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes

        localStorage.setItem("currentUser", JSON.stringify(user));
        return user;
      })
    );
  }
  
  signup(signupRequest: SignupRequest): Observable<any> {
    return this.http.post(`${AUTH_API}signup`, signupRequest,httpOptions);
  }


}