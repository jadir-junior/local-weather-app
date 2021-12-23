import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  ObservablePropertyStrategy,
  autoSpyObj,
  injectSpy,
} from 'angular-unit-test-helper'

import { By } from '@angular/platform-browser'
import { CitySearchComponent } from './city-search.component'
import { DebugElement } from '@angular/core'
import { MaterialModule } from '../material.module'
import { WeatherService } from '../weather/weather.service'
import { of } from 'rxjs'

const type = (
  input: string,
  value: string,
  fixture: ComponentFixture<CitySearchComponent>
): void => {
  const debugEl: DebugElement = fixture.debugElement.query(By.css(input))
  const inputEl: HTMLInputElement = debugEl.nativeElement

  expect(inputEl.value).toBe('')

  inputEl.value = value

  inputEl.dispatchEvent(new Event(input))
  inputEl.dispatchEvent(new Event('blur'))
  fixture.detectChanges()
}

describe('CitySearchComponent', () => {
  let component: CitySearchComponent
  let fixture: ComponentFixture<CitySearchComponent>

  let weatherServiceMock: jasmine.SpyObj<WeatherService>

  beforeEach(async () => {
    const weatherServiceSpy = autoSpyObj(
      WeatherService,
      ['currentWeather$'],
      ObservablePropertyStrategy.BehaviorSubject
    )

    await TestBed.configureTestingModule({
      declarations: [CitySearchComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [{ provide: WeatherService, useValue: weatherServiceSpy }],
    }).compileComponents()

    weatherServiceMock = injectSpy(WeatherService)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CitySearchComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    // Arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of())

    // Act
    fixture.detectChanges()

    // Arrange
    expect(component).toBeTruthy()
  })

  xit('should search by the city Bethesda', () => {
    fixture.detectChanges()

    type('input', 'Bethesda', fixture)

    expect(component.search.value).toBe('Bethesda')
    expect(weatherServiceMock.updateCurrentWeather).toHaveBeenCalledWith(
      'Bethesda',
      undefined
    )
  })

  xit('should search with city and country', () => {
    fixture.detectChanges()

    type('input', 'Bethesda, US', fixture)

    expect(component.search.value).toBe('Bethesda, US')
    expect(weatherServiceMock.updateCurrentWeather).toHaveBeenCalledWith('Bethesda', 'US')
  })

  xit('should get a error message when type one character', () => {
    spyOn(component, 'getErrorMessage')

    fixture.detectChanges()

    type('input', 'a', fixture)

    const erroEl: HTMLElement = fixture.debugElement.query(
      By.css('mat-error')
    ).nativeElement

    expect(component.search.value).toBe('a')
    // expect(component.getErrorMessage).toHaveBeenCalled()
    // expect(erroEl.textContent).toContain('Type more than one character to search')
    expect(erroEl.textContent).toContain('error')
    // expect mat-error with message
  })
})
