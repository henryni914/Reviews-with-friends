// User "dispatches" exported here

export const setUser = (user) => ({
    type: 'SET_USER',
    payload: {
        id: user.id,
        email: user.email,
        name: user.name,
        // POSSIBLY MOVE BELOW TO DIFFERENT ACTION FUNCTIONS
        // picture: user.picture,
        // watchlist: user.watchlist, // need from DB
        // favorites: user.favorites, // need from DB
        // friends: user.favorites, // need from DB
    }
});

export const setUserReviews = (reviews) => ({
    type: 'SET_REVIEWS',
    payload: {
        userReviews: reviews
    }
});

export const setUserFavorites = (favorites) => ({
    type: 'SET_FAVORITES',
    payload: {
        userFavorites: favorites
    }
})

export const addUserFavorite = (movie) => ({
    type: 'ADD_FAVORITE',
    payload: {
        add: movie
    }
})