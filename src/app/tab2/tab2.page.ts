import { Component } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
export interface FeedbackStructue {
  uid: string;
  difficulty: string;
  questions_answered: string;
  time_sufficiency: string;
  suggestions: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  feedback!: FeedbackStructue;
  constructor(private service: MainService, private router: Router) {
    if (service.currentUser.id === '') {
      router.navigateByUrl('/');
    }
    this.feedback = {
      uid: '',
      difficulty: '',
      questions_answered: '',
      time_sufficiency: '',
      suggestions: '',
    };
  }
  submitFeedback() {
    this.feedback.uid = this.service.currentUser.data.email;
    this.service.createFeedback(this.feedback);
    this.presentAlert();
  }
  async presentAlert() {
    const alert = document.createElement('ion-alert');
    alert.header = 'Success';
    alert.message = 'Data has updated!';
    alert.buttons = ['OK'];
    document.body.appendChild(alert);
    await alert.present();
    this.feedback = {
      uid: '',
      difficulty: '',
      questions_answered: '',
      time_sufficiency: '',
      suggestions: '',
    };
    await alert.onDidDismiss();
  }
}
