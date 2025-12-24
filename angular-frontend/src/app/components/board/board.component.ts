import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { AuthService } from '../../core/services/auth.service';
import { ApiService } from '../../core/services/api.service';
import { sections } from '../../utils/constants';
import { ScoreTally } from '../../models/user.model';
import { ScoreboardDialogComponent } from './scoreboard-dialog.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatTableModule
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent implements OnInit {
  sections = sections;
  isCumulative = false;
  selectedSectionIndex = -1;
  playerUsername = '';
  isNekodos = false;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.authService.username$.subscribe(username => {
      this.playerUsername = username;
    });
  }

  handleSectionClick(index: number): void {
    this.selectedSectionIndex = index;
    this.isNekodos = false;
  }

  toggleNekodos(): void {
    this.isNekodos = !this.isNekodos;
    if (this.isNekodos) {
      this.selectedSectionIndex = this.sections.length - 1; // Last element (nekodos)
    }
  }

  handleContinue(): void {
    this.router.navigate(['/game'], {
      state: {
        selectedSectionsIndex: this.selectedSectionIndex,
        isCumulative: this.isNekodos ? false : this.isCumulative,
        playerUsername: this.playerUsername,
        isNekodos: this.isNekodos
      }
    });
  }

  handleSignOut(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openScoreboard(): void {
    this.apiService.getScoreboard().subscribe({
      next: (data) => {
        const sortedData = data.sort((a, b) => b.total_points - a.total_points);
        this.dialog.open(ScoreboardDialogComponent, {
          width: '600px',
          data: { scoreboardData: sortedData, currentUsername: this.playerUsername }
        });
      },
      error: (error) => {
        console.error('Error fetching scoreboard:', error);
      }
    });
  }

  isSectionSelected(index: number): boolean {
    return this.selectedSectionIndex === index ||
           (this.isCumulative && index < this.selectedSectionIndex);
  }
}
