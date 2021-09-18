import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { GameStateService } from '../Services/game-state.service';
import { Destroyable } from '../Utility/destroyable';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent extends Destroyable implements OnInit {
    tiles: number[] = [];
    chosenTiles: number[] = [];

  constructor(private gameStateService: GameStateService) {
      super();
  }

  ngOnInit(): void {
    this.gameStateService.tileArrayStream$.pipe(
        takeUntil(this.destroy$))
        .subscribe(value => this.tiles.push(value));
  }

}
