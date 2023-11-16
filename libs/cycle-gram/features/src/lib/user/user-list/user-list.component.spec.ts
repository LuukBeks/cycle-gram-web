import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component'; // Updated import statement

describe('UserListComponent', () => { // Updated component name
  let component: UserListComponent; // Updated component name
  let fixture: ComponentFixture<UserListComponent>; // Updated component name

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent], // Updated component name
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent); // Updated component name
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
