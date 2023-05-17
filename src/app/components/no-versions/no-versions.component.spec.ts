import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoVersionsComponent } from './no-versions.component';

describe('NoVersionsComponent', () => {
  let component: NoVersionsComponent;
  let fixture: ComponentFixture<NoVersionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoVersionsComponent]
    });
    fixture = TestBed.createComponent(NoVersionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
