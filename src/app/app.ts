import {Component, signal, OnInit, OnDestroy, inject, ChangeDetectorRef} from '@angular/core';
import{Games} from './shared/models/games.model';
import {RatingStats} from './shared/models/ratingStats.model';
import {Subscription} from 'rxjs';
import {GamesService} from './shared/services/games';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  implements OnInit, OnDestroy {
  protected readonly title = signal('Dashboard');

  private gamesService = inject(GamesService);
  private cdr = inject(ChangeDetectorRef);

  private subscriptions : Subscription[] = [];
  protected topGames!: Games[];
  protected recentGames!: Games[];
  protected ratingStats!: RatingStats[];

  ngOnInit() {
    this.getTopGames();
    this.getRecentGames();
    this.getRatingsStats();
  }

  protected getTopGames() {
    this.subscriptions.push(this.gamesService.getTopGames().subscribe((gamesFromApi: Games[]) => {
      this.topGames = gamesFromApi;
      this.cdr.detectChanges();
    }));
  }

  protected getRecentGames() {
    this.subscriptions.push(this.gamesService.getMostRecentGames().subscribe((gamesFromApi: Games[]) => {
      this.recentGames = gamesFromApi;
      this.cdr.detectChanges();
    }));
  }

  protected getRatingsStats() {
    this.subscriptions.push(this.gamesService.getGamesRatingStats().subscribe((statsFromApi: RatingStats[]) => {
      this.ratingStats = statsFromApi;
      this.cdr.detectChanges();
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
