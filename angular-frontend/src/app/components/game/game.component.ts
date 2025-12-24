import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { sections, Letter } from '../../utils/constants';
import { ApiService } from '../../core/services/api.service';
import { TimerComponent } from '../timer/timer.component';
import { GameOverDialogComponent } from './game-over-dialog.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    TimerComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit, OnDestroy {
  sections = sections;
  selectedSections: any[] = [];
  isCumulative = false;
  selectedSectionsIndex = 0;
  playerUsername = '';
  isNekodos = false;

  isAnswerCorrect: boolean | null = null;
  isActive = false;
  userCanClickLetters = false; // true only while game has been started and audio isn't playing 
  clickedIndex: number | null = null;
  points = 0;
  playerLost = false;
  timeLeft = 0;
  numOfLetters = 0;
  soundClipIndexArr: number[] = [];
  currIndex = 0;
  showMessage = false;
  allLetters: Letter[] = [];
  currentAudio: HTMLAudioElement | null = null;
  pointMessages: Array<{points: number, isPositive: boolean}> = [];
  isFullscreen = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private dialog: MatDialog
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.selectedSectionsIndex = navigation.extras.state['selectedSectionsIndex'] || 0;
      this.isCumulative = navigation.extras.state['isCumulative'] || false;
      this.playerUsername = navigation.extras.state['playerUsername'] || '';
      this.isNekodos = navigation.extras.state['isNekodos'] || false;
    }
  }

  ngOnInit(): void {
    if (this.isNekodos) {
      // Only use the nekodos section (last element)
      this.selectedSections = [this.sections[this.sections.length - 1]];
      this.allLetters = [...this.sections[this.sections.length - 1].letters];
    } else {
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

    // Listen for fullscreen changes (e.g., when user presses ESC)
    document.addEventListener('fullscreenchange', this.onFullscreenChange.bind(this));
  }

  ngOnDestroy(): void {
    document.removeEventListener('fullscreenchange', this.onFullscreenChange.bind(this));
  }

  onFullscreenChange(): void {
    this.isFullscreen = !!document.fullscreenElement;
  }

  handleGoBack(): void {
    this.router.navigate(['/board']);
  }

  toggleFullscreen(): void {
    if (!this.isFullscreen) {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
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
    this.stopAudio();
    this.userCanClickLetters = false;
    this.isActive = false;

    // Show game over dialog
    const finalScore = this.points;
    this.dialog.open(GameOverDialogComponent, {
      width: '400px',
      data: { points: finalScore },
      disableClose: true
    });

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
  }

  async anounceSetofLetters() {

    this.userCanClickLetters = false;
    const audioArray = this.buildAudioArr()
    await this.playAllAudio(audioArray)
    this.userCanClickLetters = true;
  }
  buildAudioArr() {
    this.soundClipIndexArr = Array.from(
          { length: this.numOfLetters },
      () => Math.floor(Math.random() * this.allLetters.length)
    );

    const audioArr = this.soundClipIndexArr.map(
      index => new Audio(this.allLetters[index].audiofilePath)
    );
    console.log(audioArr)
    return audioArr;

  }
  startGame(): void {
    this.points = 0;
    this.isActive = true;
    this.anounceSetofLetters() 
  }

  async playAllAudio(audioArr: HTMLAudioElement[]): Promise<void> {
    for (const audio of audioArr) {
      await this.playAudio(audio);
      await this.delay(100);
    }
    // this.userCanClickLetters = true;
  }

  playAudio(audio: HTMLAudioElement): Promise<void> {
    return new Promise<void>((resolve) => {
      this.currentAudio = audio;

      const onEnded = () => {
        this.currentAudio = null;
        resolve();
      };

      const onError = (error: any) => {
        console.error('Error with audio:', error);
        this.currentAudio = null;
        resolve();
      };

      audio.addEventListener('ended', onEnded, { once: true });
      audio.addEventListener('error', onError, { once: true });

      // Ensure audio is loaded before playing
      audio.load();
      audio.addEventListener('loadeddata', () => {
        audio.play().catch(onError);
      }, { once: true });
    });
  }

  stopAudio(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
  }

  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  
  getPointsForCorrect(): number {
    if (!this.isCumulative) {
      // Non-cumulative: always use yellow values
      const pointsMap = [5, 10, 15];
      return pointsMap[this.numOfLetters - 1] || 0;
    }

    // Cumulative: points based on section
    const pointsMap = [
      [5, 10, 15],    // YELLOW (index 0)
      [10, 15, 20],   // ORANGE (index 1)
      [15, 20, 25],   // RED (index 2)
      [20, 25, 30],   // BLUE (index 3)
      [25, 30, 35]    // PURPLE (index 4)
    ];

    return pointsMap[this.selectedSectionsIndex]?.[this.numOfLetters - 1] || 0;
  }

  getPointsForError(): number {
    if (!this.isCumulative) {
      // Non-cumulative: always use yellow values
      const pointsMap = [15, 10, 10];
      return pointsMap[this.numOfLetters - 1] || 0;
    }

    // Cumulative: points based on section
    const pointsMap = [
      [15, 10, 10],   // YELLOW (index 0)
      [15, 10, 5],    // ORANGE (index 1)
      [10, 5, 5],     // RED (index 2)
      [10, 5, 5],     // BLUE (index 3)
      [10, 5, 5]      // PURPLE (index 4)
    ];

    return pointsMap[this.selectedSectionsIndex]?.[this.numOfLetters - 1] || 0;
  }

  showPointChange(points: number, isPositive: boolean): void {
    this.pointMessages.push({ points, isPositive });

    setTimeout(() => {
      this.pointMessages.shift();
    }, 1500);
  }

  handleLetterClick(letterId: string, index: number){
    if(!this.userCanClickLetters) return;

    this.clickedIndex = index;

    if (letterId === this.allLetters[this.soundClipIndexArr[this.currIndex]].id) {
      const pointsEarned = this.getPointsForCorrect();
      this.points += pointsEarned;
      this.showPointChange(pointsEarned, true);

      if (this.currIndex === this.soundClipIndexArr.length - 1) {
        this.userCanClickLetters = false;
        this.isAnswerCorrect = true;
        this.currIndex = 0;
        this.anounceSetofLetters();
      } else {
        this.isAnswerCorrect = true;
        this.currIndex++;
      }
    } else {
      this.isAnswerCorrect = false;

      if (this.numOfLetters === 1) {
        const finalScore = this.points;
        this.stopAudio();
        this.isActive = false;
        this.userCanClickLetters = false;
        this.playerLost = true;
        this.points = 0;
        this.sendData(true);

        // Show game over dialog
        this.dialog.open(GameOverDialogComponent, {
          width: '400px',
          data: { points: finalScore },
          disableClose: true
        });
      } else {
        if (this.currIndex === this.soundClipIndexArr.length - 1) {
          this.anounceSetofLetters();
          this.currIndex = 0;
        } else {
          this.currIndex++;
        }
      }
    }
  }

  async showMessageBriefly(): Promise<void> {
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
