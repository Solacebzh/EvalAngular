import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';
import {ActivatedRoute, Params} from '@angular/router';
import { ProductComponent } from '../product/product.component';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  products: Product[] = [];
  oneProduct:Product
  sortKey: keyof Product = 'id';


  constructor(private productService:ProductService, private route: ActivatedRoute,private customerService: CustomerService) {
    productService.getProducts().subscribe(products => {
      this.products = products;
    })

   }

  ngOnInit() {
    this.route.params.subscribe((params: Params): void => {
      const id = String(params.id);
      console.log(id)
  
    
    this.productService.getProduct(id).subscribe(product => { 
      this.oneProduct= product
    })
  
  })
  
  }
  addToBasket(event: Product): void {
    this.customerService.addProduct(event);
    this.productService.decreaseStock(event);
  }
  isTheLast() {
    return this.productService.isTheLast(this.oneProduct);
  }
  outOfStock() {
    return this.productService.outOfStock(this.oneProduct);
  }
  equalProduct(a,b){
    a =b
  }

}
