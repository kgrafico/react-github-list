import React, { useState } from 'react';
import { FormControl, Button, TextField } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
import debounce from 'lodash/debounce';
import Repo from './Column';

interface ListType {
  name: String,
  forks: String,
  stargazers_count: String,
  html_url: String,}

const styles = () => ({
  ulList: {
    listStyleType: 'none',
    margin: '0',
    padding: '0',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr'
  },
  content: {
    padding: '10px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  formControl: {
    width: '100%'
  },
  form: {
    width: '70%'
  },
});

function List({ classes }: any) {
  const [username, setUserName] = useState('');
  const [repos, setRepos] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorMessage, setshowErrorMessage] = useState(false);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const displayRepos = () => {
    return repos.map((repo: any) => <Repo key={repo.name} column={repo} />);
  }

  const getRepos = debounce(() => {
    const repoUrl = `https://api.github.com/users/${username}/repos?page=${page}&per_page=10`;
    const getNumRepo = `https://api.github.com/users/${username}`;


    if (username === '') { setErrorMessage('You should add a correct github name'); setshowErrorMessage(true); return}

    axios.get(getNumRepo).then((responses) => {
      setCount(Math.ceil(responses.data["public_repos"]/10))
    }).catch(error => {
      console.log(`inside getrepos error: ${error}`)
      setErrorMessage(error.response.statusText);
      setshowErrorMessage(true);
    })
    axios.get(repoUrl).then((responses) => {
      const repos = responses.data.map(({ name, html_url, forks, stargazers_count }: ListType) => {
        return { name, html_url, forks, stargazers_count };
      })
      setRepos(repos);
      setErrorMessage('');
      setshowErrorMessage(false);
    }).catch(error => {
      console.log(`inside getrepos error: ${error}`)
      setErrorMessage(error.response.statusText);
      setshowErrorMessage(true);
    })
  })

  return (
    <div className={classes.content}>
      <form className={classes.formControl} noValidate autoComplete="off">
        <FormControl className={classes.form} variant="filled">
          <TextField aria-label='github name input' error={showErrorMessage} id="filled-basic" label="Github Name" variant="filled" helperText={errorMessage} value={username} placeholder="Enter your github username" onChange={handleChange}  />
          <Button onClick={getRepos}>Get repos</Button>
        </FormControl>
          {repos.length > 0 && <ul className={classes.ulList}>{displayRepos()}</ul>}
          {repos.length > 0 && <Pagination count={count} variant="outlined" color="primary" onChange={(e, p)=>{setPage(p); getRepos()}}/>}
      </form>
    </div>
  );
}

export default withStyles(styles)(List);
