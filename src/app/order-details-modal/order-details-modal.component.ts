import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
interface Order {
  id: string;
  orderDate: Date;  
  deliveryDate: Date;
  status: string;
  statusColor: string;
  statusIcon: string;
  items: OrderItem[];
  total: number;
  location: string;
  deliveryPerson: {
    name: string;
    vehicleType: string;
  };
}

interface OrderItem {
  name: string;
  description: string;
  quantity: number;
  price: number;
  image: string;
}

@Component({
  selector: 'app-order-details-modal',
  templateUrl: './order-details-modal.component.html',
  styleUrls: ['./order-details-modal.component.scss'],
  standalone: true,
    imports: [
      IonicModule,
      CommonModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class OrderDetailsModalComponent  implements OnInit {
  @Input() order: any;
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.order);
  }

  dismiss() {
    this.modalController.dismiss();
  }

  handleImageError(event: any) {
    event.target.src = 'https://images.unsplash.com/photo-1604495772376-9657f0035eb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80'; // Remplacez par le chemin de votre image par défaut
  }

}
