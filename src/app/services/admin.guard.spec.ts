import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => { // Change to 'AdminGuard' to match the class name
  let adminGuard: AdminGuard; // Create an instance of AdminGuard

  beforeEach(() => {
    TestBed.configureTestingModule({});
    adminGuard = TestBed.inject(AdminGuard); // Inject the AdminGuard instance
  });

  it('should be created', () => {
    expect(adminGuard).toBeTruthy();
  });
});
