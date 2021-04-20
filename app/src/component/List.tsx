import React, { useState } from 'react';
import { FormControl, InputLabel, FilledInput, Button } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
import debounce from 'lodash/debounce';
import Repo from './Colum';
import styled from 'styled-components';
import './List.css';

interface ListType {
  name: String,
  language: String,
  html_url: String,
  created_at: String,
  description: String
}

interface RepoList {
  classes: Object,
}

const styles = () => ({
  ulList: {
    listStyleType: 'none',
    margin: '0',
    padding: '0'
  },
  content: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  formControl: {
    width: '100%'
  },
  form: {
    width: '70%'
  }
});

function List({ classes }: any) {
  const [username, setUserName] = useState('');
  const [repos, setRepos] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const displayRepos = () => {
    return repos.map((repo: any) => <Repo key={repo.name} column={repo} />);
  }

  const getRepos = debounce(() => {
    debugger;
    const repoUrl = `https://api.github.com/users/${username}/repos`;
    axios.get(repoUrl).then((responses) => {
      const repos = responses.data.map(({ name, language, html_url, created_at, description }: ListType) => {
        return { name, language, html_url, created_at, description };
      })
      setRepos(repos)
    }).catch(error => {
      console.log(`inside getrepos error: ${error}`)
      setErrorMessage(error.response.statusText)
    })
  })

  return (
    <div className={classes.content}>
      <form className={classes.formControl} noValidate autoComplete="off">
        <FormControl className={classes.form} variant="filled">
          <InputLabel htmlFor="component-filled" aria-label='description'>Github name</InputLabel>
          <FilledInput id="component-filled" value={username} placeholder="Enter your github username" onChange={handleChange} />
          <Button onClick={getRepos}>Get repos</Button>
          {(repos.length === 0) && <div>{errorMessage}</div>}
          {repos.length > 0 && <ul className={classes.ulList}>{displayRepos()}</ul>}
      </FormControl>
      </form>
    </div>
  );
}

export default withStyles(styles)(List);
