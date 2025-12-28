import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-rules-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <div class="rules-dialog">
      <h1 mat-dialog-title>How to Play the Letter Game</h1>
      <div mat-dialog-content>

        <h3>🎮 Getting Started</h3>
        <ol>
          <li>Pick a colored section (Yellow, Orange, Red, Blue, or Purple)</li>
          <li>Choose how many letters to play with: 1, 2, or 3</li>
          <li>Click "Start" to begin!</li>
        </ol>

        <h3>⏱️ Time Limits</h3>
        <ul>
          <li><strong>1 Letter:</strong> 45 seconds</li>
          <li><strong>2 Letters:</strong> 60 seconds</li>
          <li><strong>3 Letters:</strong> 75 seconds</li>
        </ul>

        <h3>🎯 How to Play</h3>
        <ol>
          <li>Listen carefully to the letters being called out</li>
          <li>Click the correct letters in the right order</li>
          <li>Keep playing until time runs out!</li>
        </ol>

        <h3>⚠️ Important Rule</h3>
        <p class="warning">If you choose 1 letter and click the wrong one, the game is over!</p>

        <h3>🏆 Scoring</h3>

        <h4>Regular Mode (One Section)</h4>
        <p>When you play with just one colored section, the points are always:</p>
        <ul>
          <li>1 Letter = 5 points</li>
          <li>2 Letters = 10 points</li>
          <li>3 Letters = 15 points</li>
        </ul>

        <h4>Cumulative Mode (Adding Sections)</h4>
        <p>When you turn on "Cumulative," you play with more sections and earn more points!</p>
        <table>
          <tr>
            <th></th>
            <th>1 Letter</th>
            <th>2 Letters</th>
            <th>3 Letters</th>
          </tr>
          <tr>
            <td>Yellow</td>
            <td>5 points</td>
            <td>10 points</td>
            <td>15 points</td>
          </tr>
          <tr>
            <td>Orange</td>
            <td>10 points</td>
            <td>15 points</td>
            <td>20 points</td>
          </tr>
          <tr>
            <td>Red</td>
            <td>15 points</td>
            <td>20 points</td>
            <td>25 points</td>
          </tr>
          <tr>
            <td>Blue</td>
            <td>20 points</td>
            <td>25 points</td>
            <td>30 points</td>
          </tr>
          <tr>
            <td>Purple</td>
            <td>25 points</td>
            <td>30 points</td>
            <td>35 points</td>
          </tr>
        </table>

        <h4>Nekodos Mode</h4>
        <p>Nekodos has its own special section</p>
        <ul>
          <li>1 Letter = 5 points</li>
          <li>2 Letters = 10 points</li>
          <li>3 Letters = 15 points</li>
          <li>No cumulative mode for Nekodos</li>
        </ul>


      </div>
      <div mat-dialog-actions align="end">
        <button mat-raised-button color="primary" (click)="close()">Got it!</button>
      </div>
    </div>
  `,
  styles: [`
    .rules-dialog {
      padding: 10px;
      max-width: 700px;
      max-height: 80vh;
      overflow-y: auto;
    }

    h1 {
      font-size: 26px;
      font-weight: bold;
      color: #333;
      margin-bottom: 15px;
    }

    h3 {
      font-size: 18px;
      color: #1976d2;
      margin-top: 20px;
      margin-bottom: 10px;
    }

    h4 {
      font-size: 16px;
      color: #555;
      margin-top: 15px;
      margin-bottom: 8px;
    }

    ol, ul {
      line-height: 1.8;
      color: #555;
      font-size: 14px;
    }

    li {
      margin-bottom: 8px;
    }

    p {
      color: #555;
      line-height: 1.6;
      font-size: 14px;
    }

    .warning {
      background-color: #fff3cd;
      border: 2px solid #ff9800;
      border-radius: 8px;
      padding: 12px;
      color: #333;
      font-weight: bold;
      margin: 10px 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
      font-size: 14px;
    }

    th, td {
      border: 1px solid #ddd;
      padding: 10px;
      text-align: center;
    }

    th {
      background-color: #1976d2;
      color: white;
      font-weight: bold;
    }

    tr:nth-child(even) {
      background-color: #f5f5f5;
    }

    strong {
      color: #333;
    }

    mat-dialog-content {
      max-height: 60vh;
      overflow-y: auto;
    }
  `]
})
export class RulesDialogComponent {
  constructor(public dialogRef: MatDialogRef<RulesDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
