// import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, ModalController, NavController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { PaiementSelectComponent } from '../paiement-select/paiement-select.component';
import { RegisterModalPage } from '../register-modal/register-modal.page';
@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.page.html',
  styleUrls: ['./login-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule]
})
export class LoginModalPage implements OnInit {

  loginForm: FormGroup;
  isLoading: boolean = false;
  loadingMessage: string = 'Traitement en cours...';
  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController
  ) {
    this.loginForm = this.formBuilder.group({
      telephone: ['', [Validators.required, Validators.minLength(9)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

 async onSubmit() {
    if (this.loginForm.valid) {
      // Implémentez ici la logique de connexion
      console.log('Form submitted', this.loginForm.value);
      this.modalController.dismiss({ logged: true });

     this.isLoading = true;
    this.loadingMessage = 'Initialisation du paiement...';
    this.loadingMessage = 'Vérification du panier...';
    this.loadingMessage = 'Finalisation de la transaction...';
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Ajoutez ici la logique de paiement réelle
    this.isLoading = false;
    this.loadingMessage = 'Traitement en cours...'; // Réinitialiser le message
    this.OpenModalPaiementSelect();
    }
  }

  
    async OpenModalPaiementSelect() {
      const modal = await this.modalController.create({
        component: PaiementSelectComponent,
      });
      return await modal.present();
    }
  dismiss() {
    this.modalController.dismiss();
  }

  async openRegisterModal() {
    const modal = await this.modalController.create({
      component: RegisterModalPage,
    });
    return await modal.present();
  }
  
}
