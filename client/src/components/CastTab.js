import React from 'react';
import { Grid, GridColumn, Image, List } from 'semantic-ui-react';

export default function CastTab(props) {
    // console.log('props', props.info)
    let castResults = props.info.cast;
    // console.log(castResults)

    function renderGrid() {
        let renderArr = [], columns = [];
        let count = 0;
        castResults.forEach(el => {
            if (count === 10 || count === castResults.length) {
                return renderArr;
            }
            let avatarUrl = "https://image.tmdb.org/t/p/original" + el.profile_path;
            let tmdbProfileUrl = "https://www.themoviedb.org/person/" + el.id + "?language=en-US";
            columns.push(
                <List.Item key={el.id} href={tmdbProfileUrl} target="_blank">
                    <Image avatar src={avatarUrl} rounded size='mini' alt={el.name} />
                    <List.Content>
                        <List.Header>{el.name}</List.Header>
                        <List.Description>as {el.character}</List.Description>
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
            <Grid columns='two' stackable rows={2}>
                {renderGrid()}
            </Grid>
        </>
    )
}