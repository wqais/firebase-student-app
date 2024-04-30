import { Component } from '@angular/core';
import { MainService } from '../main.service';
import { UserProfile } from '../login/login.page';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  user: { id: string; data: UserProfile };
  constructor(private service: MainService, private router: Router) {
    if (service.currentUser.id === '') {
      router.navigateByUrl('/');
    }
    this.user = service.currentUser;
  }
  updateUser() {
    this.service.updateUser(this.user.id, this.user.data);
    this.presentAlert();
  }
  async presentAlert() {
    const alert = document.createElement('ion-alert');
    alert.header = 'Success';
    alert.message = 'Data has updated!';
    alert.buttons = ['OK'];
    document.body.appendChild(alert);
    await alert.present();
    await alert.onDidDismiss();
  }
}
