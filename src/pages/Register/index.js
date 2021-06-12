// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { Link, useHistory } from 'react-router-dom';
// import routes from '../../Components/routes';
// // import withAuth from '../../HOC/withAuth';
// import { register } from '../../Components/redux/auth/operations';

// const Register = () => {
//   //   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   //   const [rePassword, setRePassword] = useState('');
//   //   const [passwordValid, setPasswordValid] = useState('');
//   const dispatch = useDispatch();
//   const history = useHistory();
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
//     //   if (
//     //     emailValid(email) &&
//     //     password.length >= 4 &&
//     //     username.length > 0 &&
//     //     password === rePassword
//     //   ) {
//     dispatch(register({ email, password }, history));
//     //   } else {
//     //     switch (true) {
//     //       case !emailValid(email):
//     //         return notification({
//     //           type: 'warning',
//     //           message: 'Email is not valid!',
//     //         });
//     //       case password.length < 4:
//     //         return notification({
//     //           type: 'warning',
//     //           message: 'Password is to short!',
//     //         });
//     //       case password !== rePassword:
//     //         return notification({
//     //           type: 'warning',
//     //           message: 'Passwords did not match',
//     //         });
//     //       case username.length > 0:
//     //         return notification({
//     //           type: 'warning',
//     //           message: 'Enter a name',
//     //         });
//     //     }
//     //   }
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         <input
//           className="input"
//           //   className={styles.EmailForm}
//           type="email"
//           name="email"
//           value={email}
//           placeholder="E-mail"
//           autoFocus
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         <input
//           //   className={styles.PassForm}
//           type="password"
//           name="password"
//           value={password}
//           placeholder="Пароль"
//           onChange={handleChange}
//         />
//       </label>
//       <button type="submit">РЕГИСТРАЦИЯ</button>
//       <button>
//         <Link to={routes.LOGIN.path}>Сторінка Входу</Link>
//       </button>
//     </form>
//   );
// };

// // export default withAuth(Register);
// export default Register;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import routes from '../../Components/routes';
// import withAuth from '../../HOC/withAuth';
import { register } from '../../Components/redux/auth/operations';
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();
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
    const regExp =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = regExp.test(email);
    console.log(isValid);
    if (isValid && password.length >= 4) {
      dispatch(register({ email, password }, history));
    } else {
      alert('email або password не є валідними');
    }
    //   } else {
    //     switch (true) {
    //       case !emailValid(email):
    //         return notification({
    //           type: 'warning',
    //           message: 'Email is not valid!',
    //         });
    //       case password.length < 4:
    //         return notification({
    //           type: 'warning',
    //           message: 'Password is to short!',
    //         });
    //       case password !== rePassword:
    //         return notification({
    //           type: 'warning',
    //           message: 'Passwords did not match',
    //         });
    //       case username.length > 0:
    //         return notification({
    //           type: 'warning',
    //           message: 'Enter a name',
    //         });
    //     }
    //   }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>EzT</Avatar>
        <Typography component="h1" variant="h5">
          Сторінка Реєстрації
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="Name"
                label="Name"
                autoFocus
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Зареєструватися
          </Button>
          <Grid container>
            <Grid item>
              <Link to={routes.LOGIN.path} variant="body2">
                Вже маєте аккаунт? Ввійти
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
