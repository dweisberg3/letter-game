import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private userRoleSubject = new BehaviorSubject<string>('');
  private usernameSubject = new BehaviorSubject<string>('');

  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  public userRole$: Observable<string> = this.userRoleSubject.asObservable();
  public username$: Observable<string> = this.usernameSubject.asObservable();

  constructor() { }

  get isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  get userRole(): string {
    return this.userRoleSubject.value;
  }

  get username(): string {
    return this.usernameSubject.value;
  }

  login(role: string, username: string): void {
    this.isLoggedInSubject.next(true);
    this.userRoleSubject.next(role);
    this.usernameSubject.next(username);
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
    this.userRoleSubject.next('');
    this.usernameSubject.next('');
  }
}
