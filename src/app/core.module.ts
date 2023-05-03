import { GoogleLoginProvider, SocialAuthServiceConfig } from "@abacritt/angularx-social-login";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RECAPTCHA_V3_SITE_KEY } from "ng-recaptcha";
import { InterceptorService } from "./components/auth-component/auth-service.service";
import { RecaptchaInterceptorInterceptor } from "./recap/recaptcha-interceptor.interceptor";

@NgModule({
providers:[{provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true},
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: '6LeY3uskAAAAAPyKofXxo49mA21tW_gbRfE8NKMI',//environment.recaptcha.siteKey,
    },
    { provide: HTTP_INTERCEPTORS, useClass:RecaptchaInterceptorInterceptor , multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '135064455974-p738ari2497raf86sn2s55ir74endtc3.apps.googleusercontent.com',
              {
                prompt: 'select_account',
                oneTapEnabled: false // Disable Google One-tap feature
              }
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }]
})

export class CoreModule{
}