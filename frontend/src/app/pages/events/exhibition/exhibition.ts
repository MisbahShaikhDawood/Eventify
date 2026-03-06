import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exhibition',
  templateUrl: './exhibition.html',
  styleUrls: ['./exhibition.css']
})
export class Exhibition implements OnInit {
  searchParams: any = {};
  events: any[] = [
    { name: 'Art Expo', city: 'Mumbai', date: '10 May 2026', image: 'images/artexpo.jpg' },
    { name: 'Photography Exhibition', city: 'Pune', date: '12 May 2026', image: 'images/photo-exhibition.jpg' },
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