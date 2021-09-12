import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameStateService } from '../Services/game-state.service';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Destroyable } from '../Utility/destroyable';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent extends Destroyable implements OnInit {
  Tiles: number[] = [];
  tileSubscription = new Subscription();

  constructor(private gameStateService: GameStateService) {
    super();
  }

  ngOnInit(): void {
    this.tileSubscription = this.gameStateService.seedTileArray$().pipe(
      takeUntil(this.destroy$))
      .subscribe(value => {
        this.Tiles.push(value);
        console.log(value);
      });
    console.log(this.Tiles);
  }

}
