import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations'
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { expectText, setBlur, setFieldValue } from '../utils/testing-helper'

import { CitySearchComponent } from './city-search.component'
import { MaterialModule } from '../material.module'
import { WeatherService } from '../weather/weather.service'
import { of } from 'rxjs'
import { weather } from './weather.mock'

describe('CitySearchComponent', () => {
  let component: CitySearchComponent
  let fixture: ComponentFixture<CitySearchComponent>

  let fakeWeatherService: Pick<WeatherService, 'updateCurrentWeather'>

  beforeEach(async () => {
    fakeWeatherService = {
      updateCurrentWeather: jasmine
        .createSpy('updateCurrentWeather')
        .and.returnValue(of(weather)),
    }

    await TestBed.configureTestingModule({
      declarations: [CitySearchComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [{ provide: WeatherService, useValue: fakeWeatherService }],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CitySearchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('get a error message when type one character', () => {
    setFieldValue(fixture, 'input-search', 'a')
    setBlur(fixture, 'input-search')
    fixture.detectChanges()

    expectText(fixture, 'error-message', 'Type more than one character to search')
  })

  it('search by the city Jundiai', fakeAsync(() => {
    setFieldValue(fixture, 'input-search', 'Jundiai')
    fixture.detectChanges()

    tick(1000)

    expect(component.search.value).toBe('Jundiai')
    expect(fakeWeatherService.updateCurrentWeather).toHaveBeenCalledWith(
      'Jundiai',
      undefined
    )
  }))

  it('search with city and country', fakeAsync(() => {
    setFieldValue(fixture, 'input-search', 'Jundiai, Brasil')
    fixture.detectChanges()

    tick(1000)

    expect(component.search.value).toBe('Jundiai, Brasil')
    expect(fakeWeatherService.updateCurrentWeather).toHaveBeenCalledWith(
      'Jundiai',
      'Brasil'
    )
  }))
})
