import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../global.service';
import { SamalekProduct } from '../models/samalek-product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject = new BehaviorSubject<SamalekProduct[]>([]);
  private cartSubject = new BehaviorSubject<{product: SamalekProduct, quantity: number, price: number}[]>([]);
  constructor(private http: HttpClient, private GlobalService: GlobalService) {}

  // getProducts(): Observable<SamalekProduct[]> {
  //   return this.http.get<SamalekProduct[]>(this.GlobalService.BaseUrl + this.GlobalService.Module_Samalek + "/GetListProductWithCategorie").pipe(
  //     tap(products => this.productsSubject.next(products))
  //   );
  // }

  getProducts(): Observable<SamalekProduct[]> {
    return this.http.get<SamalekProduct[]>(this.GlobalService.BaseUrl + this.GlobalService.Module_Samalek + "/GetListProductWithCategorie").pipe(
      tap(products => this.productsSubject.next(products))
    );
  }

  // getCartItems(): Observable<SamalekProduct[]> {
  //   return this.productsSubject.pipe(
  //     map(products => products.filter(product => product.Quantite > 0))
  //   );
  // }

  getCartItems(): Observable<{product: SamalekProduct, quantity: number, price: number}[]> {
    return this.cartSubject.asObservable();
  }

  // getTotalItems(): Observable<number> {
  //   return this.productsSubject.pipe(
  //     map(products => products.reduce((total, product) => total + product.Quantite, 0))
  //   );
  // }

  // getTotalPrice(): Observable<number> {
  //   return this.productsSubject.pipe(
  //     map(products => products.reduce((total, product) => {
  //       const price = product.EnPromo && product.PrixPromo !== undefined ? product.PrixPromo : product.Prix;
  //       return total + (price * product.Quantite);
  //     }, 0))
  //   );
  // }

  getTotalItems(): Observable<number> {
    return this.cartSubject.pipe(
      map(cart => cart.reduce((total, item) => total + item.quantity, 0))
    );
  }

  getTotalPrice(): Observable<number> {
    return this.cartSubject.pipe(
      map(cart => cart.reduce((total, item) => total + (item.price * item.quantity), 0))
    );
  }

  getProductsByCategory(category: string): Observable<SamalekProduct[]> {
    return this.productsSubject.pipe(
      map(products => products.filter(product => category === 'all' || product.category === category))
    );
  }

  // private updateProductQuantity(productId: number, quantityChange: number, isIncrement: boolean = false): void {
  //   const currentProducts = this.productsSubject.value;
  //   const index = currentProducts.findIndex(p => p.Id === productId);
  //   if (index !== -1) {
  //     if (isIncrement) {
  //       currentProducts[index].Quantite += quantityChange;
  //     } else {
  //       currentProducts[index].Quantite = quantityChange;
  //     }
  //     if (currentProducts[index].Quantite < 0) {
  //       currentProducts[index].Quantite = 0;
  //     }
  //     this.productsSubject.next([...currentProducts]);
  //   }
  // }

  // addToCart(productId: number): void {
  //   this.updateProductQuantity(productId, 1, true);
  // }

  private updateProductQuantity(productId: number, quantityChange: number, isIncrement: boolean = false): void {
    const currentProducts = this.productsSubject.value;
    const productIndex = currentProducts.findIndex(p => p.Id === productId);
    
    if (productIndex !== -1) {
      const product = currentProducts[productIndex];
      let newQuantity: number;
      
      if (isIncrement) {
        newQuantity = product.Quantite + quantityChange;
      } else {
        newQuantity = quantityChange;
      }
      
      newQuantity = Math.max(0, newQuantity); // Ensure quantity is not negative
      currentProducts[productIndex] = { ...product, Quantite: newQuantity };
      
      this.productsSubject.next([...currentProducts]);
      
      // Update cart
      const currentCart = this.cartSubject.value;
      const cartItemIndex = currentCart.findIndex(item => item.product.Id === productId);
      const price = product.EnPromo && product.PrixPromo !== undefined ? product.PrixPromo : product.Prix;
      
      if (cartItemIndex !== -1) {
        if (newQuantity > 0) {
          currentCart[cartItemIndex] = { product, quantity: newQuantity, price };
        } else {
          currentCart.splice(cartItemIndex, 1);
        }
      } else if (newQuantity > 0) {
        currentCart.push({ product, quantity: newQuantity, price });
      }
      
      this.cartSubject.next([...currentCart]);
    }
  }

  addToCart(productId: number): void {
    this.updateProductQuantity(productId, 1, true);
  }
  removeFromCart(productId: number): void {
    this.updateProductQuantity(productId, 0);
  }

  incrementQuantity(productId: number): void {
    this.updateProductQuantity(productId, 1, true);
  }

  decrementQuantity(productId: number): void {
    this.updateProductQuantity(productId, -1, true);
  }
}

