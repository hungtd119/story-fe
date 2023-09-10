import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiUrl = 'http://127.0.0.1:8000/api/image';

  constructor(private http: HttpClient) {}
  getImages(): Observable<any> {
    return this.http.get(this.apiUrl + '/');
  }
}
