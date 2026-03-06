import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule} from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
 constructor(private router: Router, private auth: AuthService) {}
 
  // Search & events
  searchQuery: string = '';
  searchCategory: string = '';
  searchCity: string = '';

  // Popup message
  message: string = '';
  showPopup: boolean = false;

  // Slider
  images: string[] = [
    'images/activity1.png',
    'images/corporate1.jpg',
    'images/holi1.jpg',
    'images/exhibition1.jpeg',
    'images/garba1.jpg',
    'images/activity2.jpg',
    'images/exhibitionscience.jpg',
    'images/corporate6.jpg'
  ];
  selectedImage: string = '';
  direction: 'left' | 'right' = 'right';

  

  // Contact form
  contact = { name: '', email: '', message: '' };
  successMessage = '';
  formSubmitted = false;

  

  ngOnInit() {
  const msg = this.auth.getMessage();
  if (msg) {
    this.message = msg;
    this.showPopup = true;

    // Auto-hide after 3 seconds
    setTimeout(() => {
      this.closePopup();
    }, 3000);
  }
  }

  closePopup() {
    this.showPopup = false;
    this.auth.clearMessage();
  }

  // Search events
  searchEvents() {
    let routePath = '';
    if (this.searchCategory) {
      switch(this.searchCategory.toLowerCase()) {
        case 'music': routePath = 'music'; break;
        case 'party': routePath = 'party'; break;
        case 'exhibition': routePath = 'exhibition'; break;
        case 'workshop': routePath = 'workshop'; break;
        case 'culture festival':
        case 'cultural': routePath = 'cultural'; break;
        case 'corporate': routePath = 'corporate'; break;
      }
      this.router.navigate(['/events', routePath], { queryParams: { name: this.searchQuery, city: this.searchCity } });
      return;
    }
    this.router.navigate(['/events'], { queryParams: { name: this.searchQuery, city: this.searchCity } });
  }

  // Slider
  open(img: string) { this.selectedImage = img; }
  close() { this.selectedImage = ''; }
  changeDirection(event: MouseEvent) {
    const slider = (event.target as HTMLElement).closest('.slider') as HTMLElement;
    const sliderRect = slider.getBoundingClientRect();
    const mouseX = event.clientX - sliderRect.left;
    this.direction = mouseX < sliderRect.width / 2 ? 'left' : 'right';
  }

  // Event categories
  eventCategories = [
  { name: 'Music', image: 'images/music2.jpg', route: 'music' },
  { name: 'Comedy', image: 'images/standupcomedy2.jpg', route: 'comedy' },
  { name: 'Party', image: 'images/14.jpg', route: 'party' },
  { name: 'Culture Festival', image: 'images/holi2.jpg', route: 'cultural' },
  { name: 'Exhibition', image: 'images/exhibition2.jpg', route: 'exhibition' },
  { name: 'Workshop', image: 'images/workshopoutdoorpainting.jpg', route: 'workshop' },
  { name: 'Corporate', image: 'images/corporate1.jpg', route: 'corporate' }
  ];

  // Event categories
  viewMore(category: any) {
  this.router.navigate(['/events', category.route]);
}
  // Contact form
  submitForm(contactForm: NgForm) {
    this.formSubmitted = true;
    if (contactForm.invalid) return;
    console.log('Contact Form Data:', this.contact);
    this.successMessage = 'Thank you! Your message has been sent.';
    this.contact = { name: '', email: '', message: '' };
    contactForm.resetForm();
    this.formSubmitted = false;
  }
}