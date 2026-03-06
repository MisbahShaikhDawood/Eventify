import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Comedy } from './comedy';

describe('Comedy', () => {
  let component: Comedy;
  let fixture: ComponentFixture<Comedy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Comedy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Comedy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
