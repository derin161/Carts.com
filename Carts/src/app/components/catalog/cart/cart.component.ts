import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';
import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product';
import { CatalogToCartService } from 'src/app/services/catalog-to-cart.service';
import { AddToCart } from 'src/app/models/add-to-cart';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  cartTotal = 0;

  constructor(private msg: MessengerService, private ctcServe:CatalogToCartService) { 
    if (this.ctcServe.cartItems.length > 0) {
      this.cartItems = this.ctcServe.cartItems;
      this.cartTotal = this.ctcServe.total;
    }
  }

  ngOnInit(): void {
    this.msg.getMsg().subscribe((addToCart: any)  => {this.addProductToCart(addToCart)});
  }

  addProductToCart(addToCart: AddToCart) {
    let itemExists = false;
    let product = addToCart.mProduct;
    for (let i in this.cartItems) {
      if (this.cartItems[i].productId === product.id){
        if (addToCart.mQty != null && addToCart.mQty > 1) {
          this.cartItems[i].qty += addToCart.mQty;
        } else {
          this.cartItems[i].qty += 1;
        }
        itemExists = true;
        break;
      }
    }

    if (!itemExists){
      if (addToCart.mQty != null && addToCart.mQty > 1) {
        this.cartItems.push(new CartItem(1, product.id, product.name, addToCart.mQty, product.price, product.imageUrl, product.description));
      }else {
        this.cartItems.push(new CartItem(1, product.id, product.name, 1, product.price, product.imageUrl, product.description));
      }
    }

    this.goToCart();
    this.cartTotal = this.ctcServe.total;
  }

  goToCart() {
    this.ctcServe.cartItems = this.cartItems;
  }

}
