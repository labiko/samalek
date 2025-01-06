import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../global.service';
import { SamalekProduct } from '../models/samalek-product.model';
import { SamalekCategory } from '../models/samalek-category.model';
import { SamalekMarche } from '../models/SamalekMarche';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private categorysSubject = new BehaviorSubject<SamalekCategory[]>([]);
  private productsSubject = new BehaviorSubject<SamalekProduct[]>([]);
  private cartSubject = new BehaviorSubject<{ product: SamalekProduct, quantity: number, price: number }[]>([]);
  private categorysLoaded = false;
  private marchesLoaded = false;
  private marcheSubject = new BehaviorSubject<SamalekMarche[]>([]);
  constructor(private http: HttpClient, private GlobalService: GlobalService) { }

  getCategorys(): Observable<SamalekCategory[]> {
    if (!this.categorysLoaded) {
      this.http.get<SamalekCategory[]>(this.GlobalService.BaseUrl + this.GlobalService.Module_Samalek + "/GetListCategorys")
        .subscribe({
          next: (categories) => {
            this.categorysSubject.next(categories);
            this.categorysLoaded = true;
          },
          error: (error) => {
            console.error('Erreur lors du chargement des catégories:', error);
            // Gérer l'erreur ici (par exemple, afficher un message à l'utilisateur)
          }
        });
    }
    return this.categorysSubject.asObservable();
  }

  getProducts(): Observable<SamalekProduct[]> {
    return this.http.get<SamalekProduct[]>(this.GlobalService.BaseUrl + this.GlobalService.Module_Samalek + "/GetListProductWithCategorie").pipe(
      tap(products => this.productsSubject.next(products))
    );
  }

  getCartItems(): Observable<{ product: SamalekProduct, quantity: number, price: number }[]> {
    return this.cartSubject.asObservable();
  }

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

  GetMarcheList(): Observable<SamalekMarche[]> {
    this.http.get<SamalekMarche[]>(this.GlobalService.BaseUrl + this.GlobalService.Module_Samalek + "/GetMarcheList")
      .subscribe({
        next: (marches) => {
          this.marcheSubject.next(marches);
          this.marchesLoaded = true;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des marches:', error);
        }
      });
    return this.marcheSubject.asObservable();
  }

  getTotalPriceToFloat(): Observable<number> {
    return this.cartSubject.pipe(
      map(cart =>
        parseFloat(
          cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
        )
      )
    );
  }
}

