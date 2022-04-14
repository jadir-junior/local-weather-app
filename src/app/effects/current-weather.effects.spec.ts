import { CurrentWeatherEffects } from './current-weather.effects'
import { Observable } from 'rxjs'
import { TestBed } from '@angular/core/testing'
import { provideMockActions } from '@ngrx/effects/testing'

describe('CurrentWeatherEffects', () => {
  let actions$: Observable<object>
  let effects: CurrentWeatherEffects

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentWeatherEffects, provideMockActions(() => actions$)],
    })

    effects = TestBed.inject(CurrentWeatherEffects)
  })

  it('should be created', () => {
    expect(effects).toBeTruthy()
  })
})
