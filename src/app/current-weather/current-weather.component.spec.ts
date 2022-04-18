import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import {
  ObservablePropertyStrategy,
  autoSpyObj,
  injectSpy,
} from 'angular-unit-test-helper'
import { WeatherService, defaultWeather } from '../weather/weather.service'

import { By } from '@angular/platform-browser'
import { CurrentWeatherComponent } from './current-weather.component'
import { DebugElement } from '@angular/core'
import { ICurrentWeather } from '../interfaces'
import { MaterialModule } from '../material.module'
import { Store } from '@ngrx/store'
import { fakeWeather } from '../weather/weather.service.fake'
import { of } from 'rxjs'

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent
  let fixture: ComponentFixture<CurrentWeatherComponent>
  let weatherServiceMock: jasmine.SpyObj<WeatherService>

  let store: MockStore<{ search: { current: ICurrentWeather } }>
  const initialState = { search: { current: defaultWeather } }

  beforeEach(async () => {
    const weatherServiceSpy = autoSpyObj(
      WeatherService,
      ['currentWeather$'],
      ObservablePropertyStrategy.BehaviorSubject
    )

    await TestBed.configureTestingModule({
      declarations: [CurrentWeatherComponent],
      imports: [MaterialModule],
      providers: [
        { provide: WeatherService, useValue: weatherServiceSpy },
        provideMockStore({ initialState }),
      ],
    }).compileComponents()

    weatherServiceMock = injectSpy(WeatherService)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    store = TestBed.inject(Store) as any
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    // Act
    weatherServiceMock.getCurrentWeather.and.returnValue(of())

    // Act
    fixture.detectChanges() // triggers ngOnInit

    // Assert
    expect(component).toBeTruthy()
  })

  it('should get currentWeather from weatherService', async (done) => {
    // Arrange
    store.setState({ search: { current: fakeWeather } })
    weatherServiceMock.currentWeather$.next(fakeWeather)

    // Act
    fixture.detectChanges()

    // Assert
    expect(component.current$).toBeDefined()

    component.current$.subscribe((current) => {
      expect(current?.city).toEqual('Bethesda')
      expect(current?.temperature).toEqual(44.906000000000006)

      // Assert DOM
      const debugEl: DebugElement = fixture.debugElement
      const titleEl: HTMLElement = debugEl.query(
        By.css('[aria-label="City and Country"]')
      ).nativeElement
      const dateEl: HTMLElement = debugEl.query(
        By.css('[aria-label="Date"]')
      ).nativeElement
      const temperatureEl: HTMLElement = debugEl.query(
        By.css('[aria-label="Temperature"]')
      ).nativeElement

      expect(titleEl.textContent).toContain('Bethesda, US')
      expect(dateEl.textContent).toContain(`Monday Dec 6th`)
      expect(temperatureEl.textContent).toContain('45ºF')
      done()
    })
  })
})
