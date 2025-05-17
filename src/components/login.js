import {useState } from 'react';

export default function Login() {
    const [formData, setFormData] = useState({ username: "", password: "" });

    function handleSubmit(event) {
      console.log("submit", event);
    }

    return(
        <div id="login-wrapper">  
        <form onSubmit={handleSubmit}>
            <div class="mb-3">
                <label for="userName" class="form-label">Email address</label>
                <input type="email" class="form-control" id="userName" aria-describedby="emailHelp" value={formData.username}/>    
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" value={formData.password}/>
            </div>  
            <button type="submit" class="btn btn-primary">Log In</button>
        </form>
        </div>
    )
}