export const setTopFive = (movies) => ({
    type: 'SET_TOPFIVE',
    payload: {
        topFive: movies
    }
});

export const updateSearch = (query, arr) => ({
    type: 'SET_SEARCH',
    payload: {
        search: query,
        results: arr
    }
});

export const setFilm = (id, movieDbId) => ({
    type: 'SET_FILM',
    payload: {
        selected: id,
        dbId: movieDbId 
    }
});

export const setReviews = (results) => ({
    type: 'SET_REVIEWS',
    payload: {
        reviews: results
    }
})