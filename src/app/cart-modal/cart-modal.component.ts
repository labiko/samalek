import { Component, Input, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { PaiementSelectComponent } from '../paiement-select/paiement-select.component';
import { LoginModalPage } from '../login-modal/login-modal.page';
import { SamalekProduct } from '../models/samalek-product.model';
import { ClientService } from '../client.service';
import { GlobalService } from '../global.service';
import { SamalekClient } from '../models/SamalekClient';

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
  cartItems$: Observable<{ product: SamalekProduct, quantity: number, price: number }[]>;

  @Input() cartItems: { product: SamalekProduct, quantity: number, price: number }[] = [];
  // @Input() cartItems: { product: SamalekProduct, quantity: number, price: number, client: SamalekClient }[] = [];

  @Input() total: number = 0;
  totalItems$: Observable<number>;
  totalPrice$: Observable<number>;
  isLoading: boolean = false;
  loadingMessage: string = 'Traitement en cours...';
  private cartItemsSubscription: Subscription | undefined;
  constructor(private modalController: ModalController, private productService: ProductService,
    private clientService: ClientService, private GlobalService: GlobalService
  ) {

    this.cartItems$ = this.productService.getCartItems();
    this.totalItems$ = this.productService.getTotalItems();
    this.totalPrice$ = this.productService.getTotalPrice();
  }

  ngOnInit() {
    this.subscribeToCartItems();
  }

  ngOnDestroy() {
    if (this.cartItemsSubscription) {
      this.cartItemsSubscription.unsubscribe();
    }
  }

  // private subscribeToCartItems(client?: SamalekClient) {
  //   this.cartItemsSubscription = this.cartItems$.subscribe({
  //     next: (items) => {
  //       this.cartItems = items.map(item => ({
  //         ...item,
  //         client: {
  //           Email: client?.Email,
  //           Telephone: client?.Telephone,
  //           Id: client?.Id,
  //           Nom: client?.Nom,
  //           Prenom: client?.Prenom
  //         }
  //       }));
  //       console.log('Cart items updated:', this.cartItems);
  //     },
  //     error: (error) => {
  //       console.error('Error fetching cart items:', error);
  //     }
  //   });
  // }

  private subscribeToCartItems() {
    this.cartItemsSubscription = this.cartItems$.subscribe({
      next: (items) => {
        this.cartItems = items.map(item => ({
          ...item
          // client: {
          //   Email: null,
          //   Telephone: null,
          //   Id: null,
          //   Nom: null,
          //   Prenom: null
          // }
        }));
        console.log('Cart items updated:', this.cartItems);
      },
      error: (error) => {
        console.error('Error fetching cart items:', error);
      }
    });
  }

  incrementQuantity(item: { product: SamalekProduct, quantity: number, price: number }) {
    if (!item.product.EnRupture) {
      this.productService.incrementQuantity(item.product.Id);
    }
  }

  decrementQuantity(item: { product: SamalekProduct, quantity: number, price: number }) {
    if (!item.product.EnRupture && item.quantity > 0) {
      this.productService.decrementQuantity(item.product.Id);
    }
  }

  removeItem(productId: number) {
    this.productService.removeFromCart(productId);
  }

  dismiss() {
    this.modalController.dismiss();
  }

  // async checkout() {
  //   this.isLoading = true;
  //   this.loadingMessage = 'Initialisation du paiement...';
  //   await new Promise(resolve => setTimeout(resolve, 1000));
  //   this.loadingMessage = 'Vérification du panier...';
  //   await new Promise(resolve => setTimeout(resolve, 1000));
  //   this.loadingMessage = 'Finalisation de la transaction...';
  //   await new Promise(resolve => setTimeout(resolve, 1000));
  //   // Ajoutez ici la logique de paiement réelle
  //   this.isLoading = false;
  //   this.loadingMessage = 'Traitement en cours...'; // Réinitialiser le message
  //   this.OpenModalPaiementSelect();
  // }

  async CallModalModePaiement() {
    // console.log(this.clientService.isLoggedIn())
    if (!this.clientService.isLoggedIn())
      return this.clientService.MsgLoginRequired()
    this.GlobalService.OpenModalPaiementSelect()

    // const userInfo = await this.GlobalService.getUserInfo();
    // const samalekClient: SamalekClient = {
    //   Id: userInfo.Id,
    //   Nom: userInfo.Nom,
    //   Prenom: userInfo.Prenom,
    //   Email: userInfo.Email,
    //   Telephone: userInfo.Telephone,
    // };

    // this.cartItems = this.cartItems.map(item => ({
    //   ...item,
    //   client: samalekClient
    // }));

    console.log(this.cartItems)
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
