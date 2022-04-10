import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import MainPost from './MainPost';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const mainFeaturedPost = {
  title: 'Dobro došli u Rent a Car agenciju!',
  description:
    "Veliki izbor automobila za izdavanje.",
  image: 'https://images.unsplash.com/photo-1498354136128-58f790194fa7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  imgText: 'main image description',
};

export default function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <MainPost post={mainFeaturedPost} />
        </main>
        <div>Sve po vašoj meri!</div>
      </Container>
    </React.Fragment>
  );
}