import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
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
export class ChildComponentComponent implements OnChanges {
  priceDelta = Array<number | undefined>();
  priceDescriptions = Array<PriceDescription>;

  ngOnChanges(changes: SimpleChanges): void {
    // changes.data.
    let oldData = changes['data'].previousValue as Array<PriceData>;
    let newData = changes['data'].currentValue as Array<PriceData>;

    this.priceDelta = [
      this.priceCompare(oldData[0], newData[0]),
      this.priceCompare(oldData[1], newData[1]),
      this.priceCompare(oldData[2], newData[2]),
      this.priceCompare(oldData[3], newData[3]),
    ]

    this.priceDelta.map(x => ({
      change: x,
      direction: (x ?? 0) > 0 ? PriceDirection.Increasing : PriceDirection.Decreasing,

    } as PriceDescription));

  }

  @Input() data: Array<PriceData> | undefined;

  priceCompare = (oldPrice: PriceData, newPrice: PriceData) => {
    if (oldPrice.price != undefined && newPrice.price != undefined) {
      return newPrice.price - oldPrice.price;
    }
    return undefined;
  }
}

export enum PriceDirection{
  Increasing,
  Decreasing
}

export interface PriceDescription{
  change: number,
  direction: PriceDirection
}
