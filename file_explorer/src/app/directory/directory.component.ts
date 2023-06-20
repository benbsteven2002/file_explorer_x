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
  currentPage = 1;
  path: string = "/root";


  fetchDirectoryListings(path: string) {
    this.apiService.getDirectoryListings(path, String(this.currentPage)).subscribe(
      listings => {
        this.directoryListings = listings;
      },
      error => {
        console.error('Error fetching directory listings:', error);
      }
    );
  }


  ngOnInit() {
    this.currentPage = 1;
    this.fetchDirectoryListings(this.path);

    this.directoryService.directorySelected.subscribe((selectedDirectory: string) => {
      console.log('Selected directory:', selectedDirectory);
      this.currentPage = 1;
      this.fetchDirectoryListings(selectedDirectory);
      this.path = selectedDirectory;
    });
  }

  goBack(): void {
    this.currentPage = 1;
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

  nextPage() {
    if (!(this.directoryListings.length === 0)) {
      this.currentPage += 1;
    }
    this.fetchDirectoryListings(this.path);
  }

  prevPage() {
    this.currentPage -= 1;
    if (this.currentPage <= 1) {
      this.currentPage = 1;
    }
    this.fetchDirectoryListings(this.path);
  }

}
