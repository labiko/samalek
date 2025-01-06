import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { LoginModalPage } from './login-modal/login-modal.page';
import { PaiementSelectComponent } from './paiement-select/paiement-select.component';
import { SamalekClient } from './models/SamalekClient';
import { SamalekMarche } from './models/SamalekMarche';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  signal_app_id: string = "29f94e62-614c-41e7-a912-d60b485858ff"
  firebase_id: string = "419310645747"
  public BaseUrl: string = 'http://localhost:2913'
  Module_Samalek: string = '/Samalek'
  PlayerId: any
  constructor(private http: HttpClient, private modalController: ModalController,) { }

  async OpenLoginModal() {
    const modal = await this.modalController.create({
      component: LoginModalPage,
      cssClass: 'fullscreen-modal'
    });

    modal.onDidDismiss().then((result) => {
      if (result && result.data && result.data.logged) {
        console.log('Utilisateur connecté, procéder au paiement');
      }
    });

    return await modal.present();
  }

  async OpenModalPaiementSelect() {
    const modal = await this.modalController.create({
      component: PaiementSelectComponent,
    });
    return await modal.present();
  }

  async getUserInfo(): Promise<SamalekClient> {
    const currentUser = localStorage.getItem('currentUser');
    const { Id = 0, Nom = 'Invité', Prenom = '', Email = '', Telephone = '' } = currentUser ? JSON.parse(currentUser) : {};
    return { Id, Nom, Prenom, Email, Telephone };
  }

  async getMarcheSelectedUserInfo(): Promise<SamalekMarche> {
    const currentMarcheSelected = localStorage.getItem('marcheInfos');
    const { DateCreation = '', Description = 'Invité', Id = 0, Latitude = '', Longitude = ''
      , Nom = '', mapsUrlLocation = ''
    } = currentMarcheSelected ? JSON.parse(currentMarcheSelected) : {};
    return { DateCreation, Description, Id, Latitude, Longitude, Nom, mapsUrlLocation };
  }

  async getMoyenPaiementSelectione(): Promise<string> {
    const moyenPaiementSelected = localStorage.getItem('moyenPaiement');
    return moyenPaiementSelected ? JSON.parse(moyenPaiementSelected) || '' : '';
  }
  
}
