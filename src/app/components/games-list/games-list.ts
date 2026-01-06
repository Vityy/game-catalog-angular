import {Component, Input} from '@angular/core';
import {Games} from '../../shared/models/games.model';

@Component({
  selector: 'app-games-list',
  imports: [],
  templateUrl: './games-list.html',
  styleUrl: './games-list.css',
})
export class GamesList {
  @Input() gamesFromParent! : Games[];
}
