import React, { useEffect } from 'react';
import { Grid, GridColumn, Image, List } from 'semantic-ui-react';

export default function CastTab(props) {
    console.log('props', props.info)
    let castResults = props.info.cast;


    function renderGrid() {
        let renderArr = [], columns = [];
        let count = 0;
        castResults.forEach(el => {
            if (count === 10) {
                return renderArr;
            }
            let avatarUrl = "https://image.tmdb.org/t/p/original" + el.profile_path
            columns.push(
                <List.Item>
                    <Image avatar src={avatarUrl} rounded size='mini' />
                    <List.Content>
                        <List.Header>{el.name}</List.Header>
                        <List.Description>{el.character}</List.Description>
                    </List.Content>
                </List.Item>
            );
            if (columns.length % 5 === 0) {
                renderArr.push(
                    <GridColumn>
                        <List animated verticalAlign='middle' selection>
                            {columns}
                        </List>
                    </GridColumn>
                );
                columns = [];
            }
            count++
        });
        return renderArr;
    };

    return (
        <>

            <Grid columns='two' stackable>
                {renderGrid()}
            </Grid>
        </>
    )
}