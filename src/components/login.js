import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, selectUser, loadUsersFromFile, selectUserList } from '../reducers/login';
import { useNavigate } from "react-router";



export default function Login() {
    const navigate = useNavigate();
    // The selector will be run whenever the function component renders
    // useSelector() will also subscribe to the Redux store, and run your selector whenever an action is dispatched.
    // Each call to useSelector() creates an individual subscription to the Redux store
    const authenticatedUser = useSelector(selectUser);
    const users = useSelector(selectUserList);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ username: "", password: "" });    
    
    useEffect( () => {
        // Load list of users on initial rendering:        
        dispatch(loadUsersFromFile());
    }, [])

    useEffect( () => {
        // Triggered after the user in the store was changed:        
        if (authenticatedUser !== null) {          
          navigate("/dashboard");
        }
    }, [authenticatedUser])

    function handleSubmit(event) {
        event.preventDefault(); // prevent page refresh on submit      
      const user = getUserForCredentials(formData.username, formData.password);      
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
      <div style={{height: '100%', textAlign: 'center', padding: '20px'}}>
        <h2>Employee Poll</h2>   
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
        </div>
    )
}