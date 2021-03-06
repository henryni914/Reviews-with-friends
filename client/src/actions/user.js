// User "dispatches" exported here

export const setUser = (user) => ({
    type: 'SET_USER',
    payload: {
        id: user.id,
        email: user.email,
        name: user.name,
        dateJoined: user.dateJoined,
        nickname: user.nickname
        // POSSIBLY MOVE BELOW TO DIFFERENT ACTION FUNCTIONS
        // picture: user.picture,
        // watchlist: user.watchlist, // need from DB
        // favorites: user.favorites, // need from DB
        // friends: user.favorites, // need from DB
    }
});

export const setNicknameAndJoin = (obj) => ({
    type: 'SET_NICKNAME_AND_DATE',
    payload: {
        dateJoined: obj.dateJoined,
        nickname: obj.nickname
    }
})

export const setNickname = (newNickname) => ({
    type: 'SET_NICKNAME',
    payload: {
        nickname: newNickname
    }
})

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
});

export const setUserWatchlist = (watchlist) => ({
    type: 'SET_WATCHLIST',
    payload: {
        userWatchlist: watchlist
    }
});

export const addUserFavorite = (movie) => ({
    type: 'ADD_FAVORITE',
    payload: {
        add: movie
    }
});

export const setUserLikedReviews = (arr) => ({
    type: 'SET_LIKED_REVIEWS',
    payload: {
        reviews: arr
    }
})

