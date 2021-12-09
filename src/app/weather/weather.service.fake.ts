import { ICurrentWeather } from '../interfaces'
import { ICurrentWeatherData } from './weather.service'

export const fakeWeather: ICurrentWeather = {
  city: 'Bethesda',
  country: 'US',
  date: 1638759600000,
  image: 'http://openweathermap.org/img/w/.png',
  temperature: 44.906000000000006,
  description: 'light intensity drizzle',
}

export const fakeWeatherData: ICurrentWeatherData = {
  weather: [
    {
      description: 'light intensity drizzle',
      icon: '',
    },
  ],
  main: {
    temp: 280.32,
  },
  sys: {
    country: 'US',
  },
  dt: 1638759600,
  name: 'Bethesda',
}
