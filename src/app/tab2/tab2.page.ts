import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { OrderDetailsModalComponent } from '../order-details-modal/order-details-modal.component';

interface Order {
  id: string;
  orderDate: Date;
  deliveryDate: Date;
  status: string;
  statusColor: string;
  statusIcon: string;
  items: any[];
  total: number;
  location: string;
  deliveryPerson: {
    name: string;
    vehicleType: string;
    phone: string;
  };
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  selectedSegment = 'current';
  orders: Order[] = [
    {
      id: '1234567890',
      orderDate: new Date('2023-05-14T10:30:00'),
      deliveryDate: new Date('2023-05-15T14:30:00'),
      status: 'En cours de livraison',
      statusColor: '#3880ff',
      statusIcon: 'bicycle',
      items: [
        { name: 'Pizza Margherita', description: 'Tomate, mozzarella, basilic', quantity: 2, price: 12.99, image: 'https://images.unsplash.com/photo-1604495772376-9657f0035eb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80' },
        { name: 'Salade César', description: 'Laitue, poulet grillé, parmesan, croûtons', quantity: 1, price: 8.99, image: 'https://images.unsplash.com/photo-1604495772376-9657f0035eb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80' },
        { name: 'Tiramisu', description: 'Dessert italien au café', quantity: 1, price: 6.99, image: 'https://images.unsplash.com/photo-1604495772376-9657f0035eb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80' }
      ],
      total: 41.96,
      location: 'Rue de la Paix, Paris',
      deliveryPerson: {
        name: 'John Doe',
        vehicleType: 'moto',
        phone: '+33 6 12 34 56 78'
      }
    },
    {
      id: '2345678901',
      orderDate: new Date('2023-05-13T15:45:00'),
      deliveryDate: new Date('2023-05-14T11:00:00'),
      status: 'En préparation',
      statusColor: '#ffc409',
      statusIcon: 'time',
      items: [
        { name: 'Burger Classic', description: 'Bœuf, cheddar, salade, tomate, oignon', quantity: 2, price: 14.99, image: 'https://images.unsplash.com/photo-1604495772376-9657f0035eb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80' },
        { name: 'Frites', description: 'Portion moyenne', quantity: 2, price: 3.99, image: 'https://images.unsplash.com/photo-1604495772376-9657f0035eb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80' },
        { name: 'Soda', description: 'Coca-Cola 33cl', quantity: 2, price: 2.50, image: 'https://images.unsplash.com/photo-1604495772376-9657f0035eb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80' },
        { name: 'Brownie', description: 'Gâteau au chocolat et aux noix', quantity: 1, price: 4.99, image: 'https://images.unsplash.com/photo-1604495772376-9657f0035eb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80' }
      ],
      total: 47.95,
      location: 'Avenue des Champs-Élysées, Paris',
      deliveryPerson: {
        name: 'John Doe',
        vehicleType: 'moto',
        phone: '+33 6 12 34 56 78'
      }
    },
    {
      id: '3456789012',
      orderDate: new Date('2023-05-13T09:15:00'),
      deliveryDate: new Date('2023-05-14T14:00:00'),
      status: 'Prêt à être livré',
      statusColor: '#2dd36f',
      statusIcon: 'checkmark-done',
      items: [
        { name: 'Sushi Combo', description: 'Assortiment de 18 pièces', quantity: 1, price: 24.99, image: 'https://images.unsplash.com/photo-1604495772376-9657f0035eb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80' },
        { name: 'Miso Soup', description: 'Soupe traditionnelle japonaise', quantity: 2, price: 3.99, image: 'https://images.unsplash.com/photo-1604495772376-9657f0035eb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80' }
      ],
      total: 32.97,
      location: 'Place de la Bastille, Paris',
      deliveryPerson: {
        name: 'John Doe',
        vehicleType: 'moto',
        phone: '+33 6 12 34 56 78'
      }
    },
    {
      id: '4567890123',
      orderDate: new Date('2023-05-01T09:15:00'),
      deliveryDate: new Date('2023-05-02T14:00:00'),
      status: 'Livré',
      statusColor: '#28ba62',
      statusIcon: 'checkmark-circle',
      items: [
        { name: 'Pâtes Carbonara', description: 'Spaghetti, œuf, pancetta, parmesan', quantity: 2, price: 13.99, image: 'https://images.unsplash.com/photo-1604495772376-9657f0035eb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80' },
        { name: 'Bruschetta', description: 'Pain grillé, tomates, ail, huile dolive', quantity: 1, price: 7.99, image: 'https://images.unsplash.com/photo-1604495772376-9657f0035eb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80' },
        { name: 'Vin Rouge', description: 'Bouteille 75cl', quantity: 1, price: 19.99, image: 'https://images.unsplash.com/photo-1604495772376-9657f0035eb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80' },
        { name: 'Panna Cotta', description: 'Dessert italien à la crème', quantity: 2, price: 5.99, image: 'https://images.unsplash.com/photo-1604495772376-9657f0035eb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80' },
        { name: 'Café Espresso', description: 'Double shot', quantity: 2, price: 2.50, image: 'https://images.unsplash.com/photo-1604495772376-9657f0035eb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80' }
      ],
      total: 72.94,
      location: 'Boulevard Haussmann, Paris',
      deliveryPerson: {
        name: 'John Doe',
        vehicleType: 'moto',
        phone: '+33 6 12 34 56 78'
      }
    }
  ];


  getFilteredOrders(): Order[] {
    if (this.selectedSegment === 'current') {
      return this.orders.filter(order => order.status !== 'Livré');
    } else {
      return this.orders.filter(order => order.status === 'Livré');
    }
  }

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  dismiss() {
    this.modalController.dismiss();
  }

  async viewOrderDetails(order: Order) {
    const modal = await this.modalController.create({
      component: OrderDetailsModalComponent,
      componentProps: {
        order: order
      },
      cssClass: 'order-details-modal'
    });
    return await modal.present();
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

}
