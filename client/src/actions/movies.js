export const setTopFive = (movies) => ({
    type: 'SET_TOPFIVE',
    payload: {
        topFive: movies
    }
})

export const updateSearch = (query, arr) => ({
    type: 'SET_SEARCH',
    payload: {
        search: query,
        results: arr
    }
})