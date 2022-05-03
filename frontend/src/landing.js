import { Button, Card, CardContent, CardHeader, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Auth from './utils/Auth';

const useStyles = makeStyles({
  landingCard: {
    justifyContent: 'center',
  },
  cardcontent: {
    marginLeft: 20,
    marginRight: 20,
  },
});

const Landing = () => {
  const history = useHistory();
  const classes = useStyles();
  if (Auth.loggedIn()) {
    if (Auth.isdoctor()) return <Redirect to='/doctor/home' />;
    else return <Redirect to='/patient/home' />;
  }
  return (
    <div className='container'>
      <Card>
        <CardHeader title='MediCare' />
        <CardContent className={classes.cardcontent}>
          <Stack direction='row' spacing={2}>
            <Button
              variant='contained'
              onClick={(e) => {
                history.push('/patient/login/');
              }}
            >
              Patient
            </Button>
            <Button
              variant='contained'
              onClick={(e) => {
                history.push('/doctor/login/');
              }}
            >
              Doctor
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
};

export default Landing;
