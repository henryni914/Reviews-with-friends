import React from 'react';
import { Button, Card, Icon, Image, Tab } from 'semantic-ui-react'

export default function TabPane(props) {
    // console.log(props)

    return (

        <Tab.Pane attached={false}>
            <Card.Group itemsPerRow={3}>
                <Card >
                    <Image
                        size='medium'
                    // src={el.Movie.image}
                    />
                    <Button animated='fade' >
                        <Button.Content visible><Icon name='trash alternate outline' /></Button.Content>
                        <Button.Content hidden>Remove</Button.Content>
                    </Button>
                    <Button animated='fade'  >
                        <Button.Content visible><Icon name='trash alternate outline' /></Button.Content>
                        <Button.Content hidden>Remove</Button.Content>
                    </Button>
                </Card>
                {/* {favorites.length === 0 ? <h3>Add some movies to your watchlist, by clicking the add to watchlist button on the movie page.</h3>
                    : favorites.map(el => (

                    ))
                } */}
            </Card.Group>
        </Tab.Pane>
    )
}