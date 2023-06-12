import { Component } from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent {
  constructor(private apiService: ApiService) {}

  directoryListings: any[] = [];


  fetchDirectoryListings(path: string) {
    this.apiService.getDirectoryListings(path).subscribe(
      listings => {
        this.directoryListings = listings;
      },
      error => {
        console.error('Error fetching directory listings:', error);
      }
    );
  }


  ngOnInit() {
    const initialPath = 'http://localhost:3000/api/data/current';
    this.fetchDirectoryListings(initialPath);
  }

  goBack(): void {
    // Add the necessary logic to navigate back to the previous page or component
  }

  toggleSelection(): void {
    // Add any additional logic you need for the selection mode
  }

}
