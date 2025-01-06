import { Component, OnInit ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { SamalekMarche } from '../models/SamalekMarche';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-choose-market-modal',
  templateUrl: './choose-market-modal.component.html',
  styleUrls: ['./choose-market-modal.component.scss'],
  standalone: true,
    imports: [
      IonicModule,
      CommonModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ChooseMarketModalComponent implements OnInit {
  markets$!: Observable<SamalekMarche[]>;
  selectedMarket: SamalekMarche | null = null;
  isConfirmButtonEnabled: boolean = false;
  constructor(private modalCtrl: ModalController, private productService: ProductService) { }

  ngOnInit() {
    this.markets$ = this.productService.GetMarcheList();
  }
  selectMarket(market: SamalekMarche) {
    this.selectedMarket = market;
    console.log('Marché sélectionné:', this.selectedMarket);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  confirmSelection() {
    if (this.selectedMarket) {
      this.modalCtrl.dismiss(this.selectedMarket);
    }
  }
  
}
