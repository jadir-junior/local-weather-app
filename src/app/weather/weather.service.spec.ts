import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { fakeWeather, fakeWeatherData } from './weather.service.fake'

import { TestBed } from '@angular/core/testing'
import { WeatherService } from './weather.service'

describe('WeatherService', () => {
  let weatherService: WeatherService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
    weatherService = TestBed.inject(WeatherService)
  })

  it('should be created', () => {
    expect(weatherService).toBeTruthy()
  })

  describe('getCurrentWeather', () => {
    xit('should return value given city name', () => {
      // Arrage
      const httpMock = TestBed.inject(HttpTestingController)
      const uriParams = 'q=Bethesda'

      // Act
      weatherService.getCurrentWeather('Bethesda').subscribe((data) => {
        // Assert
        expect(data.city).toEqual('Bethesda')
      })

      // Assert
      const request = httpMock.expectOne(
        `http://api.openweathermap.org/data/2.5/weather?${uriParams}&appid=7d9269870c5d0ac153708285ec501f04`,
        'call to api'
      )

      expect(request.request.method).toBe('GET')

      request.flush(fakeWeatherData)

      httpMock.verify()
    })

    xit('should return value given city name and country', () => {
      // Arrage
      const httpMock = TestBed.inject(HttpTestingController)
      const uriParams = 'q=Bethesda,US'

      // Act
      weatherService.getCurrentWeather('Bethesda', 'US').subscribe((data) => {
        // Assert
        expect(data.city).toEqual('Bethesda')
        expect(data.country).toEqual('US')
      })

      // Assert
      const request = httpMock.expectOne(
        `http://api.openweathermap.org/data/2.5/weather?${uriParams}&appid=7d9269870c5d0ac153708285ec501f04`,
        'call to api'
      )

      expect(request.request.method).toBe('GET')

      request.flush(fakeWeatherData)

      httpMock.verify()
    })

    xit('should return value given zip code', () => {
      // Arrange
      const httpMock = TestBed.inject(HttpTestingController)
      const uriParams = '22201'

      // Act
      weatherService.getCurrentWeather('22201').subscribe()

      // Assert
      const request = httpMock.expectOne(
        `http://api.openweathermap.org/data/2.5/weather?${uriParams}&appid=7d9269870c5d0ac153708285ec501f04`,
        'call to api'
      )
      expect(request.request.method).toBe('GET')
    })
  })

  describe('getCurrentWeatherByCoords', () => {
    xit('should return a value given the coords', () => {
      const httpMock = TestBed.inject(HttpTestingController)
      const uriParams = 'lat=-23.18639&lon=-46.88417'
      const coords: GeolocationCoordinates = {
        accuracy: 123,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        latitude: -23.18639,
        longitude: -46.88417,
        speed: null,
      }

      // Act
      weatherService.getCurrentWeatherByCoords(coords).subscribe((data) => {
        // Assert
        expect(data.city).toEqual('Bethesda')
        expect(data.country).toEqual('US')
      })

      // Assert
      const request = httpMock.expectOne(
        `http://api.openweathermap.org/data/2.5/weather?${uriParams}&appid=7d9269870c5d0ac153708285ec501f04`,
        'call to api'
      )
      expect(request.request.method).toBe('GET')

      request.flush(fakeWeatherData)

      httpMock.verify()
    })
  })

  describe('updateCurrentWeather', () => {
    xit('should emit event on update weather with city or city and country', () => {
      // Arrenge
      const httpMock = TestBed.inject(HttpTestingController)
      const uriParams = 'q=Bethesda'

      // Act
      weatherService.updateCurrentWeather('Bethesda')

      // Assert
      const request = httpMock.expectOne(
        `http://api.openweathermap.org/data/2.5/weather?${uriParams}&appid=7d9269870c5d0ac153708285ec501f04`,
        'call to api'
      )
      expect(request.request.method).toBe('GET')

      request.flush(fakeWeatherData)

      httpMock.verify()

      weatherService.currentWeather$.subscribe((data) => {
        expect(data).toEqual(fakeWeather)
      })
    })
  })
})
