import * as fromSearch from './search.actions'

describe('loadSearchs', () => {
  it('should return an action', () => {
    expect(fromSearch.SearchActions.search({ searchText: 'Jundiai' }).type).toBe(
      '[SEARCH] Search'
    )
  })
})
