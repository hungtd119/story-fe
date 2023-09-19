import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TextService {
  private apiUrl = 'http://127.0.0.1:8000/api/text';

  constructor(private http: HttpClient) {}
  getAllTexts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  createText(body: any): Observable<any> {
    return this.http.post(this.apiUrl, {
      ...body,
    });
  }
  updateSentence(body: any): Observable<any> {
    return this.http.put(this.apiUrl + `?id=${body.id}`, { ...body });
  }
}
