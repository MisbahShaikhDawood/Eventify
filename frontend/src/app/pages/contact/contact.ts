import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact {

  contact = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  successMessage = '';
  formSubmitted = false;
  showPopup = false; // ✅ popup visibility

  submitForm(contactForm: NgForm) {
    this.formSubmitted = true;

    if (contactForm.invalid) {
      return; // show validation errors
    }

    this.successMessage = 'Thank you! Your message has been sent. Our team will get back to you within 24 hours.';
    this.showPopup = true; // show popup

    // Reset form
    this.contact = { name: '', email: '', phone: '', subject: '', message: '' };
    contactForm.resetForm();
    this.formSubmitted = false;
  }

  closePopup() {
    this.showPopup = false;
  }
}