// Movie reducer 

export default function movieReducer(state = {
    topFive: [],
    search: "",
    searchResults: [],
    currentFilmId: "",
}, action) {
    switch (action.type) {
        case 'SET_TOPFIVE':
            return {
                ...state,
                topFive: action.payload.topFive
            };
        case 'SET_SEARCH':
            return {
                ...state,
                search: action.payload.search,
                searchResults: action.payload.results
            }
        case 'SET_FILM':
            return {
                ...state,
                currentFilmId: action.payload.selected
            }
        default:
            return state;
    }
}