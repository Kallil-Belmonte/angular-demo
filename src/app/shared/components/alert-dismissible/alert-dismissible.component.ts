import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert-dismissible',
  templateUrl: './alert-dismissible.component.html',
  styleUrls: ['./alert-dismissible.component.scss']
})
export class AlertDismissibleComponent implements OnInit {

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
