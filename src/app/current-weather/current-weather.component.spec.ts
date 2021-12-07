import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { injectSpy } from 'angular-unit-test-helper'
import { of } from 'rxjs'
import { WeatherService } from '../weather/weather.service'
import { fakeWeather } from '../weather/weather.service.fake'

import { CurrentWeatherComponent } from './current-weather.component'

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent
  let fixture: ComponentFixture<CurrentWeatherComponent>
  let weatherServiceMock: jasmine.SpyObj<WeatherService>
  let compiled: HTMLElement

  beforeEach(async () => {
    const weatherServiceSpy = jasmine.createSpyObj('WeatherService', [
      'getCurrentWeather',
    ])

    await TestBed.configureTestingModule({
      declarations: [CurrentWeatherComponent],
      imports: [],
      providers: [{ provide: WeatherService, useValue: weatherServiceSpy }],
    }).compileComponents()

    weatherServiceMock = injectSpy(WeatherService)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent)
    component = fixture.componentInstance

    compiled = fixture.debugElement.nativeElement
  })

  it('should create', () => {
    weatherServiceMock.getCurrentWeather.and.returnValue(of())

    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  it('should get currentWeather from weatherService', () => {
    weatherServiceMock.getCurrentWeather.and.returnValue(of())

    fixture.detectChanges()

    expect(weatherServiceMock.getCurrentWeather).toHaveBeenCalledTimes(1)
  })

  it('should eagerly load currentWeather in Bethesda from weatherService', () => {
    weatherServiceMock.getCurrentWeather.and.returnValue(of(fakeWeather))

    fixture.detectChanges()

    // Assert
    expect(component.current).toBeDefined()
    expect(component.current?.city).toEqual('Bethesda')
    expect(component.current?.temperature).toEqual(280.32)
    // Assert DOM
    const debugEl: DebugElement = fixture.debugElement
    const titleEl: HTMLElement = debugEl.query(
      By.css('[aria-label="City and Country"]')
    ).nativeElement
    const dateEl: HTMLElement = debugEl.query(By.css('[aria-label="Date"]')).nativeElement
    const temperatureEl: HTMLElement = debugEl.query(
      By.css('[aria-label="Temperature"]')
    ).nativeElement

    expect(titleEl.textContent).toContain('Bethesda, US')
    expect(dateEl.textContent).toContain(`Monday Dec 6th`)
    expect(temperatureEl.textContent).toContain('280ºF')
  })
})
