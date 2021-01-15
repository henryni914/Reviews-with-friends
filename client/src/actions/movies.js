export const setTopFive = (movies) => ({
    type: 'SET_TOPFIVE',
    payload: {
        topFive: movies
    }
})