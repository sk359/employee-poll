import { Link } from "react-router";

export function PageNotFound() {
  return (
    <div>        
        <div class="main-content">
          <h2>404 Error</h2>
          <p>The page you're looking for does not exist.</p>
          <div>
            <Link to="/login">Login</Link>
          </div>
        </div>
    </div>
  )
}