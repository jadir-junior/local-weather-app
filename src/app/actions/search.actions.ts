import { createAction, props, union } from '@ngrx/store'

import { ICurrentWeather } from '../interfaces'

export const SearchActions = {
  search: createAction(
    '[SEARCH] Search',
    props<{ searchText: string; country?: string }>()
  ),
  weatherLoaded: createAction(
    '[SEARCH] CurrentWeather loaded',
    props<{ current: ICurrentWeather }>()
  ),
}

const all = union(SearchActions)
export type SearchActions = typeof all
