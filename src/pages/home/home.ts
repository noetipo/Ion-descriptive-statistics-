import {
  Component,
  ElementRef,
  Renderer,
  ViewChild
} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  public data: any;
  public colors: any[];
  public itemName: any [];

  public itemValue: any  [];
  constructor(public navCtrl: NavController, private el: ElementRef, private renderer: Renderer) {
    this.data = {
      "tesis": 10,
      "tesis1": 14,
      "tesis2": 200,
    };
    this.colors = ["#fde23e", "#f13786", "#57d9ff"];
    this.itemName=["a", "b", "Titulo"];
    this.itemValue=[20,7,10];


  }
  ngAfterViewInit() {

  }

}
