import { CommonModule } from '@angular/common';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule, ModalController, Platform } from '@ionic/angular';
// import { Geolocation } from '@capacitor/geolocation';
interface TimeSlot {
  time: string;
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
    { time: '08:00 - 10:00', availability: 5, selected: false, disabled: true },
    { time: '10:00 - 12:00', availability: 3, selected: false, disabled: true },
    { time: '12:00 - 14:00', availability: 0, selected: false, disabled: false },
    { time: '14:00 - 16:00', availability: 7, selected: false, disabled: false },
    { time: '16:00 - 18:00', availability: 2, selected: false, disabled: false },
    { time: '18:00 - 20:00', availability: 4, selected: false, disabled: false },
  ];

  distance: number = 0;
  duration: number = 0;
  deliveryAddress: string = '';

  constructor(
    private modalController: ModalController,
    private platform: Platform,
  ) { }

  selectTimeSlot(selectedSlot: TimeSlot) {
    if (selectedSlot.disabled || selectedSlot.availability === 0) {
      return; // Ne rien faire si le créneau est désactivé ou complet
    }

    // Désélectionner tous les autres créneaux
    this.timeSlots.forEach(slot => {
      if (slot !== selectedSlot) {
        slot.selected = false;
      }
    });

    // Sélectionner le créneau choisi
    selectedSlot.selected = true;
  }

  dismiss() {
    // Récupérer le créneau sélectionné
    const selectedSlot = this.timeSlots.find(slot => slot.selected);

    // Fermer le modal et passer le créneau sélectionné en données de retour
    this.modalController.dismiss({
      selectedTimeSlot: selectedSlot
    });
  }

  ngOnInit() { }

}
