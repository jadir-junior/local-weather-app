import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'

@Component({
  selector: 'app-current-weather',
  template: '',
})
class MockCurrentWeatherComponent {}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, MockCurrentWeatherComponent],
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })
})
