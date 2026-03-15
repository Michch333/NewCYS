import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalTools } from './global-tools';

describe('GlobalTools', () => {
  let component: GlobalTools;
  let fixture: ComponentFixture<GlobalTools>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalTools],
    }).compileComponents();

    fixture = TestBed.createComponent(GlobalTools);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
