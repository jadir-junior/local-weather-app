import { TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { createComponentMock } from 'angular-unit-test-helper'
import { MaterialModule } from './material.module'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        createComponentMock('CurrentWeatherComponent'),
        createComponentMock('CitySearchComponent'),
      ],
      imports: [MaterialModule],
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it('should render title in a toolbar', () => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    const compiled: HTMLElement = fixture.debugElement.nativeElement
    expect(compiled.querySelector('mat-toolbar')?.textContent).toContain(
      'LocalCast Weather'
    )
  })
})
