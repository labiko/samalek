import { CommonModule } from '@angular/common';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicModule, ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-delivery-mode-modal',
  templateUrl: './delivery-mode-modal.component.html',
  styleUrls: ['./delivery-mode-modal.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeliveryModeModalComponent implements OnInit {
  selectedMode: 'drive' | 'home' | null = null;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController, private router: Router, private navController: NavController
  ) { }

  selectMode(mode: 'drive' | 'home') {
    this.selectedMode = mode;
  }

  async showConfirmation() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Êtes-vous sûr de vouloir choisir ce mode de livraison ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          handler: () => {
            console.log('Confirmation canceled');
          }
        }, {
          text: 'Oui',
          handler: () => {
            this.confirm();
          }
        }
      ]
    });

    await alert.present();
  }

  async confirm() {
    
    // await this.modalController.dismiss({
    //   deliveryMode: this.selectedMode
    // });

    // const modalElements = document.getElementsByTagName('ion-modal');
    // for (let i = modalElements.length - 1; i >= 0; i--) {
    //   const modalElement = modalElements[i] as HTMLIonModalElement;
    //   if (modalElement.dismiss) {
    //     await modalElement.dismiss();
    //   }
    // }

    // await new Promise(resolve => setTimeout(resolve, 100));

    // this.navController.navigateRoot('/tabs/tab2');

  }



  dismiss() {
    this.modalController.dismiss();
  }
  ngOnInit() { }

}
