// User reducer is created 

export default function userReducer(state = {
    id: "",
    email: "",
    name: "",
    picture: "",
    reviews: [],
    watchlist: [],
    favorites: [],
    friends: [],
    // following: [],
    // followers: [],
}, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                id: action.payload.id,    // don't have this yet, no DB id
                email: action.payload.email,
                name: action.payload.name,
                // picture: action.payload.picture
            }
        case 'SET_REVIEWS':
            return {
                ...state,
                reviews: action.payload.userReviews
            }
        case 'SET_FAVORITES':
            return {
                ...state,
                favorites: action.payload.userFavorites
            }
        case 'ADD_FAVORITE':
            return {
                ...state,
                favorites: [...state.favorites, action.payload.add]
            }
        default:
            return state;
    }
}