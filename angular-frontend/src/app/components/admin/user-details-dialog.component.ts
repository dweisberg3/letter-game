import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../models/user.model';
import { GameRecord } from '../../models/game.model';

@Component({
  selector: 'app-user-details-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatTableModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{data.user.firstname}} {{data.user.lastname}}'s Stats</h2>
    <mat-dialog-content>
      <table mat-table [dataSource]="data.records" class="details-table">
        <ng-container matColumnDef="points">
          <th mat-header-cell *matHeaderCellDef>Points</th>
          <td mat-cell *matCellDef="let record">{{record.points}}</td>
        </ng-container>

        <ng-container matColumnDef="section">
          <th mat-header-cell *matHeaderCellDef>Section Selected</th>
          <td mat-cell *matCellDef="let record">{{record.selected_sections_index}}</td>
        </ng-container>

        <ng-container matColumnDef="letters">
          <th mat-header-cell *matHeaderCellDef>Num. of Letters</th>
          <td mat-cell *matCellDef="let record">{{record.letter_level}}</td>
        </ng-container>

        <ng-container matColumnDef="cumulative">
          <th mat-header-cell *matHeaderCellDef>Cumulative</th>
          <td mat-cell *matCellDef="let record">{{record.is_cumulative ? 'Yes' : 'No'}}</td>
        </ng-container>

        <ng-container matColumnDef="mistake">
          <th mat-header-cell *matHeaderCellDef>Made Mistake with Single Letter</th>
          <td mat-cell *matCellDef="let record">
            {{record.letter_level === 1 ? (record.one_letter_game_with_miss ? 'Yes' : 'No') : 'N/A'}}
          </td>
        </ng-container>

        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef>Date</th>
          <td mat-cell *matCellDef="let record">{{record.timestamp}}</td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .details-table {
      width: 100%;
    }
    mat-dialog-content {
      max-height: 500px;
      overflow: auto;
    }
  `]
})
export class UserDetailsDialogComponent {
  displayedColumns: string[] = ['points', 'section', 'letters', 'cumulative', 'mistake', 'date'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { user: User, records: GameRecord[] }) {}
}
