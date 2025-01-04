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
  enRupture: boolean;
  category: string; // Nouvelle propriété
  enPromo: boolean;
  prixPromo?: number;
}

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private products: Product[] = [
    { id: 11, libelle: 'Gombo xx', description: 'Ail frais à l\'unité', prix: 1.00, quantite: 0, image: 'https://www.farafinabonamarket.fr/wp-content/uploads/2021/06/gombo.jpg', enRupture: false, category: 'Fruits & légumes', enPromo: true, prixPromo: 0.80 },
  
    { id: 12, libelle: 'Anchois entiers séchés', description: 'Anchois entiers séchés - 80g', prix: 7.90, quantite: 0, image: 'https://usercontent.one/wp/www.farafinabonamarket.fr/wp-content/uploads/2024/05/Farafina-bona-market-Epicerie-africaine-antilles-exotique-montpellier-petit-colas.svg?media=1728861895', enRupture: false, category: 'Viandes & Poissons', enPromo: true, prixPromo: 6.90 },
  
    { id: 13, libelle: 'Arachide râpée brune', description: 'Arachide râpée brune 1 kg', prix: 7.90, quantite: 0, image: 'https://usercontent.one/wp/www.farafinabonamarket.fr/wp-content/uploads/2024/10/photo_5830173222920897450_y-300x300.jpg?media=1728861895', enRupture: false, category: 'Epicerie', enPromo: true, prixPromo: 6.90 },
  
    { id: 14, libelle: 'Arachides Crues Décortiquées', description: 'Arachides Crues Décortiquées 1 kg', prix: 8.90, quantite: 0, image: 'https://usercontent.one/wp/www.farafinabonamarket.fr/wp-content/uploads/2024/11/photo_5830173222920897446_y-300x300.jpg?media=1728861895', enRupture: false, category: 'Epicerie', enPromo: true, prixPromo: 7.90 },
  
    { id: 15, libelle: 'Arachides fraîches', description: 'Arachides fraîches par 100g', prix: 1.50, quantite: 0, image: 'https://usercontent.one/wp/www.farafinabonamarket.fr/wp-content/uploads/2024/11/IMG_6078-300x300.jpg?media=1728861895', enRupture: false, category: 'Fruits & légumes', enPromo: true, prixPromo: 1.20 },
  
    { id: 16, libelle: 'Arachides Grillées', description: 'Arachides Grillées 300g', prix: 5.90, quantite: 0, image: 'https://usercontent.one/wp/www.farafinabonamarket.fr/wp-content/uploads/2024/11/photo_5830173222920897668_y-300x300.jpg?media=1728861895', enRupture: false, category: 'Epicerie', enPromo: true, prixPromo: 4.90 },
  
    { id: 17, libelle: 'Arachides Grillées Caramélisées', description: 'Arachides Grillées Caramélisées 300g', prix: 5.90, quantite: 0, image: 'https://usercontent.one/wp/www.farafinabonamarket.fr/wp-content/uploads/2024/11/photo_5830173222920897673_y-300x300.jpg?media=1728861895', enRupture: false, category: 'Epicerie', enPromo: true, prixPromo: 4.90 },
  
    { id: 18, libelle: 'Arachides Ndolé', description: 'Arachides Ndolé 1 Kilo', prix: 8.90, quantite: 0, image: 'https://usercontent.one/wp/www.farafinabonamarket.fr/wp-content/uploads/2024/12/ndole-300x300.jpeg?media=1728861895', enRupture: false, category: 'Epicerie', enPromo: true, prixPromo: 7.90 },
  
    { id: 19, libelle: 'Aubergines blanches', description: 'Aubergines blanches – Par 100g', prix: 1.50, quantite: 0, image: 'https://usercontent.one/wp/www.farafinabonamarket.fr/wp-content/uploads/2024/12/IMG_6063-300x300.jpg?media=1728861895', enRupture: false, category: 'Fruits & légumes', enPromo: true, prixPromo: 1.20 },
  
    { id: 20, libelle: 'Banane Plantain Verte', description: 'Banane Plantain Verte – unité d\'environ 250g', prix: 2.00, quantite: 0, image: 'https://usercontent.one/wp/www.farafinabonamarket.fr/wp-content/uploads/2024/12/banane-verte-300x300.jpg?media=1728861895', enRupture: false, category: 'Fruits & légumes', enPromo: true, prixPromo: 1.70 },
  
    { id: 21, libelle: 'Beurre de Karité', description: 'Beurre de Karité 100g', prix: 5.99, quantite: 0, image: 'https://usercontent.one/wp/www.farafinabonamarket.fr/wp-content/uploads/2024/11/beurre-de-karite-1-300x300.jpg?media=1728861895', enRupture: false, category: 'Epicerie', enPromo: true, prixPromo: 4.99 },
  
    { id: 22, libelle: 'Bicarbonate alimentaire Samia', description: 'Bicarbonate alimentaire Samia 300g', prix: 3.90, quantite: 0, image: 'https://usercontent.one/wp/www.farafinabonamarket.fr/wp-content/uploads/2024/12/samia-300x300.jpeg?media=1728861895', enRupture: false, category: 'Epicerie', enPromo: true, prixPromo: 3.20 },
  
    { id: 23, libelle: 'Bicarbonate de soude Alibaba', description: 'Bicarbonate de soude Alibaba 100g', prix: 2.90, quantite: 0, image: 'https://usercontent.one/wp/www.farafinabonamarket.fr/wp-content/uploads/2024/12/bicarbonate-alibaba-300x300.jpeg?media=1728861895', enRupture: false, category: 'Epicerie', enPromo: true, prixPromo: 2.40 },
  
    { id: 24, libelle: 'Boisson Concentrée au Gingembre Happy Life', description: 'Boisson Concentrée au Gingembre Happy Life', prix: 5.99, quantite: 0, image: 'https://usercontent.one/wp/www.farafinabonamarket.fr/wp-content/uploads/2024/10/photo_5830173222920897662_y-300x300.jpg?media=1728861895', enRupture: false, category: 'Epicerie', enPromo: true, prixPromo: 4.99 },
  
    { id: 25, libelle: 'Boisson instantanée au Gingembre et citron Gold Kili', description: 'Boisson instantanée au Gingembre et citron Gold Kili', prix: 4.99, quantite: 0, image: 'https://usercontent.one/wp/www.farafinabonamarket.fr/wp-content/uploads/2024/10/gold-kili-citrin_clipped_rev_1-300x300.jpeg?media=1728861895', enRupture: false, category: 'Epicerie', enPromo: true, prixPromo: 3.99 },
  
    { id: 26, libelle: 'Boisson instantanée au Gingembre Gold Kili', description: 'Boisson instantanée au Gingembre Gold Kili', prix: 4.99, quantite: 0, image: 'https://usercontent.one/wp/www.farafinabonamarket.fr/wp-content/uploads/2024/07/gold-kili_clipped_rev_1-300x300.jpeg?media=1728861895', enRupture: false, category: 'Epicerie', enPromo: true, prixPromo: 3.99 },
  
    { id: 27, libelle: 'Piment végétarien', description: 'Piment végétarien', prix: 0, quantite: 0, image: 'https://usercontent.one/wp/www.farafinabonamarket.fr/wp-content/uploads/2024/05/Taille-originale-Farafina-bona-market-Epicerie-africaine-antilles-exotique-montpellier-Piment-vegetarien.svg?media=1728861895', enRupture: false, category: 'Epicerie', enPromo: false, prixPromo: 0 },
  
    { id: 28, libelle: 'Petit cola', description: 'Petit cola', prix: 4.00, quantite: 0, image: 'https://usercontent.one/wp/www.farafinabonamarket.fr/wp-content/uploads/2024/05/Farafina-bona-market-Epicerie-africaine-antilles-exotique-montpellier-petit-colas.svg?media=1728861895', enRupture: false, category: 'Epicerie', enPromo: false, prixPromo: 0 },
  
    { id: 29, libelle: 'Citronnelle gingembre', description: 'Citronnelle gingembre', prix: 4.00, quantite: 0, image: 'https://usercontent.one/wp/www.farafinabonamarket.fr/wp-content/uploads/2022/11/Citronnelle-gingembre-300x300.png?media=1728861895', enRupture: false, category: 'Epicerie', enPromo: false, prixPromo: 0 },
  
    { id: 30, libelle: 'Champignon noir', description: 'Champignon noir', prix: 5.95, quantite: 0, image: 'https://usercontent.one/wp/www.farafinabonamarket.fr/wp-content/uploads/2022/05/champignon-noir-300x300.jpg?media=1728861895', enRupture: false, category: 'Fruits & légumes', enPromo: false, prixPromo: 0 },
  
    { id: 31, libelle: 'Fufu Banane Plantain', description: 'Fufu Banane Plantain', prix: 6.99, quantite: 0, image: 'https://usercontent.one/wp/www.farafinabonamarket.fr/wp-content/uploads/2024/05/Farafina-bona-market-Epicerie-africaine-antilles-exotique-montpellier-Fufu-Banane-Plantain.png?media=1728861895', enRupture: false, category: 'Epicerie', enPromo: false, prixPromo: 0 },
  
    { id: 32, libelle: 'Thiéré de mil', description: 'Thiéré de mil', prix: 2.50, quantite: 0, image: 'https://usercontent.one/wp/www.farafinabonamarket.fr/wp-content/uploads/2022/05/Thiere-de-Mil-300x300.jpg?media=1728861895', enRupture: false, category: 'Epicerie', enPromo: false, prixPromo: 0 },
  
    { id: 33, libelle: 'Fécule de pomme de terre', description: 'Fécule de pomme de terre', prix: 2.99, quantite: 0, image: 'https://usercontent.one/wp/www.farafinabonamarket.fr/wp-content/uploads/2022/04/2.Fecule-de-pomme-de-terre-300x300.jpg?media=1728861895', enRupture: false, category: 'Epicerie', enPromo: false, prixPromo: 0 },
  
    { id: 34, libelle: 'Attiéké', description: 'Attiéké', prix: 3.90, quantite: 0, image: 'https://usercontent.one/wp/www.farafinabonamarket.fr/wp-content/uploads/2022/04/attieke-racines-300x300.jpg?media=1728861895', enRupture: false, category: 'Epicerie', enPromo: false, prixPromo: 0 },
  
    { id: 35, libelle: 'Brisure de riz parfumé cassé 2 fois', description: 'Brisure de riz parfumé cassé 2 fois', prix: 0, quantite: 0, image: 'https://usercontent.one/wp/www.farafinabonamarket.fr/wp-content/uploads/2024/05/Taille-originale-Farafina-bona-market-Epicerie-africaine-antilles-exotique-montpellier-brisure-de-riz-parfume-casse-2-fois-super-N°1.png?media=1728861895', enRupture: false, category: 'Epicerie', enPromo: false, prixPromo: 0 },
  
    { id: 36, libelle: 'Riz long parfumé thaï', description: 'Riz long parfumé thaï', prix: 40.00, quantite: 0, image: 'https://usercontent.one/wp/www.farafinabonamarket.fr/wp-content/uploads/2024/05/Taille-originale-Farafina-bona-market-Epicerie-africaine-antilles-exotique-montpellier-Riz-long-parfume-thai.png?media=1728861895', enRupture: false, category: 'Epicerie', enPromo: false, prixPromo: 0 },
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
    return new Observable<boolean>(observer => {
      setTimeout(() => {
        this.clearCart();
        observer.next(true);
        observer.complete();
      }, 1000);
    });
  }

  // Nouvelle méthode pour obtenir les produits par catégorie
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.productsSubject.pipe(
      map(products => products.filter(product => category === 'all' || product.category === category))
    );
  }
}

