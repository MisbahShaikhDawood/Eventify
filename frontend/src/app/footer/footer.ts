import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
})
export class Footer {

  contact = { email: '' };
  successMessage = '';
  formSubmitted = false;

  submitForm(contactForm: NgForm) {
    this.formSubmitted = true;

    if (contactForm.invalid) return;

    console.log('Contact Form Data:', this.contact);
    this.successMessage = 'Thank you! You have subscribed to our newsletter.';

    this.contact = { email: '' };
    contactForm.resetForm();
    this.formSubmitted = false;
  }
}
