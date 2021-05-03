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
  personalUser: Boolean;
  picture: String
}

interface Order{
  id: Number;
  gifter_id: Number; 
  recipient_id: Number; 
  merchant_id: Number;
  amount: Number;
  description: String;
  //Check if/how we store videos
  redeemed: Boolean;
  qrcode: String;
  video: String
}

interface BigOrder{
  id: Number;
  gifter_id: Number; 
  recipient_id: Number; 
  merchant_id: Number
  amount: Number;
  description: String;
  redeemed: Boolean;
  qrcode: String;
  video: String;
  gifter: SaludUser;
  recipient: SaludUser;
  merchant: SaludUser
}

interface Merchant{
  id: Number;
  name: String;
  location: String; 
  city: String; 
  state: String; 
  zip_code: String; 
  food_type: String
}
interface BigMerchant{
  name: String;
  id: Number;
  phone_num: Number; 
  email: String;
  password: String;
  personalUser: Boolean;
  picture: String;  
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
  order_description: string; 
  order_amount: number; 
  food_type: string; 
  occasion: string; 
  video_link: string; 
  redeemed_order: string;
  redeemed_gifter: string; 
  redeemed_merchant: string;  

  constructor(public httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  } 

  saveSaludUser(name, id, phonenum, email, password, personalUser, picture=""){
    var saludData: SaludUser = {
      name: name, 
      id: id,
      phone_num: phonenum,
      email: email, 
      password: password, 
      personalUser: personalUser, 
      picture: picture
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

  getOrder(id): Observable<Order>{
    return this.httpClient.put<Order>(this.endpoint + '/findOrder', {id: id})
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

  getUserById(id): Observable<SaludUser>{
    return this.httpClient.put<SaludUser>(this.endpoint + '/getUserbyId', {id: id})
    .pipe(
      retry(1),
      catchError(this.processError)
    )
  }

  getMerchantById(id): Observable<BigMerchant>{
    return this.httpClient.put<BigMerchant>(this.endpoint + '/getMerchantById', {id: id})
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

  validateMerchantLogin(em, pass){
    return this.httpClient.put<SaludUser>(this.endpoint + '/login', {email: em, password: pass, personalUser: false}); 
  }

  getUserOrders(id){
    return this.httpClient.put<Order[]>(this.endpoint + '/pullUnredeemedOrdersOfUser', {id: id}); 
  }

  getReceivedUserOrders(id){
    return this.httpClient.put<Order[]>(this.endpoint + '/pullUnredeemedOrdersGivenToUser', {id: id}); 
  }

  createOrder(gifter_id, recipient_id, merchant_id, amount, description, video_link){
    return this.httpClient.post(this.endpoint + '/OrderData', {gifter_id: gifter_id, recipient_id: recipient_id, merchant_id: merchant_id, amount: amount, description: description, video: video_link}, {responseType: 'text'}); 
  }

  createOrderQRCode(id): Observable<Order>{
    return this.httpClient.put<Order>(this.endpoint + '/OrderQRCodes', {id: id}); 
  }


  createPersonalUser(name, phone_num, email, password, payment_type, picture){
    return this.httpClient.post(this.endpoint + '/signupPersonal', {name: name, phone_num: phone_num, email: email, password: password, payment_type: payment_type, picture: picture||""}, {responseType: 'text'});
  }

  createMerchantUser(name, phone_num, email, password, location, food_type, picture){
    return this.httpClient.post(this.endpoint + '/signupMerchant', {name: name, phone_num: phone_num, email: email, password: password, location: location, food_type: food_type, picture: picture||""}, {responseType: 'text'});
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

  getReceievedBigOrdersOfUser(id){
    return this.httpClient.put<BigOrder[]>(this.endpoint + '/aggregationReceivedOrderOfUser', {id: id}); 
  }

  getCurrentReceievedBigOrdersOfUser(id){
    return this.httpClient.put<BigOrder[]>(this.endpoint + '/aggregationReceivedValidOrderOfUser', {id: id}); 
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
