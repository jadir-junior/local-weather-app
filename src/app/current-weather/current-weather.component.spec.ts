import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { of } from 'rxjs'
import { WeatherService } from '../weather/weather.service'

import { CurrentWeatherComponent } from './current-weather.component'

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent
  let fixture: ComponentFixture<CurrentWeatherComponent>
  let localWeatherElement: HTMLElement
  let weatherService: WeatherService
  let current = {
    city: 'Bethesda',
    country: 'US',
    date: 1638759600000,
    image: 'assets/img/sunny.svg',
    temperature: 72.6,
    description: 'sunny',
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrentWeatherComponent],
      imports: [HttpClientModule],
    }).compileComponents()

    weatherService = TestBed.inject(WeatherService)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent)
    component = fixture.componentInstance
    localWeatherElement = fixture.nativeElement
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  it('should render message "no data" if current is null or undefined', () => {
    fixture.detectChanges()

    expect(localWeatherElement.textContent).toContain('no data')
  })

  it('should render local weather component', () => {
    spyOn(weatherService, 'getCurrentWeather').and.returnValue(of(current))
    fixture.detectChanges()

    expect(localWeatherElement.textContent).toContain('Bethesda, US')
    expect(localWeatherElement.textContent).toContain('sunny')
  })

  it('should render a date with fullDate', () => {
    spyOn(weatherService, 'getCurrentWeather').and.returnValue(of(current))
    fixture.detectChanges()

    expect(localWeatherElement.textContent).toContain('Monday, December 6, 2021')
  })

  it('should render a temperature with round 72.6 to up', () => {
    spyOn(weatherService, 'getCurrentWeather').and.returnValue(of(current))
    fixture.detectChanges()

    expect(localWeatherElement.textContent).toContain('73 ºF')
  })
})
