import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.page.html',
  styleUrls: ['./register-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule]
})
export class RegisterModalPage implements OnInit {
  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private modalController: ModalController) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      prenom: ['', Validators.required],
      telephone: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      // Traiter l'inscription ici
      console.log(this.signupForm.value);
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

  goToLogin() {
    this.modalController.dismiss().then(() => {
      // Ici, vous pouvez ajouter la logique pour ouvrir la modal de connexion si nécessaire
    });
  }
}

