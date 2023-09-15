import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TextconfifService {
  private apiUrl = 'http://127.0.0.1:8000/api/textconfig';

  constructor(private http: HttpClient) {}
  createTextConfig(body: any): Observable<any> {
    return this.http.post(this.apiUrl, { ...body });
  }
}
