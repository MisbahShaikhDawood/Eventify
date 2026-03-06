import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-corporate',
  templateUrl: './corporate.html',
  styleUrls: ['./corporate.css']
})
export class Corporate implements OnInit {
  searchParams: any = {};
  events: any[] = [
    { name: 'Annual Company Meet', city: 'Mumbai', date: '20 July 2026', image: 'images/corporate-meet.jpg' },
    { name: 'Product Launch', city: 'Pune', date: '15 Aug 2026', image: 'images/product-launch.jpg' },
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