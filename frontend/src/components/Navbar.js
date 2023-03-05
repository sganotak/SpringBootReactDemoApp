import { Link } from "react-router-dom";



const  Navbar= () => {
    return ( <nav className="navbar navbar-expand-lg bg-body-tertiary ">
    <div className="container-fluid">
    <Link to="/" className="navbar-brand"><i className="bi bi-house-door-fill"></i></Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
          <Link to="/register" className="nav-link">User Registration</Link>
          </li>
          <li className="nav-item">
            <Link to="/users" className="nav-link">Display Users</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav> );
}
 
export default Navbar ;