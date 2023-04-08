import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { ProductComponent } from './component/product/product.component';
import { FormsModule,ReactiveFormsModule, } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HeaderInterceptorInterceptor } from './header-interceptor.interceptor';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProductComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,FormsModule,ReactiveFormsModule,
    AppRoutingModule,HttpClientModule,SocialLoginModule,
  ],
  providers: [{ 
    provide: HTTP_INTERCEPTORS,
     useClass: HeaderInterceptorInterceptor,
      multi:true
  },
   {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('659205891262-r8li9k6a34qsqvniv75tuk638ds71ej0.apps.googleusercontent.com',{
              scope:'email',
              plugin_name:'Google Sso Project Demo'
            })
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('6135703363134878'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
