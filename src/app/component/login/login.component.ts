import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormsModule, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialUser, SocialAuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: any;
  password: any;
  errors: any;
  loginForm!: FormGroup;
  socialUser!: any;
  isLoggedin?: boolean;
  // login or Signup
  name:any;
  dateofbirth:any;
  // email:any;
  contact_no: any;
  // password: any;
  file:any;
  constructor(private authSvc: AuthService,
    private route: Router,
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.getSignupShowdata();
  }
  studentLogin() {
    const data = {
      email: this.email,
      password: this.password,
    }
    this.authSvc.customerLogin(data).subscribe((Result: any) => {
      console.log(Result)
      if (Result.accessToken) {
        localStorage.setItem('accessToken', Result.accessToken);
        localStorage.setItem('refreshToken', Result.refreshToken);
        this.route.navigate(['/dashboard']);
        alert(' You are Successfully Login');
      }
      else {
        alert('Invalid Email and Password');
        // console.log('else',Result)
      }
    })
  }
  //  let socialUser:any
  SignupWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((socialUser: any) => {

      this.authSvc.SignupGoogle({ email: socialUser.email, Name: socialUser.name, firstName: socialUser.firstName, lastName: socialUser.lastName, imageUrl: socialUser.photoUrl }).subscribe((resp: any) => {
        console.log('Signup data', resp);
        // if (resp['success']) {
        //   console.log('Signup data', resp);
        // }
        // else {
        //   console.log('Error Signup With google');
        // }
      })
    })
  }
  // Login Google
  loginWithGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((User: any) => {
      this.authSvc.loginGoogle({email:User.email}).subscribe((resp:any)=>{
        console.log('login Responsse ',resp)
        localStorage.setItem('accesstoken',resp.accessToken);
        localStorage.setItem('refreshtoken',resp.refreshToken);
      this.route.navigate(['/dashboard']);
      })
      

    })
  }
  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    
  }
  // get Social user Google data
  getSignupShowdata() {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
    });
  }
  logOut(): void {
    this.socialAuthService.signOut();
  }
}
