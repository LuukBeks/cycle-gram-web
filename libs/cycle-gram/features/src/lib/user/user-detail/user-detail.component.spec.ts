import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailComponent } from './user-detail.component'; // Updated import statement

describe('UserDetailComponent', () => { // Updated component name
  let component: UserDetailComponent; // Updated component name
  let fixture: ComponentFixture<UserDetailComponent>; // Updated component name

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailComponent], // Updated component name
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent); // Updated component name
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
