// User reducer is created 

export default function userReducer(state = {
    id: "",
    email: "",
    name: "",
    dateJoined: "",
    nickname: "",
    picture: "",
    reviews: [],
    watchlist: [],
    favorites: [],
    friends: [],
    likedReviews: [],
}, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                id: action.payload.id,    // don't have this yet, no DB id
                email: action.payload.email,
                name: action.payload.name,
                dateJoined: action.payload.dateJoined,
                nickname: action.payload.nickname
            }
        case 'SET_NICKNAME_AND_DATE':
            return {
                ...state,
                dateJoined: action.payload.dateJoined,
                nickname: action.payload.nickname
            }
        case 'SET_NICKNAME':
            return {
                ...state,
                nickname: action.payload.nickname
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
        case 'SET_WATCHLIST':
            return {
                ...state,
                watchlist: action.payload.userWatchlist
            }
        case 'SET_LIKED_REVIEWS':
            return {
                ...state,
                likedReviews: action.payload.reviews
            }
        default:
            return state;
    }
}