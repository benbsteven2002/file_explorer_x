// directory.component.ts

import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { DirectoryService } from '../directory.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent {
  constructor(private apiService: ApiService, private directoryService: DirectoryService) {}

  directoryListings: any[] = [];
  path: string = "/root";


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
    this.fetchDirectoryListings(this.path);

    // Subscribe to directory service
    this.directoryService.directorySelected.subscribe((selectedDirectory: string) => {
      console.log('Selected directory:', selectedDirectory);
      this.fetchDirectoryListings(selectedDirectory);
      this.path = selectedDirectory;
    });
  }

  goBack(): void {

    const direc = this.getParentDirectory(this.path)
    this.path = direc;

    if (this.path === '') {
      this.path = '/root';
      this.fetchDirectoryListings(this.path);
    } else {
      this.fetchDirectoryListings(direc);
    }
  }

  getParentDirectory(directory: string): string {
    const lastSlashIndex = directory.lastIndexOf('/');
    if (lastSlashIndex !== -1) {
      return directory.substring(0, lastSlashIndex);
    }
    return directory;
  }


}
