import { CommonModule } from '@angular/common';
import { Component, OnInit ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { TimeSlotModalComponent } from '../time-slot-modal/time-slot-modal.component';

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
export class PaiementSelectComponent  implements OnInit {
  selectedMethod: any | null = null;
  
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  selectMethod(method: string) {
    this.selectedMethod = method;
  }

  async confirm() {
    if (!this.selectedMethod) return;
    
    const modal = await this.modalCtrl.create({
      component: TimeSlotModalComponent
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        console.log('Créneau sélectionné:', result.data);
        // Traitement du créneau sélectionné
      }
    });

    await modal.present();
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  onMethodChange(event: CustomEvent) {
    console.log('Méthode sélectionnée:', event.detail.value);
    this.selectedMethod=true
  }
 


}
