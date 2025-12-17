import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-game-over-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <div class="game-over-dialog">
      <h1 mat-dialog-title>Game Over</h1>
      <div mat-dialog-content>
        <p class="score-text">You scored</p>
        <p class="points">{{ data.points }}</p>
        <p class="score-text">points!</p>
      </div>
      <div mat-dialog-actions align="center">
        <button mat-raised-button color="primary" (click)="close()">OK</button>
      </div>
    </div>
  `,
  styles: [`
    .game-over-dialog {
      text-align: center;
      padding: 20px;
    }

    h1 {
      font-size: 36px;
      font-weight: bold;
      color: #333;
      margin-bottom: 20px;
    }

    .score-text {
      font-size: 24px;
      color: #666;
      margin: 10px 0;
    }

    .points {
      font-size: 64px;
      font-weight: bold;
      color: #1976d2;
      margin: 20px 0;
    }


  `]
})
export class GameOverDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<GameOverDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { points: number }
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
