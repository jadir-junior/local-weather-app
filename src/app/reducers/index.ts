import * as fromSearch from './search.reducer'

import { ActionReducerMap, createSelector } from '@ngrx/store'

export interface State {
  search: fromSearch.State
}

export const reducers: ActionReducerMap<State> = {
  search: fromSearch.reducer,
}

export const selectCurrentWeather = createSelector(
  (state: State) => state.search.current,
  (current) => current
)
