import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DookieDabModal } from './dookie-dab-modal';

describe('DookieDabModal', () => {
  let component: DookieDabModal;
  let fixture: ComponentFixture<DookieDabModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DookieDabModal],
    }).compileComponents();

    fixture = TestBed.createComponent(DookieDabModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
