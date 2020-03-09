import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { homeCard } from 'src/app/models/eservices/homeCard';

@Injectable({
  providedIn: 'root'
})
export class HomeCardService {


  selectedHomeCard : homeCard;
  homeCards: homeCard[];
  readonly URL  = 'http://localhost:3000/api/eservices/card';
 
  constructor(private http: HttpClient ) {
  //  this.selectedHomeCard = new homeCard();
    }

    //get card by user pending 

  public getCardByUserAndType(userId, cardType:any){

    const array = ({
      userId: userId,
      cardType: cardType,
      // color:color, 
    }); 
   // console.log(array)
    return this.http.post (this.URL + '/getCardByUserAndType', array); 
  }

  public postCard(array){
    return this.http.post(this.URL + '/postCard' , array)
  }
  
  public putCard (array, cardId){
    return this.http.put(this.URL + '/putCard/' + cardId, array); 
   }
  
}
