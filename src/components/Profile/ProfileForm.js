import { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const history = useHistory();
  const newPasswordRef = useRef();
   const authCtx = useContext(AuthContext);

  const submitHandler = e => {
    e.preventDefault();
    const enteredPassword = newPasswordRef.current.value;

    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDea_hiIcdffAEE5S9VMAK7ebQEfYiQVHY`, {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredPassword,
        returnSecureToken: false,
      }),
      headers: {
        'Content-Type':'application/json',
      }
    }).then(res => {
      history.replace('/')
    })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='6' ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
