import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserProfile } from './login/login.page';
import { FeedbackStructue } from './tab2/tab2.page';
@Injectable({
  providedIn: 'root',
})
export class MainService {
  currentUser: { id: string; data: UserProfile };
  constructor(private fireservice: AngularFirestore) {
    this.currentUser = {
      id: '',
      data: {
        name: '',
        email: '',
        password: '',
        course: '',
        branch: '',
        cgpa: '',
        skills: '',
      },
    };
  }
  setCurrentUser(user: { id: string; data: UserProfile }) {
    this.currentUser = user;
  }
  createUser(user: UserProfile) {
    return this.fireservice.collection('users').add(user);
  }
  fetchUser() {
    return this.fireservice.collection('users').snapshotChanges();
  }
  updateUser(id: string, data: UserProfile) {
    return this.fireservice.collection('users').doc(id).update(data);
  }
  createFeedback(feedback: FeedbackStructue) {
    return this.fireservice.collection('feedback').add(feedback);
  }
  viewFeedback(){
    return this.fireservice.collection<FeedbackStructue>('feedback').valueChanges();
  }
}
