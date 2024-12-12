import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoanInput, LoanReponse, LoginPostData, LoginResponse, RegisterPostData} from "../interfaces/auth";
import {map, Observable} from "rxjs";
import {FormControl, ɵValue} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "http://localhost:8080/api/v1"

  constructor(private http: HttpClient) { }

  registerUser(postData: RegisterPostData){
    return this.http.post(`${this.baseUrl}/auth/signup`, postData);
  }

  getUserDetails(postData: LoginPostData): Observable<LoginResponse>{

    return this.http.post(`${this.baseUrl}/auth/login`, postData).
    pipe(
      map(response => response as LoginResponse)
    );
  }

  checkEligibleForLoan(amount: ɵValue<FormControl<number | null>> | undefined) {

    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);


    // @ts-ignore
    return this.http.get(`${this.baseUrl}/loan/is_eligible/${amount}`,
      {
        headers: headers,
        }
    ).pipe(
      map(response => response as LoanReponse)
    );
  }
}
