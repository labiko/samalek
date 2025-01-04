import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IonContent, AnimationController, ModalController, Platform, MenuController } from '@ionic/angular';
import { Product, ProductService } from '../services/product.service';
import { CartModalComponent } from '../cart-modal/cart-modal.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BehaviorSubject, Observable, timer, Subscription ,of} from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('void => *', [
        style({
          transform: 'translateX(100%)',
          opacity: 0
        }),
        animate('300ms ease-out')
      ]),
      transition('* => void', [
        animate('300ms ease-in', style({
          transform: 'translateX(100%)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class Tab1Page implements OnInit, OnDestroy {
  @ViewChild(IonContent, { static: false }) content!: IonContent;

  isLoading = false;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  currentPage = 1;
  itemsPerPage = 20;
  cartItems$: Observable<Product[]>;
  totalItems$: Observable<number>;
  totalPrice$: Observable<number>;

  searchTerm: string = '';
  sortOption: string = 'name';
  selectedCategory: string = 'all';
  isSearchBarVisible = false;
  isDarkMode: boolean = false;
  prefersDark: MediaQueryList;

  private productsSubject = new BehaviorSubject<void>(undefined);
  private subscription: Subscription = new Subscription();
  products$: Observable<Product[]> = of([]); // Initialisation avec un Observable vide

  constructor(
    private productService: ProductService,
    private animationCtrl: AnimationController,
    private modalController: ModalController,
    private platform: Platform,public menuCtrl: MenuController,
  ) {
    this.cartItems$ = this.productService.getCartItems();
    this.totalItems$ = this.productService.getTotalItems();
    this.totalPrice$ = this.productService.getTotalPrice();
    this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  }

  ngOnInit() {
    this.menuCtrl.enable(true, 'main-menu');
    this.platform.ready().then(() => {
      this.checkDarkMode();
      this.prefersDark.addEventListener('change', this.mediaQueryListener);
    });

    this.setupProductsObservable();
    this.loadProducts();
  }

  private setupProductsObservable() {
    this.products$ = this.productsSubject.pipe(
      switchMap(() => {
        this.isLoading = true;
        return this.productService.getProducts();
      }),
      shareReplay(1)
    );

    this.subscription = this.products$.subscribe(
      products => {
        this.isLoading = false;
        this.products = products;
        this.applyFilters();
        this.animateProducts();
      },
      error => {
        this.isLoading = false;
        console.error('Error fetching products:', error);
      }
    );

    // Configurer la réactualisation automatique
    this.subscription.add(
      timer(0, 60000).subscribe(() => this.loadProducts())
    );
  }

  loadProducts() {
    this.productsSubject.next();
  }

  ngOnDestroy() {
    this.prefersDark.removeEventListener('change', this.mediaQueryListener);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  mediaQueryListener = (e: MediaQueryListEvent) => {
    this.checkDarkMode();
  }

  checkDarkMode() {
    this.isDarkMode = this.prefersDark.matches;
    document.body.classList.toggle('dark', this.isDarkMode);
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark', this.isDarkMode);
  }

  ionViewDidEnter() {
    this.content.scrollToTop(300);
  }

  animateProducts() {
    const animation = this.animationCtrl.create()
      .addElement(document.querySelectorAll('ion-card'))
      .duration(500)
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'translateY(20px)', 'translateY(0)');

    animation.play();
  }

  applyFilters() {
    this.filteredProducts = this.products
      .filter(product => {
        const matchesSearch = product.libelle.toLowerCase().includes(this.searchTerm.toLowerCase());
        const matchesCategory = this.selectedCategory === 'all' || product.category === this.selectedCategory;
        return matchesSearch && matchesCategory;
      });

    this.sortProducts();
    this.currentPage = 1;
  }

  sortProducts() {
    this.filteredProducts.sort((a, b) => {
      if (this.sortOption === 'name') {
        return a.libelle.localeCompare(b.libelle);
      } else if (this.sortOption === 'price_asc') {
        return a.prix - b.prix;
      } else if (this.sortOption === 'price_desc') {
        return b.prix - a.prix;
      }
      return 0;
    });
  }

  onSearchChange() {
    this.applyFilters();
  }

  onSortChange(event: any) {
    this.sortOption = event.detail.value;
    this.applyFilters();
  }

  onCategoryChange(event: any) {
    this.selectedCategory = event.detail.value;
    this.applyFilters();
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
    this.menuCtrl.close('main-menu');
  }

  toggleSearchBar() {
    this.isSearchBarVisible = !this.isSearchBarVisible;
  }

  incrementQuantity(product: Product) {
    if (!product.enRupture) {
      this.productService.updateProductQuantity(product.id, product.quantite + 1);
      this.animateCart();
    }
  }

  decrementQuantity(product: Product) {
    if (!product.enRupture && product.quantite > 0) {
      this.productService.updateProductQuantity(product.id, product.quantite - 1);
      this.animateCart();
    }
  }

  getTotalItems() {
    return this.filteredProducts.reduce((total, product) => total + product.quantite, 0);
  }

  getTotalPrice() {
    return this.filteredProducts.reduce((total, product) => total + (product.prix * product.quantite), 0);
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
    return this.filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
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
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  async openCartModal() {
    const modal = await this.modalController.create({
      component: CartModalComponent,
    });
    return await modal.present();
  }

  handleImageError(event: any) {
    event.target.src = 'https://images.unsplash.com/photo-1604495772376-9657f0035eb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80';
  }


}

