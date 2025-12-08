import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../core/services/auth.service';
import { ApiService } from '../../core/services/api.service';
import { User } from '../../models/user.model';
import { GameRecord } from '../../models/game.model';
import { UserDetailsDialogComponent } from './user-details-dialog.component';
import { AddUserDialogComponent } from './add-user-dialog.component';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['firstname', 'lastname', 'grade', 'username', 'password', 'actions'];

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.apiService.getUsers().subscribe({
      next: (data) => {
        this.users = data.map((el, index) => ({
          id: index + 1,
          firstname: el.firstname,
          lastname: el.lastname,
          grade: el.grade,
          username: el.username,
          password: el.password
        }));
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  openUserDetails(user: User): void {
    this.apiService.getRecords(user.username).subscribe({
      next: (records) => {
        this.dialog.open(UserDetailsDialogComponent, {
          width: '800px',
          data: { user, records }
        });
      },
      error: (error) => {
        console.error('Error fetching records:', error);
      }
    });
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addUser(result);
      }
    });
  }

  addUser(userData: any): void {
    const formData = new FormData();
    formData.append('firstname', userData.firstname);
    formData.append('lastname', userData.lastname);
    formData.append('grade', userData.grade);
    formData.append('username', userData.username);
    formData.append('password', userData.password);

    this.apiService.createUser(formData).subscribe({
      next: (data) => {
        this.fetchUsers();
      },
      error: (error) => {
        if (error.status === 400) {
          alert('Username already exists');
        }
        console.error('Error adding user:', error);
      }
    });
  }

  openDeleteDialog(user: User): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      data: { username: user.username }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.removeUser(user.username);
      }
    });
  }

  removeUser(username: string): void {
    this.apiService.removeUser(username).subscribe({
      next: (result) => {
        console.log(result);
        this.fetchUsers();
      },
      error: (error) => {
        console.error('Error removing user:', error);
      }
    });
  }

  handleSignOut(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
