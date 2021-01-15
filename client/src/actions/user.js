// User "dispatches" exported here

export const setUser = (user) => ({
    type: 'SET_USER',
    payload: {
        // id: user.id, // need to grab id from DB? 
        email: user.email,
        nickname: user.nickname,
        picture: user.picture,
        watchlist: user.watchlist, // need from DB
        favorites: user.favorites, // need from DB
        friends: user.favorites, // need from DB
    }
})