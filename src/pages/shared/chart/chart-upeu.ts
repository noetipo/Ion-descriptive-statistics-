import {
  Component,
  ElementRef,
  Renderer,
  ViewChild,
  Input,
} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'chart-noe',
  template: `  <ion-card>
    <ion-card-content>
      <ion-card-header>{{header}}</ion-card-header>
      <canvas #canvas>
      </canvas>
    </ion-card-content>
  </ion-card>

  `
})
export class ChartUpeu {
  @ViewChild('canvas') canvasRef: ElementRef;
  @Input() itemName: any[];
  @Input() itemValue: any[];
  private header:string = "Quiero mi titulo";
  private sections: any;
  private Val_Max: any;
  private yScale: any;
  private y: any;
  private canvas: any;
  private context: any;
  private xScale: any;
  constructor(public navCtrl: NavController, private el: ElementRef, private renderer: Renderer) {
  }
  ngAfterViewInit() {
    this.drawChart();
  }
  drawChart(): void {
    this.sections = 6;
    this.Val_Max = Math.max(...this.itemValue);
    let stepSize = 1;
    let columnSize =  20;
    let rowSize = 1;
    let margin = 1;
    this.canvas = this.canvasRef.nativeElement;
    this.canvas.width = 280;
    this.canvas.height = 300;
    this.context = this.canvas.getContext("2d");
    this.context.fillStyle = "#160ef9";
    this.yScale = (this.canvas.height - columnSize - margin) / (this.Val_Max);
    this.xScale = (this.canvas.width - rowSize) / (this.sections + 1);
    this.context.strokeStyle = "#ff1026";
    this.context.beginPath();
    this.context.font = "8 pt Arial;";
    let count = 0;
    for (let scale = this.Val_Max; scale >= 0; scale = scale - stepSize) {
      this.y = columnSize + (this.yScale * count * stepSize);
      this.context.fillText(scale, margin, this.y + margin);
      this.context.moveTo(rowSize, this.y);
      this.context.lineTo(this.canvas.width, this.y);
      count++;
    }
    this.context.stroke();
    this.context.font = "10 pt Verdana";
    this.context.textBaseline = "bottom";
    for (let i = 0; i < this.itemValue.length; i++) {
      this.computeHeight(this.itemValue[i]);
      this.context.fillText(this.itemName[i], this.xScale * (i + 1), this.y - margin);
    }

    this.context.fillStyle='#79ff6c';
    this.context.shadowColor = 'red';

    //sONBRA
    this.context.shadowOffsetX = 2;
    this.context.shadowOffsetY = 0;

    // se mueve al final
    this.context.translate(0,this.canvas.height - margin);
    this.context.scale(this.xScale,-1 * this.yScale);

    // Dibuja barras graficas
    for (let i=0;i<this.itemValue.length; i++) {
      this.context.fillRect(i+0.5, 0, 0.8, this.itemValue[i]);
      this.context.fillStyle='#2c24ff';
    }

  }

  private computeHeight(value) {
    this.y = this.canvas.height - value * this.yScale;
  }
}
