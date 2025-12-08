import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../core/services/auth.service';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  error = false;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  onSubmit(): void {
    const formData = new FormData();
    formData.append('username', this.username);
    formData.append('password', this.password);

    this.apiService.login(formData).subscribe({
      next: (result) => {
        if (result.authenticated) {
          if (result.admin) {
            this.authService.login('Admin', this.username);
            this.router.navigate(['/admin']);
          } else {
            this.authService.login('User', this.username);
            this.router.navigate(['/board']);
          }
        } else {
          this.error = true;
        }
      },
      error: (error) => {
        console.error('Error sending data:', error);
        this.error = true;
      }
    });
  }
}
