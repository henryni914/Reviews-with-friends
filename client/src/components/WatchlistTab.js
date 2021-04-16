import React, { useEffect, useState } from 'react';
import { Button, Card, Icon, Image, Tab } from 'semantic-ui-react'

export default function TabPane(props) {
    console.log(props)

    const [movies, setMovies] = useState([])
    const [tab, setTab] = useState(props.tab)

    // useEffect(() => {
    //     if (tab === 'watchlist') {
    //         setTab('watchlist')
    //         setMovies(props.movies)
    //         console.log(tab)
    //         console.log(movies)
    //     } else {
    //         setTab('completed')
    //         setMovies(props.movies)
    //         console.log(tab)
    //         console.log(movies)
    //     }

    //     // console.log(tab)
    // }, [])

    function addToCompleted() {
        // API update function grabbing the watchlist Db ID and setting completed: true
    }

    return (

        <Card.Group itemsPerRow={3}>
            {
                props.movies.length === 0 && props.tab === 'watchlist' ? <h3>Add some movies to your watchlist, by clicking the add to watchlist button on the movie page.</h3>
                    : props.movies.length === 0 && props.tab === 'completed' ? <h3>Add movies to completed by click the complete button under the watchlist tab </h3> 
                    :
                    props.movies.map(el => (
                        <Card >
                            <Image
                                size='medium'
                                src={el.Movie.image}
                            />
                            {props.tab === 'watchlist' && (
                                <>
                                    <Button content='Add to finished' labelPosition='left' icon='edit' primary />
                                    <Button content='Remove' labelPosition='left' icon='edit' primary />
                                </>
                            )}

                            {props.tab === 'completed' && (
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
    )
}