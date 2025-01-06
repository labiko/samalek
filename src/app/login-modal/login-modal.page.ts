// import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, ModalController, NavController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { PaiementSelectComponent } from '../paiement-select/paiement-select.component';
import { RegisterModalPage } from '../register-modal/register-modal.page';
import { ClientService } from '../client.service';
import { GlobalService } from '../global.service';
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
    private modalController: ModalController, private clientService: ClientService,private GlobalService : GlobalService
  ) {
    this.loginForm = this.formBuilder.group({
      telephone: ['', [Validators.required, Validators.minLength(9)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit() { }

  async onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)

      this.clientService.login(this.loginForm.value.telephone, this.loginForm.value.password).subscribe({
        next: (response) => {
          if (response != null) {
            this.modalController.dismiss({ logged: true });
            this.GlobalService.OpenModalPaiementSelect();
          }
          else {
            this.clientService.MsgBadCredential()
          }
        },
        error: (error) => {
          this.clientService.MsgBadCredential()
          console.error('Erreur de connexion', error);
        }
      });
    }
  }

  onLogin(username: string, password: string) {

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
