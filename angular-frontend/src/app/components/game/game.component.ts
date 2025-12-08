import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { sections, Letter } from '../../utils/constants';
import { ApiService } from '../../core/services/api.service';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    TimerComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {
  sections = sections;
  selectedSections: any[] = [];
  isCumulative = false;
  selectedSectionsIndex = 0;
  playerUsername = '';

  isAnswerCorrect: boolean | null = null;
  isActive = false;
  clickedIndex: number | null = null;
  points = 0;
  playerLost = false;
  timeLeft = 0;
  attempts = 0;
  numOfLetters = 0;
  soundClipIndexArr: number[] = [];
  currIndex = 0;
  showMessage = false;
  allLetters: Letter[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.selectedSectionsIndex = navigation.extras.state['selectedSectionsIndex'] || 0;
      this.isCumulative = navigation.extras.state['isCumulative'] || false;
      this.playerUsername = navigation.extras.state['playerUsername'] || '';
    }
  }

  ngOnInit(): void {
    this.selectedSections = this.sections.filter((_, index) => {
      if (this.isCumulative) {
        return index <= this.selectedSectionsIndex;
      } else {
        return index === this.selectedSectionsIndex;
      }
    });

    this.allLetters = [...this.sections[this.selectedSectionsIndex].letters];
    if (this.isCumulative) {
      let latestIdx = this.selectedSectionsIndex - 1;
      while (latestIdx > -1) {
        this.allLetters = [...this.allLetters, ...this.sections[latestIdx].letters];
        latestIdx--;
      }
    }
  }

  handleGoBack(): void {
    this.router.navigate(['/board']);
  }

  getStyle(isClicked: boolean): any {
    return {
      display: 'flex',
      justifyContent: 'center',
      cursor: this.isActive ? 'pointer' : 'default',
      alignItems: 'center',
      backgroundColor: this.isActive ? 'white' : 'lightgrey',
      borderRadius: '5px',
      border: isClicked ? '4px solid darkgrey' : '1px solid black'
    };
  }

  sendData(lostSingleLetterGame: boolean): void {
    const data = {
      username: this.playerUsername,
      points: this.points,
      letter_level: this.numOfLetters,
      selected_sections_index: this.selectedSectionsIndex,
      is_cumulative: this.isCumulative,
      lost_single_letter_game: lostSingleLetterGame
    };

    this.apiService.sendGameData(data).subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (error) => {
        console.error('Error sending data:', error);
      }
    });
  }

  setGameOver(endedEarly: boolean): void {
    this.isActive = false;
    this.points = 0;
    if (!endedEarly) {
      this.sendData(false);
    }
  }

  handleChange(value: number): void {
    this.numOfLetters = value;
    switch (value) {
      case 1:
        this.timeLeft = 45;
        break;
      case 2:
        this.timeLeft = 60;
        break;
      case 3:
        this.timeLeft = 75;
        break;
      default:
        break;
    }
    this.soundClipIndexArr = Array.from(
      { length: value },
      () => Math.floor(Math.random() * this.allLetters.length)
    );
  }

  startGame(): void {
    this.points = 0;
    this.isActive = true;
    this.attempts++;

    setTimeout(() => {
      this.isAnswerCorrect = null;
      const audioArr = this.soundClipIndexArr.map(
        index => new Audio(this.allLetters[index].audiofilePath)
      );
      this.playAllAudio(audioArr);
    }, 500);
  }

  async playAllAudio(audioArr: HTMLAudioElement[]): Promise<void> {
    for (const audio of audioArr) {
      await this.playAudio(audio);
      await this.delay(900);
    }
  }

  playAudio(audio: HTMLAudioElement): Promise<void> {
    return new Promise<void>((resolve) => {
      audio.play();
      audio.onended = () => resolve();
    });
  }

  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  handleLetterClick(letter: string, index: number): void {
    if (!this.isActive) return;

    this.clickedIndex = index;
    setTimeout(() => (this.clickedIndex = null), 100);

    if (letter === this.allLetters[this.soundClipIndexArr[this.currIndex]].unicode) {
      this.points += 10;

      if (this.currIndex === this.soundClipIndexArr.length - 1) {
        this.isAnswerCorrect = true;
        this.showMessageBriefly();
        this.soundClipIndexArr = Array.from(
          { length: this.numOfLetters },
          () => Math.floor(Math.random() * this.allLetters.length)
        );
        this.currIndex = 0;
        this.attempts++;
        setTimeout(() => this.playAllAudio(
          this.soundClipIndexArr.map(idx => new Audio(this.allLetters[idx].audiofilePath))
        ), 500);
      } else {
        this.isAnswerCorrect = true;
        this.showMessageBriefly();
        this.currIndex++;
      }
    } else {
      this.isAnswerCorrect = false;
      this.showMessageBriefly();

      if (this.numOfLetters === 1) {
        this.isActive = false;
        this.playerLost = true;
        this.sendData(true);
      } else {
        if (this.currIndex === this.soundClipIndexArr.length - 1) {
          this.soundClipIndexArr = Array.from(
            { length: this.numOfLetters },
            () => Math.floor(Math.random() * this.allLetters.length)
          );
          this.currIndex = 0;
          this.attempts++;
          setTimeout(() => this.playAllAudio(
            this.soundClipIndexArr.map(idx => new Audio(this.allLetters[idx].audiofilePath))
          ), 500);
        } else {
          this.currIndex++;
        }
      }
    }
  }

  showMessageBriefly(): void {
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 500);
  }

  getSectionCssClass(section: any): string {
    if (section.css_id.startsWith('middle-')) {
      return section.css_id === 'middle-left container'
        ? 'middle-left-game container'
        : 'middle-right-game container';
    }
    return section.css_id;
  }
}
