import { TestBed } from '@angular/core/testing';

import { RecaptchaInterceptorInterceptor } from './recaptcha-interceptor.interceptor';

describe('RecaptchaInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RecaptchaInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RecaptchaInterceptorInterceptor = TestBed.inject(RecaptchaInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
