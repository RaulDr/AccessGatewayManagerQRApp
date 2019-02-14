import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/api/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  loginErr = false;
  loginForm: FormGroup;

  constructor(private router: Router, private authenticationService: AuthService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.minLength(4), Validators.required]),
    });
  }

  submitCredentials() {
    if (this.loginForm.valid) {
      this.authenticationService.submitCredentials(this.loginForm.value).subscribe((loginCheck: boolean) => {
        this.loginForm.reset();
        !loginCheck ? (this.loginErr = true) : this.router.navigate(['/acgm/gateway-access']);
      });
    } else {
      this.loginErr = true;
    }
  }
}
