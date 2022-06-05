import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  search(event: any): void {
    const searchTerm = event.target.value;
    if (searchTerm?.length >= 2) {
      this.router.navigate(['/search', searchTerm]);
    }
    if (searchTerm?.length < 2) {
      this.router.navigate(['/search', '']);
    }
  }


}
