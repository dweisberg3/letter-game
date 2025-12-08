import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ScoreTally } from '../../models/user.model';

@Component({
  selector: 'app-scoreboard-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatTableModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Scoreboard</h2>
    <mat-dialog-content>
      <table mat-table [dataSource]="data.scoreboardData" class="scoreboard-table">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let score"
              [class.current-user]="score.username === data.currentUsername">
            {{score.lastname}}, {{score.firstname}}
          </td>
        </ng-container>

        <ng-container matColumnDef="points">
          <th mat-header-cell *matHeaderCellDef>Points</th>
          <td mat-cell *matCellDef="let score"
              [class.current-user]="score.username === data.currentUsername">
            {{score.total_points}}
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </mat-dialog-content>
  `,
  styles: [`
    .scoreboard-table {
      width: 100%;
    }
    .current-user {
      font-weight: bold;
    }
  `]
})
export class ScoreboardDialogComponent {
  displayedColumns: string[] = ['name', 'points'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { scoreboardData: ScoreTally[], currentUsername: string }) {}
}
