import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  user = {
    prenom: 'John',
    telephone: '123456789',
    matricule: 'EMP001'
  };

  isEditMode = false;
  originalUser: any;

  constructor(private toastController: ToastController) {}

  ngOnInit() {
    this.originalUser = {...this.user};
  }

  toggleEditMode() {
    if (this.isEditMode) {
      this.saveChanges();
    } else {
      this.originalUser = {...this.user};
    }
    this.isEditMode = !this.isEditMode;
  }

  async saveChanges() {
    // Implémentez ici la logique pour sauvegarder les modifications
    console.log('Sauvegarde des modifications', this.user);

    const toast = await this.toastController.create({
      message: 'Vos informations ont été mises à jour.',
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });

    await toast.present();
  }

  cancelEdit() {
    this.user = {...this.originalUser};
    this.isEditMode = false;
  }
}
