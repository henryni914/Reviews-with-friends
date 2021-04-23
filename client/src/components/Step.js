import React from 'react';
import { Button, Container, Grid, Icon, Step } from 'semantic-ui-react';
import { useAuth0 } from '../utils/auth0context';

export default function StepSection() {

    const { loginWithRedirect } = useAuth0();

    return (
        <Container>
            <Grid>
                <Grid.Column textAlign='center'>
                <Step.Group stackable fluid widths={3} size='large'>
                <Step >
                    <Icon name='user outline' />
                    <Step.Content>
                        <Step.Title>First Step</Step.Title>
                        <Step.Description> </Step.Description>
                        <Button onClick={() => loginWithRedirect()} icon>
                        <Icon name='user circle outline' />
                        {" Register or login"}
                        </Button>
                    </Step.Content>
                </Step>
                <Step >
                    <Icon name='search' />
                    <Step.Content>
                        <Step.Title>Explore</Step.Title>
                        <Step.Description>Search, browse, like and review movies & posts.</Step.Description>
                    </Step.Content>
                </Step>
                <Step >
                    <Icon name='edit outline' />
                    <Step.Content>
                        <Step.Title>Customize & Edit</Step.Title>
                        <Step.Description>Visit your profile page to manage your activity.</Step.Description>
                    </Step.Content>
                </Step>
            </Step.Group>
                </Grid.Column>
            </Grid>
        </Container>
    )
}