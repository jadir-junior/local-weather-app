import { HttpClientTestingModule } from '@angular/common/http/testing'
import { DebugElement } from '@angular/core'
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule, ValidationErrors } from '@angular/forms'
import { By } from '@angular/platform-browser'
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations'
import {
  autoSpyObj,
  injectSpy,
  ObservablePropertyStrategy,
} from 'angular-unit-test-helper'
import { of } from 'rxjs'
import { MaterialModule } from '../material.module'
import { WeatherService } from '../weather/weather.service'

import { CitySearchComponent } from './city-search.component'

const type = (input: string, value: string, fixture: ComponentFixture<any>): void => {
  let debugEl: DebugElement = fixture.debugElement.query(By.css(input))
  let inputEl: HTMLInputElement = debugEl.nativeElement

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
