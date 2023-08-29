import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTextColComponent } from './page-text-col.component';

describe('PageTextColComponent', () => {
    let component: PageTextColComponent;
    let fixture: ComponentFixture<PageTextColComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ PageTextColComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageTextColComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});