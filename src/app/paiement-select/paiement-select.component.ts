import { CommonModule } from '@angular/common';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { TimeSlotModalComponent } from '../time-slot-modal/time-slot-modal.component';
import { GlobalService } from '../global.service';
import { SamalekClient } from '../models/SamalekClient';
import { ProductService } from '../services/product.service';
import { managecommandes } from '../models/managecommandes';
import { Subscription } from 'rxjs';
import { SamalekMarche } from '../models/SamalekMarche';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-paiement-select',
  templateUrl: './paiement-select.component.html',
  styleUrls: ['./paiement-select.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PaiementSelectComponent implements OnInit {
  selectedMethod: any | null = null;
  private manageCommandes!: managecommandes;
  private subscription: Subscription = new Subscription();
  constructor(private modalCtrl: ModalController, private globalService: GlobalService,
    private productService: ProductService
  ) {

  }

  ngOnInit() { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  selectMethod(method: string) {
    this.selectedMethod = method;
  }

  async initializeManageCommandes() {
    const userInfo: SamalekClient = await this.globalService.getUserInfo();
    const marcheInfo: SamalekMarche = await this.globalService.getMarcheSelectedUserInfo()
    const moyenPaiement: any = await this.globalService.getMoyenPaiementSelectione()
    const result = await firstValueFrom(this.productService.getTotalPriceToFloat());

    this.subscription.add(
      this.productService.getCartItems().subscribe({
        next: (cartItems) => {
          this.manageCommandes = {
            samalekproduit: cartItems.map(item => item.product),
            marcheId: marcheInfo.Id,
            marcheLibelle: marcheInfo.Nom,
            totalCommande: result,
            modePaiement: moyenPaiement,
            client: userInfo
          };
          //this.productService.getTotalPrice().pipe(first()).toPromise();
          console.log('manageCommandes initialisé:', this.manageCommandes);
        },
      })
    );
  }

  async confirm() {
    // if (!this.selectedMethod) return;

    // const modal = await this.modalCtrl.create({
    //   component: TimeSlotModalComponent
    // });

    // modal.onDidDismiss().then((result) => {
    //   if (result.data) {
    //     console.log('Créneau sélectionné:', result.data);
    //   }
    // });

    //await modal.present();

    // console.log(this.globalService.getUserInfo())
    //const userInfo: SamalekClient = await this.globalService.getUserInfo();
    this.initializeManageCommandes()
  }


  cancel() {
    this.modalCtrl.dismiss();
  }

  onMethodChange(event: CustomEvent) {
    console.log('Méthode sélectionnée:', event.detail.value);
    this.selectedMethod = true
    localStorage.setItem("moyenPaiement", JSON.stringify(event.detail.value))
  }

}
