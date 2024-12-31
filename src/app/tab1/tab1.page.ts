import { Component } from '@angular/core';
import { Product, ProductService } from '../services/product.service';
import { AnimationController, ModalController } from '@ionic/angular';
import { CartModalComponent } from '../cart-modal/cart-modal.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  products: Product[] = [];
  currentPage = 1;
  itemsPerPage = 20;
  cartItems$: Observable<Product[]>;
  totalItems$: Observable<number>;
  totalPrice$: Observable<number>;
  constructor(
    private productService: ProductService,
    private animationCtrl: AnimationController, private modalController: ModalController
  ) {
 
    this.cartItems$ = this.productService.getCartItems();
    this.totalItems$ = this.productService.getTotalItems();
    this.totalPrice$ = this.productService.getTotalPrice();
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  incrementQuantity(product: Product) {
    this.productService.updateProductQuantity(product.id, product.quantite + 1);
    this.animateCart();
  }

  decrementQuantity(product: Product) {
    if (product.quantite > 0) {
      this.productService.updateProductQuantity(product.id, product.quantite - 1);
      this.animateCart();
    }
  }

  getTotalItems() {
    return this.products.reduce((total, product) => total + product.quantite, 0);
  }

  getTotalPrice() {
    return this.products.reduce((total, product) => total + (product.prix * product.quantite), 0);
  }

  animateCart() {
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
      const animation = this.animationCtrl.create()
        .addElement(cartIcon)
        .duration(300)
        .iterations(1)
        .keyframes([
          { offset: 0, transform: 'scale(1)' },
          { offset: 0.5, transform: 'scale(1.2)' },
          { offset: 1, transform: 'scale(1)' }
        ]);
      animation.play();
    }
  }

  get paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.products.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get totalPages() {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  async openCartModal() {
    const modal = await this.modalController.create({
      component: CartModalComponent,
    });
    return await modal.present();
  }
  
  handleImageError(event: any) {
    event.target.src = 'https://images.unsplash.com/photo-1604495772376-9657f0035eb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80'; // Remplacez par le chemin de votre image par défaut
  }


}
