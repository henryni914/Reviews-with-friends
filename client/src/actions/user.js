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
})