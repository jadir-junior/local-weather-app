import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CurrentWeatherComponent } from './current-weather.component'

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent
  let fixture: ComponentFixture<CurrentWeatherComponent>
  let localWeatherElement: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrentWeatherComponent],
      imports: [HttpClientModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent)
    component = fixture.componentInstance
    localWeatherElement = fixture.nativeElement
    component.current = {
      city: 'Bethesda',
      country: 'US',
      date: 1638759600000,
      image: 'assets/img/sunny.svg',
      temperature: 72.6,
      description: 'sunny',
    }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render local weather component', () => {
    expect(localWeatherElement.textContent).toContain('Bethesda, US')
    expect(localWeatherElement.textContent).toContain('sunny')
  })

  it('should render a date with fullDate', () => {
    expect(localWeatherElement.textContent).toContain('Monday, December 6, 2021')
  })

  it('should render a temperature with round 72.6 to up', () => {
    expect(localWeatherElement.textContent).toContain('73 ºF')
  })
})
