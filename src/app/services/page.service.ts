import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PageService {
  private apiUrl = 'http://127.0.0.1:8000/api/page';
  constructor(private httpClient: HttpClient) {}
  getPageByStoryId(
    id: string,
    $limit: number,
    $pageNumber: number
  ): Observable<any> {
    return this.httpClient.get(
      this.apiUrl + `/findByStoryId/${id}?limit=${$limit}&page=${$pageNumber}`
    );
  }
  getPageById(id: number): Observable<any> {
    return this.httpClient.get(this.apiUrl + `/find/${id}`);
  }
  getPagesFullByStoryId(storyId: string, pageId: string): Observable<any> {
    return this.httpClient.get(
      this.apiUrl + `/getByStoryId?storyId=${storyId}&pageId=${pageId}`
    );
  }
  getPagesIdByStoryId(storyId: string): Observable<any> {
    return this.httpClient.get(this.apiUrl + `/id/${storyId}`);
  }
  getPageToConfig(id: string): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/config/' + id);
  }
  createPage(body: any): Observable<any> {
    return this.httpClient.post(this.apiUrl, body);
  }
  getPageToPlay(id: string): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/play/' + id);
  }
}
