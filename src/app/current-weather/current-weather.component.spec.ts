import { HttpClientTestingModule } from '@angular/common/http/testing'
import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { MaterialModule } from '../material.module'
import { WeatherService } from '../weather/weather.service'
import { fakeWeather } from '../weather/weather.service.fake'
import { CurrentWeatherComponent } from './current-weather.component'

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent
  let fixture: ComponentFixture<CurrentWeatherComponent>
  let weatherService: WeatherService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrentWeatherComponent],
      imports: [MaterialModule, HttpClientTestingModule],
      providers: [WeatherService],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent)
    component = fixture.componentInstance
    weatherService = fixture.debugElement.injector.get(WeatherService)
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  it('should get currentWeather from weatherService', (done) => {
    // Arrange
    weatherService.currentWeather$.next(fakeWeather)

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
