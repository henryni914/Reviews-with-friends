import { createStore } from 'redux'

const initialState = {
    posts: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_POSTS':
            return {
                ...state,
                posts: [...state.posts, action.payload]
            }
    }



    return state
}

const store = createStore(reducer)

export default store