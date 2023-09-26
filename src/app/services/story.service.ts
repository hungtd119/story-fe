import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  getStory(id: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + `/detail/${id}`);
  }
  getStoriesCard(
    limit: number,
    page: number,
    keywords: string
  ): Observable<any> {
    return this.http.get<any>(
      this.apiUrl + `/cards?limit=${limit}&page=${page}&keyword=${keywords}`
    );
  }
  createStory(story: Story) {
    const headersUrl: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer 2|QqDV876cwslxONGv4E4PTQrfhIeByaEcA3txgZY2`,
    });
    return this.http.post<any>(
      this.apiUrl,
      {
        ...story,
      }
      // { headers: headersUrl }
    );
  }
  updateStory(body: any): Observable<any> {
    return this.http.put(this.apiUrl + `?id=${body.id}`, { ...body });
  }
  getStoryType(id: string): Observable<any> {
    return this.http.get(this.apiUrl + `/type?id=${id}`);
  }
}
