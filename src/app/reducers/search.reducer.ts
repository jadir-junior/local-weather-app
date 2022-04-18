import { Action, createReducer, on } from '@ngrx/store'

import { ICurrentWeather } from '../interfaces'
import { SearchActions } from '../actions/search.actions'
import { defaultWeather } from '../weather/weather.service'

export interface State {
  current: ICurrentWeather
}

export const initialState: State = { current: defaultWeather }

const searchReducer = createReducer(
  initialState,
  on(
    SearchActions.weatherLoaded,
    (state, action): State => ({
      ...state,
      current: action.current,
    })
  )
)

export function reducer(state: State | undefined, action: Action) {
  return searchReducer(state, action)
}
