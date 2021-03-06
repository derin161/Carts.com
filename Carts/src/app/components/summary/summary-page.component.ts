import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ErrorHandler } from '@angular/core';

import { ShippingInfo } from 'src/app/models/shipping-info';
import { ShippingInfoService } from 'src/app/services/shipping-info.service';
import { paymentInfo } from 'src/app/models/paymentInfo';
import { PaymentInfoService } from 'src/app/services/payment.service';
import { CatalogToCartService } from 'src/app/services/catalog-to-cart.service';
import { CartItem } from 'src/app/models/cart-item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.css']
})
export class SummaryPageComponent implements OnInit {
  @Injectable()
  configUrl = "http://localhost:9080/order-processing/order/authorization"

  handleError: ErrorHandler;
  totalMoney : number =0;
  itemArray : string[]=[];
  itemAllName : string ="";
  myPayment : paymentInfo |undefined;
  myShipping : ShippingInfo |undefined;
  myCartInfo : CartItem[] =[];
  lastFour: string ="";

  constructor(private pis:PaymentInfoService, private sis:ShippingInfoService, private cis: CatalogToCartService,private http: HttpClient, handleError: ErrorHandler){
    this.myPayment=pis.pInfo;
    this.myShipping=sis.shippingInfo;
    this.myCartInfo = cis.cartItems;
    this.handleError = handleError;
    for(let i =0;i<this.myCartInfo.length;i++){
      this.totalMoney += this.myCartInfo[i].price;
      this.itemArray[i]= this.myCartInfo[i].name;
    }
    this.itemAllName = this.itemArray.toString();
    let length = this.myPayment.mCardNumber.length;
    this.lastFour = '*'.repeat((length - 4));
    this.lastFour+= this.myPayment.mCardNumber.substring((length-4));
  }
  postData() {
    this.http.get(this.configUrl).subscribe((authorized:any) => {
      if (authorized == true){
        console.log("payment authorized")
      }else{
        console.log("payment not authorized")
      }
    })
  }

  ngOnInit(): void {
  }

}
