import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { SamalekClient } from './models/SamalekClient';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private currentUserSubject!: BehaviorSubject<SamalekClient>;
  public currentUser!: Observable<SamalekClient>;

  constructor(private http: HttpClient, private GlobalService: GlobalService,
    private toastController: ToastController
  ) {
    this.currentUserSubject = new BehaviorSubject<SamalekClient>
      (JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(telephone: string, codeConnexion: string): Observable<any> {
    const loginData = { telephone, codeConnexion };
    return this.http.post<any>(`${this.GlobalService.BaseUrl}${this.GlobalService.Module_Samalek}/LoginClient`, loginData)
      .pipe(
        map(response => {
          // Assurez-vous que la réponse contient un token et les informations de l'utilisateur
          if (response) {
            // Stocke les détails de l'utilisateur et le token JWT dans le localStorage pour garder l'utilisateur connecté entre les rafraîchissements de page
            localStorage.setItem('currentUser', JSON.stringify(response));
            this.currentUserSubject.next(response);
            alert("logon sucess")
          }
          return response;
        })
      );
  }

  logout() {
    // Supprime l'utilisateur du localStorage
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next({ Id: 0, Email: '', Nom: '', Prenom: '', Telephone: '' });
  }

  isLoggedIn(): boolean {
    return !!(this.currentUserValue && Object.keys(this.currentUserValue).length > 0);
  }

  // Vous pouvez ajouter une méthode pour récupérer le token si nécessaire
  getToken(): string | null {
    return this.currentUserValue && Object.keys(this.currentUserValue).length > 0 ? this.currentUserValue : null;
  }

  async MsgBadCredential() {
    const toast = await this.toastController.create({
      message: "Erreur Login ou code de connexion erroné!",
      duration: 5000,
      position: 'top',
      color: 'danger',
      cssClass: 'custom-toast-message', // Classe CSS personnalisée
      icon: 'alert-circle', // Ajout de l'icône
    });
    toast.present();
  }

  async MsgLoginRequired() {
    const toast = await this.toastController.create({
      message: "Vous devez vous authentifier pour continuer !",
      duration: 5000,
      position: 'top',
      color: 'danger',
      cssClass: 'custom-toast-message', // Classe CSS personnalisée
      icon: 'information-circle', // Ajout de l'icône
    });
    toast.present();
  }

}
