import { CommonModule } from '@angular/common';
import { Component, Input ,OnInit,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
    standalone: true,
    imports: [
      IonicModule,
      CommonModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConfirmationModalComponent  implements OnInit {
  @Input() selectedSlot: any;

  constructor(private modalController: ModalController) {}

  confirm() {
    this.modalController.dismiss({ confirmed: true });
  }

  cancel() {
    this.modalController.dismiss({ confirmed: false });
  }

  ngOnInit() {}

}
