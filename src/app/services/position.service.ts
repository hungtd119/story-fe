import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from '../models/position.model';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  private apiUrl = 'http://127.0.0.1:8000/api/position';

  constructor(private http: HttpClient) {}
  createPositionsByInteractionId(body: any): Observable<any> {
    return this.http.post(this.apiUrl + '/positions', { ...body });
  }
}
