import {
  Component,
  ElementRef,
  Renderer,
  ViewChild,
  Input,
} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'pie-chart-noe',
  template: `<ion-card>
    <ion-card-content>
      <canvas #canvasPieChart></canvas>
      <div #legend></div>
    </ion-card-content>
  </ion-card>

  `
})
export class PieChartUpeu {
  @ViewChild('canvasPieChart') canvasRef: ElementRef;
  @ViewChild('legend') idLegend: ElementRef;
  @Input() items: {};
  @Input() colors: any[];
  private canvas: any;
  private ctx: any;
  private options: any;
  private legend: any;

  constructor(public navCtrl: NavController, private el: ElementRef, private renderer: Renderer) {
  }

  ngAfterViewInit() {

    this.canvas = this.canvasRef.nativeElement;
    this.legend = this.idLegend.nativeElement;
    this.canvas.width = 200;
    this.canvas.height = 200;
    this.ctx = this.canvas.getContext("2d");
    let data = {
      canvas: this.canvas,
      data: this.items,
      colors: this.colors,
      doughnutHoleSize: 0.5,
      legend: this.legend
    };
    this.drawPieChart(data);
  }

  public drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color): void {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
  }

  public drawPieChart(options): void {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;

    let total_value = 0;
    let color_index = 0;
    for (let categ in this.options.data) {
      let val = this.options.data[categ];
      total_value += val;
    }

    let start_angle = 0;
    for (let categ in this.options.data) {
      let val = this.options.data[categ];
      let slice_angle = 2 * Math.PI * val / total_value;

      this.drawPieSlice(
        this.ctx,
        this.canvas.width / 2,
        this.canvas.height / 2,
        Math.min(this.canvas.width / 2, this.canvas.height / 2),
        start_angle,
        start_angle + slice_angle,
        this.colors[color_index % this.colors.length]
      );

      start_angle += slice_angle;
      color_index++;
    }

    if (this.options.doughnutHoleSize) {
      this.drawPieSlice(
        this.ctx,
        this.canvas.width / 2,
        this.canvas.height / 2,
        this.options.doughnutHoleSize * Math.min(this.canvas.width / 2, this.canvas.height / 2),
        0,
        2 * Math.PI,
        "#312bff"
      );
    }
    start_angle = 0;
    for (let categ in this.options.data) {
      let val = this.options.data[categ];
      let slice_angle = 2 * Math.PI * val / total_value;
      let pieRadius = Math.min(this.canvas.width / 2, this.canvas.height / 2);
      let labelX = this.canvas.width / 2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
      let labelY = this.canvas.height / 2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);
      if (this.options.doughnutHoleSize) {
        let offset = (pieRadius * this.options.doughnutHoleSize) / 2;
        labelX = this.canvas.width / 2 + (offset + pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
        labelY = this.canvas.height / 2 + (offset + pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);
      }
      let labelText = Math.round(100 * val / total_value);
      this.ctx.fillStyle = "white";
      this.ctx.font = "15px Arial";
      this.ctx.fillText(labelText + "%", labelX, labelY);
      start_angle += slice_angle;
    }
    if (this.options.legend) {
      color_index = 0;
      let legendHTML = "";
      for (let categ in this.options.data) {
        legendHTML += "<div><span style='display:inline-block;width:15px;background-color:" + this.colors[color_index++] + ";'>&nbsp;</span> " + categ + "</div>";
      }
      this.options.legend.innerHTML = legendHTML;
    }
  }
}
