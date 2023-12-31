import { Observable } from 'rxjs';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Page } from 'src/app/models/page.model';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-story-play-run',
  templateUrl: './story-play-run.component.html',
  styleUrls: ['./story-play-run.component.scss'],
})
export class StoryPlayRunComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  myCanvasRef!: ElementRef<HTMLCanvasElement>;

  ctx!: CanvasRenderingContext2D;

  storyId!: string;
  pagesId!: any;
  pages$!: Observable<Page>;

  constructor(
    private routerActive: ActivatedRoute,
    private pageService: PageService,
    private router: Router
  ) {
    this.routerActive.params.subscribe((param) => {
      this.storyId = param['id'];
    });
  }
  ngOnInit(): void {
    this.pageService.getPagesIdByStoryId(this.storyId).subscribe((response) => {
      this.pagesId = response.data;
    });
  }
  gotoPlayPage(id: string) {
    this.router.navigate(['dashboard/story-play-page', id]);
  }
}
