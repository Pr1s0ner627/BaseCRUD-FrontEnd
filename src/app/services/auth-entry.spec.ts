import { TestBed } from '@angular/core/testing';
import { AuthEntry } from './auth-entry';

describe('AuthEntry', () => {
  let service: AuthEntry;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthEntry);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
