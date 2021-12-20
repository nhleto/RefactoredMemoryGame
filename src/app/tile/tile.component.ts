import { Component, Input, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { GameStateService } from '../Services/game-state.service';
import { Destroyable } from '../Utility/destroyable';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent extends Destroyable implements OnInit {
  private tiles: number[] = [];
  private chosenTiles: number[] = [];
  chosen = false;
  @Input() indexOfTile!: number;

  constructor(private gameStateService: GameStateService) {
    super();
  }

  ngOnInit(): void {
    this.gameStateService.tileStream$.pipe(
      takeUntil(this.destroy$))
      .subscribe(value => this.tiles.push(value));

    this.chosen = this.gameStateService.checkIndexOfTile(this.indexOfTile, this.chosenTiles);
    console.log(this.chosen)
  }
}
