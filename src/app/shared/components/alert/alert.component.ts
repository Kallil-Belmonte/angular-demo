import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() status: string;
  @Input() dismissible: boolean = false;
  @Output() dismissAlert = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


	//==============================
  // GENERAL METHODS
  //==============================

  // ON DISMISS ALERT
  onDismissAlert() {
    this.dismissAlert.emit();
  }

}
