// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useHistory, Link } from 'react-router-dom';
// import { logIn } from '../../Components/redux/auth/operations';
// import routes from '../../Components/routes';

// export default function Login() {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const handleChange = (e) => {
//     switch (e.target.name) {
//       case 'email':
//         return setEmail(e.target.value);
//       case 'password':
//         return setPassword(e.target.value);
//     }
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(logIn({ email, password }, history));
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         <input
//           type="email"
//           value={email}
//           onChange={handleChange}
//           name="email"
//           placeholder="E-mail"
//           autocomplete="off"
//         />
//       </label>
//       <label>
//         <input
//           type="password"
//           value={password}
//           onChange={handleChange}
//           name="password"
//           placeholder="Пароль"
//           autocomplete="off"
//         />
//       </label>
//       <button type="submit">ВХОД</button>
//       <button>
//         <Link to={routes.REGISTER.path}>Сторінка Реєстрації</Link>
//       </button>
//     </form>
//   );
// }

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { logIn } from '../../Components/redux/auth/operations';
import routes from '../../Components/routes';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleChange = (e) => {
    switch (e.target.name) {
      case 'email':
        return setEmail(e.target.value);
      case 'password':
        return setPassword(e.target.value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.length < 1 || password.length < 1) {
      alert('Ви не заповнили всі поля!');
    } else {
      dispatch(logIn({ email, password }, history));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>EzT</Avatar>
        <Typography component="h1" variant="h5">
          Вхід в обліковий запис
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            value={email}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={password}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to={routes.REGISTER.path} variant="body2">
                {'Ще не маєте аккаунту? Зареєструватися'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
