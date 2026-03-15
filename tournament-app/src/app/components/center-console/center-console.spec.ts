import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterConsole } from './center-console';

describe('CenterConsole', () => {
  let component: CenterConsole;
  let fixture: ComponentFixture<CenterConsole>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CenterConsole],
    }).compileComponents();

    fixture = TestBed.createComponent(CenterConsole);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
