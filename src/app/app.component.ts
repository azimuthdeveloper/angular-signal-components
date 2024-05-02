import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ChildComponentComponent} from "./child-component/child-component.component";
import {BehaviorSubject, interval, Observable, Subject, Subscription, takeUntil} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChildComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {

  timerSub: Subscription | undefined;
  model: Array<PriceData> | undefined;
  private readonly _destroying$ = new Subject<void>();

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
    // throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.timerSub = interval(1000)
      .pipe(takeUntil(this._destroying$))
      .subscribe(x => {
      this.model = [
        {
          name: "The book of cat photos",
          price: getRandomArbitrary(5, 15)
        },
        {
          name: "How to pat a cat",
          price: getRandomArbitrary(10, 40)
        },
        {
          name: "Cat Photography: A Short Guide",
          price: getRandomArbitrary(12, 20),
        },
        {
          name: "Understanding Cat Body Language: A Cautionary Tale",
          price: getRandomArbitrary(2, 15)
        }
      ]
    });
  }

  title = 'signalcomponents';
}

export class PriceData {
  price: number | undefined;
  name: string | undefined;
}

function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}
