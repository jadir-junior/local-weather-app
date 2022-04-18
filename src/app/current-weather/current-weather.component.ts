import * as appStore from '../reducers'

import { Observable, merge } from 'rxjs'

import { Component } from '@angular/core'
import { ICurrentWeather } from '../interfaces'
import { Store } from '@ngrx/store'
import { WeatherService } from '../weather/weather.service'

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent {
  current$: Observable<ICurrentWeather>

  constructor(
    private weatherService: WeatherService,
    // eslint-disable-next-line ngrx/no-typed-global-store
    private readonly store: Store<appStore.State>
  ) {
    this.current$ = merge(
      this.store.select(appStore.selectCurrentWeather),
      this.weatherService.currentWeather$
    )
  }

  getOrdinal(date: number) {
    const n = new Date(date).getDate()
    return n > 0
      ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : ''
  }
}
