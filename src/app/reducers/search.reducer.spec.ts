import { initialState, reducer } from './search.reducer'

import { SearchActions } from '../actions/search.actions'
import { defaultWeather } from '../weather/weather.service'
import { fakeWeather } from '../weather/weather.service.fake'
import { selectCurrentWeather } from '.'

describe('Search Reducer', () => {
  describe('weatherLoaded', () => {
    it('should return current weather', () => {
      const action = SearchActions.weatherLoaded({ current: fakeWeather })
      const result = reducer(initialState, action)
      expect(result).toEqual({ current: fakeWeather })
    })
  })

  describe('Search Selectors', () => {
    it('should selectCurrentWeather', () => {
      const expectedWeather = defaultWeather
      expect(selectCurrentWeather({ search: { current: defaultWeather } })).toEqual(
        expectedWeather
      )
    })
  })
})
