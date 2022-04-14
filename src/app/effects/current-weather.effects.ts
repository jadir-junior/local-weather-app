import { Actions, createEffect, ofType } from '@ngrx/effects'
import { EMPTY, catchError, exhaustMap, map } from 'rxjs'

import { Injectable } from '@angular/core'
import { SearchActions } from '../actions/search.actions'
import { WeatherService } from '../weather/weather.service'

@Injectable()
export class CurrentWeatherEffects {
  getCurrentWeather$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SearchActions.search),
      exhaustMap((action) => this.doSearch(action))
    )
  })

  constructor(private actions$: Actions, private weatherService: WeatherService) {}

  private doSearch(action: { searchText: string; country?: string }) {
    return this.weatherService.getCurrentWeather(action.searchText, action.country).pipe(
      map((weather) => SearchActions.weatherLoaded({ current: weather })),
      catchError(() => EMPTY)
    )
  }
}
