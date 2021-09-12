import React from 'react';
import {
  Typography,
  makeStyles,
  Container,
  Link } from '@material-ui/core';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/ebs-universe">
        Embedded Bootstraps
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    textAlign: "center",
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body1">Powered by {' '}
          <Link color="inherit" href="https://github.com/chintal/ebs-linuxnode-netconfig">
            ebs-iot-netconfig
          </Link>
        </Typography>
        <Copyright />
      </Container>
    </footer>
  );
}
