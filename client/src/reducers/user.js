// User reducer is created 

export default function userReducer(state = {
    id: "",
    email: "",
    nickname: "",
    picture: "",
    watchlist: [],
    favorites: [],
    friends: [],
    // following: [],
    // followers: [],
    posts: []
}, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                // id: action.payload.id,    // don't have this yet, no DB id
                email: action.payload.email,
                nickname: action.payload.nickname,
                picture: action.payload.picture
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