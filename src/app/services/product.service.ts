import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Product {
  id: number;
  libelle: string;
  description: string;
  prix: number;
  quantite: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, libelle: 'Mangoustan', description: 'Fruit tropical à la chair blanche et juteuse, au goût subtil et rafraîchissant.', prix: 8, quantite: 0, image: 'https://images.unsplash.com/photo-1604495772376-9657f0035eb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80' },
    { id: 2, libelle: 'Durian', description: 'Fruit à la forte odeur et à la chair crémeuse, surnommé "le roi des fruits".', prix: 15, quantite: 0, image: 'https://example.com/broken-image-link.jpg' },
    { id: 3, libelle: 'Fruit du dragon', description: 'Fruit à la chair blanche parsemée de petites graines noires, au goût doux et rafraîchissant.', prix: 6, quantite: 0, image: 'https://images.unsplash.com/photo-1604495772376-9657f0035eb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80' },
    { id: 4, libelle: 'Ramboutan', description: 'Fruit à la peau rouge hérissée de poils souples, à la chair translucide et sucrée.', prix: 7, quantite: 0, image: 'https://images.unsplash.com/photo-1624283917316-2a0054d76be1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80' },
    { id: 5, libelle: 'Fruit à pain', description: 'Gros fruit à la chair dense et farineuse, souvent utilisé comme aliment de base.', prix: 9, quantite: 0, image: 'https://example.com/another-broken-link.jpg' },
    { id: 6, libelle: 'Carambole', description: 'Fruit en forme détoile à cinq branches, à la chair croquante et acidulée.', prix: 5, quantite: 0, image: 'https://images.unsplash.com/photo-1567446051458-77050c6aa330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80' },
    { id: 7, libelle: 'Fruit de la passion', description: 'Fruit à la pulpe juteuse et acidulée, remplie de petites graines croquantes.', prix: 4, quantite: 0, image: 'https://images.unsplash.com/photo-1604495772376-9657f0035eb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80' },
    { id: 8, libelle: 'Litchi', description: 'Petit fruit à la peau rose et rugueuse, à la chair translucide et parfumée.', prix: 6, quantite: 0, image: 'https://example.com/non-existent-image.jpg' },
    { id: 9, libelle: 'Kumquat', description: 'Petit agrume ovale que lon mange entier, à la saveur douce-amère.', prix: 7, quantite: 0, image: 'https://images.unsplash.com/photo-1591206369811-4eeb2f03bc95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80' },
    { id: 10, libelle: 'Goyave', description: 'Fruit à la chair rose ou blanche, riche en vitamine C et en fibres.', prix: 5, quantite: 0, image: 'https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80' },
  ];

  private productsSubject = new BehaviorSubject<Product[]>(this.products);

  constructor() { }

  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }
  getCartItems(): Observable<Product[]> {
    return this.productsSubject.pipe(
      map(products => products.filter(product => product.quantite > 0))
    );
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

  public updateProductQuantity(productId: number, quantityChange: number, isIncrement: boolean = false): void {
    const index = this.products.findIndex(p => p.id === productId);
    if (index !== -1) {
      if (isIncrement) {
        this.products[index].quantite += quantityChange;
      } else {
        this.products[index].quantite = quantityChange;
      }
      if (this.products[index].quantite < 0) {
        this.products[index].quantite = 0;
      }
      this.productsSubject.next(this.products);
    }
  }

  getTotalItems(): Observable<number> {
    return this.productsSubject.pipe(
      map(products => products.reduce((total, product) => total + product.quantite, 0))
    );
  }

  getTotalPrice(): Observable<number> {
    return this.productsSubject.pipe(
      map(products => products.reduce((total, product) => total + (product.prix * product.quantite), 0))
    );
  }

  clearCart(): void {
    this.products.forEach(product => product.quantite = 0);
    this.productsSubject.next(this.products);
  }

  checkout(): Observable<boolean> {
    // Ici, vous pouvez ajouter la logique de paiement réelle
    // Pour cet exemple, nous allons simplement vider le panier et retourner true
    return new Observable<boolean>(observer => {
      setTimeout(() => {
        this.clearCart();
        observer.next(true);
        observer.complete();
      }, 1000); // Simuler un délai de traitement
    });
  }
}

