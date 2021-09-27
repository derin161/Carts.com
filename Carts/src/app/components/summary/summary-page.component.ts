import { Component, OnInit } from '@angular/core';
import { ShippingInfo } from 'src/app/models/shipping-info';
import { ShippingInfoService } from 'src/app/services/shipping-info.service';
import { paymentInfo } from 'src/app/models/paymentInfo';
import { PaymentInfoService } from 'src/app/services/payment.service';
@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.css']
})
export class SummaryPageComponent implements OnInit {
 myPayment : paymentInfo |undefined;
  constructor(private pis:PaymentInfoService){
    this.myPayment=pis.pInfo;
    console.log(this.pis.pInfo?.CVV);
  }

  ngOnInit(): void {
  }

}
