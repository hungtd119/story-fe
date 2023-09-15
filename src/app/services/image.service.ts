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
  uploadSignature(vals: any): Observable<any> {
    let data = vals;
    return this.http.post(
      'https://api.cloudinary.com/v1_1/dhhahwrmr/image/upload',
      data
    );
  }
  createImage(body: any): Observable<any> {
    return this.http.post(this.apiUrl, body);
  }
}
