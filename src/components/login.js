import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { _getUsers } from '../_DATA';
import { login, selectUser } from '../reducers/login';
import { useNavigate } from "react-router";


let users = [];


export default function Login() {
    const navigate = useNavigate();
    // The selector will be run whenever the function component renders
    // useSelector() will also subscribe to the Redux store, and run your selector whenever an action is dispatched.
    // Each call to useSelector() creates an individual subscription to the Redux store
    const authenticatedUser = useSelector(selectUser);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ username: "", password: "" });

    async function loadUsers() {
        const usersObject = await _getUsers();
        users = Object.values(usersObject);
        console.log("users", users);
    }
    
    useEffect( () => {
        // Load list of users on initial rendering:
        loadUsers();
    }, [])

    useEffect( () => {
        // Triggered after the user in the store was changed:
        console.log("ath changed", authenticatedUser);
        if (authenticatedUser !== null) {
          console.log("effect user", authenticatedUser);
          navigate("/dashboard");
        }
    }, [authenticatedUser])

    function handleSubmit(event) {
        event.preventDefault(); // prevent page refresh on submit
      console.log("submit", event);
      const user = getUserForCredentials(formData.username, formData.password);
      console.log("submit user", user);
      if (user === null) {
        console.log("not valid");
      }
      dispatch(login(user)); // update store with authenticated user, user = payload of the action
    }

    function getUserForCredentials(username, password) {
      for (const user of users) {
        if (user.id === username && user.password === password) {
            return user;
        }
      }
      return null;
    }

    function changeUser(event) {
      setFormData({...formData, username: event.target.value});
    }

    function changePassword(event) {
      setFormData({...formData, password: event.target.value});
    }

    return(
        <div id="login-wrapper">          
        <form onSubmit={handleSubmit}>
            <div class="mb-3">
                <label for="userName" class="form-label">User</label>
                <input type="text" class="form-control" id="userName" onChange={changeUser} value={formData.username}/>    
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" onChange={changePassword} id="exampleInputPassword1" value={formData.password}/>
            </div>  
            <button type="submit" class="btn btn-primary">Log In</button>
        </form>
        </div>
    )
}