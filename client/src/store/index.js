import { createStore } from 'redux'

const initialState = {
    currentUser: {
        id: "",
        nickname: "",
        picture: "",
        watchlist: [],
        favorites: [],
        friends: [],
        // following: [],
        // followers: [],
    },
    posts: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_POSTS':
            return {
                ...state,
                posts: [...state.posts, action.payload]
            }
            case 'SET_USER':
                return {
                    ...state,
                    currentUser: action.payload
                }
    }



    return state
}

const store = createStore(reducer)

export default store