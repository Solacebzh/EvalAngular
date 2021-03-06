import {Injectable} from '@angular/core';

import {Product} from '../model/product';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/rest/products');
  }
  getProduct(id:string): Observable<Product> {
    return this.http.get<Product>(`http://localhost:8080/rest/products/${id}`);
  }
  isTheLast(product: Product): boolean {
    return product.stock === 1;
  }
  outOfStock(product: Product): boolean {
    return product.stock === 0;
  }

  isAvailable(product: Product): boolean {
    return product.stock !== 0;
  }

  decreaseStock(product: Product) {
    product.stock -= 1;
  }

}
