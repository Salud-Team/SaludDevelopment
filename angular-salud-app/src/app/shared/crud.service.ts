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

interface BigOrder{
  id: Number;
  gifter_id: Number; 
  recipient_id: Number; 
  merchant_id: Number;
  amount: Number;
  description: String;
  //Check if/how we store videos
  redeemed: Boolean,
  gifter: SaludUser, 
  recipient: SaludUser, 
  merchant: SaludUser
}

interface Merchant{
  id: Number;
  name: String;
  location: String; 
  food_type: String
}
interface BigMerchant{
  name: String;
  id: Number;
  phone_num: Number; 
  email: String;
  password: String;
  personalUser: Boolean; 
  merchant: Merchant
}
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  endpoint = 'http://localhost:8080';
  savedSaludUser: SaludUser; 
  recipient_id: number; 
  merchant_id: number; 

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

  getOtherPersonalUsers(id): Observable<SaludUser> {
    return this.httpClient.put<SaludUser>(this.endpoint + '/RecipientScreen', {id: id})
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

  getMerchantUsersWithSaludUserInfo(): Observable<BigMerchant> {
    return this.httpClient.get<BigMerchant>(this.endpoint + '/PullAllMerchants')
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

  getBigOrdersOfUser(id){
    return this.httpClient.put<BigOrder[]>(this.endpoint + '/aggregationOrderOfUser', {id: id}); 
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
