import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { UserResponse, User, Roles } from '@shared/models/user.interface';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';


const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private role = new BehaviorSubject<Roles>(null);
  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }
  
  get isLogged(): Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  get isAdmin$(): Observable<string>{
    return this.role.asObservable();
  }
  login(authData: User): Observable<UserResponse | void> {
    return this.http
      .post<UserResponse>(`${environment.API_URL}/auth/login`, authData)
      .pipe(
        map((res: UserResponse) => {
          this.saveLocalStorage(res);
          this.loggedIn.next(true);
          this.role.next(res.role);
          return res;
        }),
        catchError((err) => this.handlerError(err))
    );

   }
   
  logout(): void{ 
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
  private checkToken(): void{ 
    const user =JSON.parse(localStorage.getItem('user')) || null;
    if (user) {
      const isExpired = helper.isTokenExpired(user.Token);
      if (isExpired) {
        this.logout();
      } else {
        this.loggedIn.next(true);
        this.role.next(user.role);
      }
    }
  }

  private saveLocalStorage(user: UserResponse): void{
    const {userId, message, ...rest } = user;
    localStorage.setItem('user', JSON.stringify(rest));
   }

  private handlerError(err): Observable<never>{
    let errorMessage = 'An error occured retrieving data';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
