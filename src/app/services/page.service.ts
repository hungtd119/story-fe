import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PageService {
  private apiUrl = 'http://127.0.0.1:8000/api/page';
  constructor(private httpClient: HttpClient) {}
  getPageByStoryId(id: number): Observable<any> {
    return this.httpClient.get(this.apiUrl + `/findByStoryId/${id}`);
  }
  getPageById(id: number): Observable<any> {
    return this.httpClient.get(this.apiUrl + `/find/${id}`);
  }
}
