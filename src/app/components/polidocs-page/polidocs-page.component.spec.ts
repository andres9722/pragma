import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolidocsPageComponent } from './polidocs-page.component';

describe('PolidocsPageComponent', () => {
  let component: PolidocsPageComponent;
  let fixture: ComponentFixture<PolidocsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolidocsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolidocsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
