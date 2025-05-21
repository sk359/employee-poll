import {useEffect } from 'react';
import { Link } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router";
import { selectUser, logout } from '../reducers/login';
import { loadStatusSelector } from '../reducers/poll';


export function MenuBar() {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const loadStatus = useSelector(loadStatusSelector);
    const dispatch = useDispatch();        

    useEffect( () => {
      // Navigate to Log In page if no user is authenticated
      if (user === null) {        
        navigate("/");
      }
    }, [user])

    function onLogout() {      
      dispatch(logout()); 
    }

    function isLoading() {
      return loadStatus === 'loading';
    }

    return (
        <div id="app-menu-bar">
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">    
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item" style={{marginRight: "15px"}}>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li class="nav-item" style={{marginRight: "15px"}}>
                      <Link to="/add">Create Poll</Link>
                    </li>    
                    <li class="nav-item" style={{marginRight: "15px"}}>
                      <Link to="/leaderboard">Leaderboard</Link>
                    </li>   
                    {isLoading() ? <li><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></li> : null}     
                    <li id="menubar-user-icon" class="nav-item btn-group dropstart" style={{padding: "15px"}}>
                      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"><FontAwesomeIcon icon="user" /></a>
                      
                      <ul class="dropdown-menu" style={{padding: '5px'}}>
                        <li><div style={{textAlign:'center', width:'100%'}}>{user?.id}</div></li>
                        <li><hr/></li>
                        <li><button style={{borderRadius:0, width:'100%'}} type="button" class="btn btn-primary" onClick={onLogout} >Log out</button></li>
                    </ul>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
        </div>
    ) 

}