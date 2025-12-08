import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { formatTime } from '../../utils/format-time';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() timeLeft: number = 0;
  @Output() gametimeExpired = new EventEmitter<boolean>();

  gameTimeRemaining: number = 0;
  private timer: any;

  ngOnInit(): void {
    this.gameTimeRemaining = this.timeLeft;
    this.timer = setInterval(() => {
      this.gameTimeRemaining--;
      if (this.gameTimeRemaining <= 0) {
        clearInterval(this.timer);
        this.gametimeExpired.emit(false);
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  getFormattedTime(): string {
    return formatTime(this.gameTimeRemaining);
  }

  endGame(): void {
    this.gametimeExpired.emit(true);
  }
}
