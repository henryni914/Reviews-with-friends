// User reducer is created 

export default function userReducer(state = {
    id: "",
    email: "",
    name: "",
    picture: "",
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
        case 'ADD_POSTS':
            return {
                ...state,
                posts: [...state.posts, action.payload]
            }
        default:
            return state;
    }
}