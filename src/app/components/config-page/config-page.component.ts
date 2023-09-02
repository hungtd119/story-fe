import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-config-page',
  templateUrl: './config-page.component.html',
  styleUrls: ['./config-page.component.scss'],
  standalone: true,
})
export class ConfigPageComponent implements AfterViewInit {
  @ViewChild('hung') myCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('image') myImage!: ElementRef;
  ngAfterViewInit(): void {
    this.#processImage();
  }
  #processImage() {
    const img = new Image();
    img.src =
      'https://firebasestorage.googleapis.com/v0/b/monkey-22059.appspot.com/o/Lg4oU6Aq4DxsWdwLByyCax1672904703767_trong.png?alt=media&token=bd7d5bc4-6ed3-4939-9336-af7f38a31a5b';
    img.onload = () => {
      const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };
  }
}
