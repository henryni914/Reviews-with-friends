import React, { useEffect, useState } from 'react';
import { Button, Card, Icon, Image, Tab } from 'semantic-ui-react'

export default function TabPane(props) {
    console.log(props)

    const [movies, setMovies] = useState([])
    const [tab, setTab] = useState('watchlist')

    useEffect(() => {
        if (tab === 'watchlist') {
            setTab('watchlist')
            setMovies(props.movies)
        } else {
            setTab('completed')
            setMovies(props.movies)
        }

        console.log(tab)
    }, [tab])

    function addToCompleted() {
        // API update function grabbing the watchlist Db ID and setting completed: true
    }

    return (

        <Tab.Pane attached={false}>
            <Card.Group itemsPerRow={3}>
                {
                    movies.length === 0 ? <h3>Add some movies to your watchlist, by clicking the add to watchlist button on the movie page.</h3>
                        :
                        movies.map(el => (
                            <Card >
                                <Image
                                    size='medium'
                                    src={el.Movie.image}
                                />
                                {tab === 'watchlist' && (
                                    <>
                                        <Button content='Add to finished' labelPosition='left' icon='edit' primary />
                                        <Button content='Remove' labelPosition='left' icon='edit' primary />
                                    </>
                                )}

                                {tab === 'completed' && (
                                    <>
                                        <Button content='Move back to incomplete' labelPosition='left' icon='edit' primary />
                                        <Button content='Remove' labelPosition='left' icon='edit' primary />
                                    </>
                                )}

                                {/* <Button animated='fade' >
                                <Button.Content visible><Icon name='trash alternate outline' /></Button.Content>
                                <Button.Content hidden>Remove</Button.Content>
                            </Button>
                            <Button animated='fade'  >
                                <Button.Content visible><Icon name='trash alternate outline' /></Button.Content>
                                <Button.Content hidden>Remove</Button.Content>
                            </Button> */}
                            </Card>
                        ))
                }
            </Card.Group>
        </Tab.Pane>
    )
}