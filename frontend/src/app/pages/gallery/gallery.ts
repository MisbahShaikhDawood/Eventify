import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrls : ['./gallery.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]   // 👈 ADD THIS
})
export class Gallery {

  images = [
    'images/standupcomedy4.jpg',
    'images/corporate1.jpg',
    'images/garba1.jpg',
    'images/exhibition2.jpg',
    'images/corporate2.jpg',
    'images/activity1.png',
    'images/standupcomedy3.jpg',
    'images/holi3.jpg',
    'images/corporate5.jpg',
    'images/activity3.jpeg'
  ];

  selectedImage: string | null = null;

  openImage(img: string) {
    this.selectedImage = img;
  }

  closeImage() {
    this.selectedImage = null;
  }
}