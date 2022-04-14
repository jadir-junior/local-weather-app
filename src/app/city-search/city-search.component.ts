import { Component, OnDestroy } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { Subscription, debounceTime, filter, tap } from 'rxjs'

import { WeatherService } from '../weather/weather.service'

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
})
export class CitySearchComponent implements OnDestroy {
  useNgRx = false
  search = new FormControl('', [Validators.required, Validators.minLength(2)])
  private subscription?: Subscription

  constructor(private weatherService: WeatherService) {
    this.subscription = this.search.valueChanges
      .pipe(
        debounceTime(1000),
        filter(() => !this.search.invalid),
        tap((searchValue: string) => this.doSearch(searchValue))
      )
      .subscribe()
  }

  doSearch(searchValue: string) {
    const userInput = searchValue.split(',').map((s) => s.trim())
    const searchText = userInput[0]
    const country = userInput.length > 1 ? userInput[1] : undefined

    if (this.useNgRx) {
      // this.ngRxBasedSearch(searchText, country)
    } else {
      this.behaviorSubjectBasedSearch(searchText, country)
    }
  }

  behaviorSubjectBasedSearch(searchText: string, country?: string) {
    this.weatherService.updateCurrentWeather(searchText, country)
  }

  // ngRxBasedSearch(searchText: string, country?: string) {}

  getErrorMessage(): string {
    return this.search.hasError('minlength')
      ? 'Type more than one character to search'
      : ''
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
