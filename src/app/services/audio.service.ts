import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private apiUrl = 'http://127.0.0.1:8000/api/audio';

  constructor(private http: HttpClient) {}
  createAudio(body: any): Observable<any> {
    return this.http.post(this.apiUrl, { ...body });
  }
}
