import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.html',
  styleUrls: ['./workshop.css']
})
export class Workshop implements OnInit {
  searchParams: any = {};
  events: any[] = [
    { name: 'Photography Workshop', city: 'Mumbai', date: '5 June 2026', image: 'images/workshop-photo.jpg' },
    { name: 'Dance Workshop', city: 'Pune', date: '8 June 2026', image: 'images/workshop-dance.jpg' },
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