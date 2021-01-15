// Movie reducer 

export default function movieReducer(state = {
    topFive: [],
    searchResults: [],
}, action) {
    switch (action.type) {
        case 'SET_TOPFIVE':
            return {
                ...state,
                topFive: action.payload.topFive
            };

        default:
            return state;
    }
}