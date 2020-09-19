import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { fromEventPattern, Subscription } from 'rxjs';
import { FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  private subscription: Subscription = new Subscription();
  private isValidEmail = /\S+@\S+\.\S+/;
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(private authSvc: AuthService, private fb:FormBuilder, private router: Router) { }
  ngOnInit(): void { }

  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onLogin(): void{

    if (this.loginForm.invalid) {
      return;
    }

    const formValue = this.loginForm.value;
    this.subscription.add(
      this.authSvc.login(formValue).subscribe(res => {
        if (res) {
          this.router.navigate(['']);
        }
      })
    );
  }

  getErrorMessage(field: string): string { 
    let message;
    if (this.loginForm.get(field).errors.required) {
      message = ' Este campo no puede estar vacio ';
    } else if (this.loginForm.get(field).hasError('pattern')) {
      message = 'No es un email valido.';
    } else if (this.loginForm.get(field).hasError('minlength')) {
      const minLength = this.loginForm.get(field).errors?.minlength
        .requiredLength;
      message = `El password debe se de al menos ${minLength} caracteres`;
    }
    return message;
  }
  isValidField(field: string):boolean {
    return ( (this.loginForm.get(field).touched || this.loginForm.get(field).dirty)
      && !this.loginForm.get(field).valid
      );
  }
}
