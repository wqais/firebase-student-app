import { Component, OnInit, inject } from '@angular/core';
import {
  CollectionReference,
  DocumentReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  updateDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MainService } from '../main.service';
export interface UserProfile {
  email: string;
  password: string;
  name: string;
  branch: string;
  course: string;
  cgpa: string;
  skills: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userList!: { id: string; data: UserProfile }[];
  constructor(private router: Router, private service: MainService) {}
  ngOnInit(): void {
    this.service.fetchUser().subscribe((users) => {
      this.userList = users.map((user) => {
        return {
          id: user.payload.doc.id,
          data: user.payload.doc.data() as UserProfile,
        };
      });
    });
  }
  setActive(val: string) {
    if (val === 'registeration-form') {
      document.getElementById('registeration-form')?.classList.add('active');
      document.getElementById('login-form')?.classList.remove('active');
    } else {
      document.getElementById('login-form')?.classList.add('active');
      document.getElementById('registeration-form')?.classList.remove('active');
    }
  }
  login(email: string, password: string) {
    var flag: boolean = false;
    var user!: { id: string; data: UserProfile };
    for (let index = 0; index < this.userList.length; index++) {
      const element = this.userList[index];
      if (element.data.email === email && element.data.password === password) {
        user = element;
        flag = true;
        break;
      }
    }
    if (flag) {
      this.service.setCurrentUser(user);
      this.router.navigateByUrl('/tabs/tab1');
    } else {
      console.log('invlaid details');
    }
  }
  register(rname: string, remail: string, rpass: string) {
    const user: UserProfile = {
      name: rname,
      email: remail,
      password: rpass,
      branch: '',
      course: '',
      cgpa: '',
      skills: '',
    };
    this.service.createUser(user).then((res) => console.log(res));
  }
}
