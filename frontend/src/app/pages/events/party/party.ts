import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-party',
  templateUrl: './party.html',
  styleUrls: ['./party.css']
})
export class Party implements OnInit {
  searchParams: any = {};
  events: any[] = [
    { name: 'Beach Party', city: 'Mumbai', date: '15 April 2026', image: 'images/beach-party.jpg' },
    { name: 'Club Night', city: 'Pune', date: '20 April 2026', image: 'images/club-night.jpg' },
  ];
  filteredEvents: any[] = [];

  constructor(private route: ActivatedRoute) {}

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
}