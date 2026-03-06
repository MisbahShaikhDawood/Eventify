import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-music',
  standalone: true,        // ✅ ADD THIS
  imports: [CommonModule],
  templateUrl: './music.html',
  styleUrls: ['./music.css']
})


export class Music implements OnInit {

  searchParams: any = {};

  events: any[] = [
    { name: 'Arijit Singh Live Concert', city: 'Mumbai', date: '25 March 2026', image: 'images/arijit1.jpg' },
    { name: 'Local Band Night', city: 'Pune', date: '5 April 2026', image: 'images/band.jpg' },
  ];

  filteredEvents: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchParams = params;
      this.filterEvents();
    });
  }

  filterEvents() {
    this.filteredEvents = this.events.filter(event => {
      const matchesName = this.searchParams.name
        ? event.name.toLowerCase().includes(this.searchParams.name.toLowerCase())
        : true;

      const matchesCity = this.searchParams.city
        ? event.city.toLowerCase() === this.searchParams.city.toLowerCase()
        : true;

      return matchesName && matchesCity;
    });
  }

  // 🔥 Reusable Login Check
  checkLoginAndRedirect(): boolean {
    if (!this.auth.isAuthenticated()) {
      alert('You must login first to continue!');
      this.auth.setRedirectUrl(this.router.url);
      this.router.navigate(['/auth']);
      return false;
    }
    return true;
  }

  // 🎟 Book Event
  bookEvent(event: any) {

    if (!this.checkLoginAndRedirect()) return;

    alert('Booking confirmed for ' + event.name);
  }

}