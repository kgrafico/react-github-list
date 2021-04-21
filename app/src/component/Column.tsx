import React from 'react';
import { withStyles } from "@material-ui/core/styles";

interface List {
    column: Items,
    classes: any
}


interface Items {
  name: String,
  forks: String,
  html_url: String,
  stargazers_count: String
}

const styles = () => ({
  liList: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    fontSize: 'small',
    margin: '15px',
    padding: '10px',
    border: '0.7px solid white',
    color: 'white'
  },
});

const Column = ({ column: { name, html_url, forks, stargazers_count }, classes }: List) => {
    return (
        <React.Fragment>
            <a href={`${html_url}`} className={classes.liList}>
              <li>
                <div>{name}</div>
                <div>forks: {forks}</div>
                <div>Stars: {stargazers_count}</div>
              </li>
            </a>
        </React.Fragment>
    )
}
export default withStyles(styles)(Column);
