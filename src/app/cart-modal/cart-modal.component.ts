import { Component, Input, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Product, ProductService } from '../services/product.service';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PaiementSelectComponent } from '../paiement-select/paiement-select.component';
interface CartItem {
  id: number;
  libelle: string;
  prix: number;
  quantite: number;
  image: string;
}
@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CartModalComponent implements OnInit {
  @Input() cartItems: Product[] = [];
  @Input() total: number = 0;
  cartItems$: Observable<Product[]>;
  totalItems$: Observable<number>;
  totalPrice$: Observable<number>;
  isLoading: boolean = false;
  loadingMessage: string = 'Traitement en cours...';
  constructor(private modalController: ModalController, private productService: ProductService) {
    this.cartItems$ = this.productService.getCartItems();
    this.totalItems$ = this.productService.getTotalItems();
    this.totalPrice$ = this.productService.getTotalPrice();
  }
  ngOnInit() { }

  incrementQuantity(productId: number) {
    this.productService.incrementQuantity(productId);
  }

  decrementQuantity(productId: number) {
    this.productService.decrementQuantity(productId);
  }

  removeItem(productId: number) {
    this.productService.removeFromCart(productId);
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async checkout() {
    this.isLoading = true;
    this.loadingMessage = 'Initialisation du paiement...';
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.loadingMessage = 'Vérification du panier...';
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.loadingMessage = 'Finalisation de la transaction...';
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Ajoutez ici la logique de paiement réelle
    this.isLoading = false;
    this.loadingMessage = 'Traitement en cours...'; // Réinitialiser le message
    this.OpenModalPaiementSelect();
  }

  handleImageError(event: any) {
    event.target.src = 'https://images.unsplash.com/photo-1604495772376-9657f0035eb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80'; // Remplacez par le chemin de votre image par défaut
  }

  async OpenModalPaiementSelect() {
    const modal = await this.modalController.create({
      component: PaiementSelectComponent,
    });
    return await modal.present();
  }
}
