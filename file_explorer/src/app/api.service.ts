import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

  }
  getDirectoryListings(path: string, page: string) {
    return this.http.get<any[]>(`http://localhost:3000/api/data` + path + `?page=` + page);
  }
}

