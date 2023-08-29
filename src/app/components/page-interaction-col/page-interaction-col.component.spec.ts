import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageInteractionColComponent } from './page-interaction-col.component';

describe('PageInteractionColComponent', () => {
    let component: PageInteractionColComponent;
    let fixture: ComponentFixture<PageInteractionColComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ PageInteractionColComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageInteractionColComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});