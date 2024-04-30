import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { FeedbackStructue } from '../tab2/tab2.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit{
  feedbacks: FeedbackStructue[] = [];
  constructor(private mainService: MainService) {}

  ngOnInit() {
    this.loadFeedbacks();
  }

  loadFeedbacks() {
    this.mainService.viewFeedback().subscribe((data: FeedbackStructue[]) => {
      this.feedbacks = data;
    });
  }
}
