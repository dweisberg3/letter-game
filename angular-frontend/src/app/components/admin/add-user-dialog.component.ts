import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>Add New User</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>First Name</mat-label>
        <input matInput [(ngModel)]="newUser.firstname" required>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Last Name</mat-label>
        <input matInput [(ngModel)]="newUser.lastname" required>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Grade</mat-label>
        <input matInput [(ngModel)]="newUser.grade" required>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Username</mat-label>
        <input matInput [(ngModel)]="newUser.username" required>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Password</mat-label>
        <input matInput [(ngModel)]="newUser.password" required>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onAdd()">Add</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width {
      width: 100%;
      margin-bottom: 10px;
    }
    mat-dialog-content {
      display: flex;
      flex-direction: column;
    }
  `]
})
export class AddUserDialogComponent {
  newUser = {
    firstname: '',
    lastname: '',
    grade: '',
    username: '',
    password: ''
  };

  constructor(private dialogRef: MatDialogRef<AddUserDialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    this.dialogRef.close(this.newUser);
  }
}
