import { CommonModule } from '@angular/common';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AlertController, IonicModule, LoadingController, ModalController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
interface TimeSlot {
  time: string;
  date: Date;
  availability: number;
  selected: boolean;
  disabled: boolean;
}

@Component({
  selector: 'app-time-slot-modal',
  templateUrl: './time-slot-modal.component.html',
  styleUrls: ['./time-slot-modal.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TimeSlotModalComponent implements OnInit {
  timeSlots: TimeSlot[] = [
    { time: '08:00 - 10:00', date: new Date('2023-05-20'), availability: 5, selected: false, disabled: false },
    { time: '10:00 - 12:00', date: new Date('2023-05-20'), availability: 3, selected: false, disabled: false },
    { time: '12:00 - 14:00', date: new Date('2023-05-20'), availability: 0, selected: false, disabled: false },
    { time: '14:00 - 16:00', date: new Date('2023-05-21'), availability: 7, selected: false, disabled: false },
    { time: '16:00 - 18:00', date: new Date('2023-05-21'), availability: 2, selected: false, disabled: false },
    { time: '18:00 - 20:00', date: new Date('2023-05-21'), availability: 4, selected: false, disabled: false },
  ];

  distance: number = 0;
  duration: number = 0;
  deliveryAddress: string = '';
  selectedSlot: TimeSlot | null = null;
  totalPrice: number = 159.000;

  constructor(
    private modalController: ModalController,
    private loadingController: LoadingController,
    private alertController: AlertController,private router: Router
  ) { }

  selectTimeSlot(slot: TimeSlot) {
    if (slot.disabled || slot.availability === 0) {
      return;
    }

    this.timeSlots.forEach(s => s.selected = false);
    slot.selected = true;
    this.selectedSlot = slot;
  }

  async validateSelection() {
    if (this.selectedSlot) {
      const loading = await this.loadingController.create({
        message: 'Confirmation de votre commande...',
        duration: 3000
      });

      await loading.present();

      await loading.onDidDismiss();

      const alert = await this.alertController.create({
        header: 'Commande confirmée !',
        subHeader: `Créneau sélectionné : ${this.selectedSlot.time}`,
        message: `Date : ${this.selectedSlot.date.toLocaleDateString()}
                  Votre commande a été confirmée avec succès. Merci de votre confiance !`,
        buttons: [],
        cssClass: 'custom-alert'
      });

      await alert.present();

      // Fermer l'alerte et toutes les modales en arrière-plan après 3 secondes, puis rediriger
      setTimeout(async () => {
        await alert.dismiss();
        await this.modalController.dismiss({
          selectedTimeSlot: this.selectedSlot
        });
        // Fermer toutes les modales en arrière-plan
        const modalStack = document.getElementsByTagName('ion-modal');
        for (let i = 0; i < modalStack.length; i++) {
          (modalStack[i] as any).dismiss();
        }
        
        // Redirection vers /tabs/tab2
        this.router.navigate(['/tabs/tab2']);
      }, 3000);
    }
  }
  
  dismiss() {
    this.modalController.dismiss();
  }

  ngOnInit() { }
}

