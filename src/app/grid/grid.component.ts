import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../Services/game-state.service';
import { takeUntil, tap } from 'rxjs/operators';
import { Destroyable } from '../Utility/destroyable';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent extends Destroyable implements OnInit {
  tiles: number[] = [];
  chosenTiles: number[] = [];
  gameDifficulty = 9;

  constructor(private gameStateService: GameStateService) {
    super();
  }

  ngOnInit(): void {
    this.gameStateService.tileArrayStream$.pipe(
      takeUntil(this.destroy$))
      .subscribe(value => this.tiles.push(value));

    this.gameStateService.chooseGameTiles(this.tiles, this.gameDifficulty);
  }

}
