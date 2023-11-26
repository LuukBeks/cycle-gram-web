import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BicycleDeleteComponent } from './bicycle-delete.component';

describe('BicycleDeleteComponent', () => {
  let component: BicycleDeleteComponent;
  let fixture: ComponentFixture<BicycleDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BicycleDeleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BicycleDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});