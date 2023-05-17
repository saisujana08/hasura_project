import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoVersionsComponent } from './two-versions.component';

describe('TwoVersionsComponent', () => {
  let component: TwoVersionsComponent;
  let fixture: ComponentFixture<TwoVersionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TwoVersionsComponent]
    });
    fixture = TestBed.createComponent(TwoVersionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
