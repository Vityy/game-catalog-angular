import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Games } from '../models/games.model';
import {environment} from '../../../environments/environment';
import {map, Observable} from 'rxjs';
import {RatingStats} from '../models/ratingStats.model';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private gamesUrl = environment.apiUrl;
  private httpClient = inject(HttpClient);

  public getTopGames() : Observable<Games[]> {
    return this.httpClient.get<Games[]>(this.gamesUrl + '/top');
  }

  public getMostRecentGames() : Observable<Games[]> {
    return this.httpClient.get<Games[]>(this.gamesUrl + '/recent');
  }

  public getGamesRatingStats(): Observable<RatingStats[]> { return this.httpClient.get<{ [key: string]: number }>(this.gamesUrl + '/ratings')
    .pipe(
      map(obj =>
        Object.entries(obj).map(([rating, count]) => ({
          rating: Number(rating),
          count
        }))
      )
    );
  }
}
