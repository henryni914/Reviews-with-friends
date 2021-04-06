// Movie reducer 

export default function movieReducer(state = {
    topFive: [],
    search: "",
    searchResults: [],
    currentTmdbId: "",
    currentFilmId: "",
    reviews: []
}, action) {
    switch (action.type) {
        case 'SET_TOPFIVE':
            return {
                ...state,
                topFive: action.payload.topFive
            }
        case 'SET_SEARCH':
            return {
                ...state,
                search: action.payload.search,
                searchResults: action.payload.results
            }
        case 'SET_FILM':
            return {
                ...state,
                currentTmdbId: action.payload.selected,
                currentFilmId: action.payload.dbId
            }
        case 'SET_REVIEWS':
            return {
                ...state,
                reviews: action.payload.reviews
            }
        default:
            return state;
    }
}