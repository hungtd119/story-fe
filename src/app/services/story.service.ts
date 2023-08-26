import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Story } from '../models/story.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private apiUrl = 'http://127.0.0.1:8000/api/story';

  constructor(private http: HttpClient) {}

  getStories(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
