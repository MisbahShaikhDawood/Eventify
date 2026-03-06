import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [RouterOutlet],   // 👈 ADD THIS
  templateUrl: './events.html',
  styleUrls: ['./events.css']
})
export class Events implements OnInit {

  searchParams: any = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchParams = params;
      console.log('Search params:', this.searchParams);
      // You can filter events here based on:
      // this.searchParams.name and this.searchParams.city
    });
  }
}