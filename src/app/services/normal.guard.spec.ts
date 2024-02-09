import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { NormalGuard } from './normal.guard'; // Correct the class name

describe('NormalGuard', () => { // Change to 'NormalGuard' to match the class name
  let normalGuard: NormalGuard; // Create an instance of NormalGuard

  beforeEach(() => {
    TestBed.configureTestingModule({});
    normalGuard = TestBed.inject(NormalGuard); // Inject the NormalGuard instance
  });

  it('should be created', () => {
    expect(normalGuard).toBeTruthy();
  });
});
