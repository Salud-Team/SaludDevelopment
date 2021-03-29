import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';



interface SaludUser{
  name: String;
  id: Number;
  phone_num: Number; 
  email: String;
  password: String;
  personalUser: Boolean
}

interface Order{
  id: Number;
  gifter_id: Number; 
  recipient_id: Number; 
  merchant_id: Number;
  amount: Number;
  description: String;
  //Check if/how we store videos
  redeemed: Boolean
}
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  endpoint = 'http://localhost:8080';
  savedSaludUser: SaludUser; 

  constructor(public httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  } 

  saveSaludUser(name, id, phonenum, email, password, personalUser){
    var saludData: SaludUser = {
      name: name, 
      id: id,
      phone_num: phonenum,
      email: email, 
      password: password, 
      personalUser: personalUser
    }; 
    this.savedSaludUser = saludData;
  }

  getSaludUser(){
    return this.savedSaludUser; 
  }

  getSaludUsers(): Observable<SaludUser> {
    return this.httpClient.get<SaludUser>(this.endpoint + '/SaludUserData')
    .pipe(
      retry(1),
      catchError(this.processError)
    )
  }

  getPersonalUsers(): Observable<SaludUser> {
    return this.httpClient.get<SaludUser>(this.endpoint + '/PersonalUserData')
    .pipe(
      retry(1),
      catchError(this.processError)
    )
  }

  getMerchantUsers(): Observable<SaludUser> {
    return this.httpClient.get<SaludUser>(this.endpoint + '/MerchantUserData')
    .pipe(
      retry(1),
      catchError(this.processError)
    )
  }

  validateLogin(em, pass){
    return this.httpClient.put<SaludUser>(this.endpoint + '/login', {email: em, password: pass, personalUser: true}); 
  }

  validateLoginMerchant(em, pass){
    return this.httpClient.put<SaludUser>(this.endpoint + '/login', {email: em, password: pass, personalUser: false}); 
  }

  getUserOrders(id){
    return this.httpClient.put<Order[]>(this.endpoint + '/pullUnredeemedOrdersOfUser', {id: id}); 
  }

  getAllOrders(){
    return this.httpClient.get<Order>(this.endpoint + '/OrderData')
    .pipe(
      retry(1),
      catchError(this.processError)
    );
  }

  getOrdersFromMerchantPerspective(id){
    return this.httpClient.put<SaludUser>(this.endpoint + '/pullUnredeemedOrdersOfUser', {id: id}); 
  }

  processError(err) {
    let message = '';
    if(err.error instanceof ErrorEvent) {
     message = err.error.message;
    } else {
     message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(message);
 }
}
