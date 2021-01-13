import React from 'react';
import { useAuth0 } from '../utils/auth0context';
import { Button } from 'semantic-ui-react'

const LogoutButton = () => {
    const { logout} = useAuth0();

    return (
            <Button onClick={() => logout()}>
                Logout
            </Button>
        )
}

export default LogoutButton;


