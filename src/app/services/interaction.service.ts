import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InteractionService {
  private apiUrl = 'http://127.0.0.1:8000/api/interaction';

  constructor(private http: HttpClient) {}

  createInteraction(body: any): Observable<any> {
    return this.http.post(this.apiUrl, {
      ...body,
    });
  }
  getInteractionsByPageId(id: number): Observable<any> {
    return this.http.get(this.apiUrl + `/positions/${id}`);
  }
  getInteractionFull(id: number): Observable<any> {
    return this.http.get(this.apiUrl + `/${id}`);
  }
}
