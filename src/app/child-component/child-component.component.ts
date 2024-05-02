import {Component, computed, effect, input, Input, OnChanges, signal, SimpleChanges} from '@angular/core';
import {PriceData} from "../app.component";
import {JsonPipe, NgClass} from "@angular/common";

@Component({
  selector: 'app-child-component',
  standalone: true,
  imports: [
    JsonPipe,
    NgClass
  ],
  templateUrl: './child-component.component.html',
  styleUrl: './child-component.component.css'
})
export class ChildComponentComponent {
  prices = input.required<Array<PriceData>>();
  // priceDelta = Array<number | undefined>();
  oldPrices = Array<PriceData>();

  priceDifferences = computed(() => {
      let priceDelta = [
        this.priceCompare(this.oldPrices[0], this.prices()[0]),
        this.priceCompare(this.oldPrices[1], this.prices()[1]),
        this.priceCompare(this.oldPrices[2], this.prices()[2]),
        this.priceCompare(this.oldPrices[3], this.prices()[3]),
      ]

      return priceDelta.map(x => ({
        change: x,
        direction: (x ?? 0) > 0 ? PriceDirection.Increasing : PriceDirection.Decreasing,

      } as PriceDescription));
  })

  // priceDescriptions = Array<PriceDescription>;

  constructor() {
    effect(() => {
      this.oldPrices = this.prices();
    });
  }

  priceCompare = (oldPrice: PriceData, newPrice: PriceData) => {
    if (oldPrice.price != undefined && newPrice.price != undefined) {
      return newPrice.price - oldPrice.price;
    }
    return undefined;
  }
}

export enum PriceDirection {
  Increasing,
  Decreasing
}

export interface PriceDescription {
  change: number,
  direction: PriceDirection
}
