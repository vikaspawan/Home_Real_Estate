import React from 'react'
import logo from '../img/logo.jpg'
import '../App.css'
import { Link, useLocation, useNavigate } from "react-router-dom";

// Navbar of Application
function Navbar() {

    // use for navigating one page to another
    let navigate = useNavigate();

    // This hook returns the location object used by the react-router
    let location = useLocation();

    // function for handle logout(logout button)
    const handleOnclick = () => {
        // remove authtoken from local storage and redirect it
        localStorage.removeItem('token');
        // navigate user to login page
        navigate("/");
    }

    //  function for navigating user to dashboard (user button)
    const handleOnclickUser = () => {

        // getting userType from local storage
        let user = localStorage.getItem('userType');
        let url = `/${user}/dashboard`;
        // navigating to dashboard
        navigate(url)
    }

    // handling complaint button
    const handleComplaintOnclick = () => {
        // navigating to complaint
        navigate('/complaint')
    }
    return (
        // className={`navbar fixed-position-navbar navbar-expand-lg navbar navbar-dark bg-dark`}
        // className="navbar fixed-position-navbar navbar-expand-lg navbar navbar-light" style={{backgroundColor: "rgba(40,57,101,.9)" , color:"white"}}
        <nav className={`navbar fixed-position-navbar navbar-expand-lg navbar navbar-dark bg-dark`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={{color : 'white'} }>
                    <img src={logo} alt="" width="50" height="30" className="d-inline-block align-text-top" />
                    HomeBazzar
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" ></span>
                </button>
                <div className="collapse navbar-collapse navbar-inverse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ""} navbarLink`} aria-current="page" to="/" style={{color : 'white'} }>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ""} navbarLink`} aria-current="page" to="/about" style={{color : 'white'} }>
                                About
                            </Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? <div className="d-flex">
                        <div className="dropdown">
                            <Link className="btn btn-primary dropdown-toggle" to="/" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                SignUp
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <li><Link className="dropdown-item" to={'/buyersignup'}>As a Buyer</Link></li>
                                <li><Link className="dropdown-item" to={'/sellersignup'}>As a Seller</Link></li>
                                <li><Link className="dropdown-item" to={'/agentsignup'}>As a Agent</Link></li>
                            </ul>
                        </div>
                        <Link className="btn btn-primary mx-1" to={'/login'} role="button" aria-disabled="true">Login</Link >
                    </div> : <div className='d-flex'>
                        <button className="btn btn-primary mx-3" style={{ paddingTop: "0px", paddingBottom: "0px" }} onClick={handleComplaintOnclick} role="button" aria-disabled="true">Complaint</button>
                        <button className="btn btn-primary mx-3" style={{ paddingTop: "0px", paddingBottom: "0px" }} onClick={handleOnclick} role="button" aria-disabled="true">Logout</button>
                        <button className="btn mx-3" onClick={handleOnclickUser} role="button" aria-disabled="true"><i className="fa-solid fa-circle-user navbarLink" style={{ fontSize: "25px" , backgroundColor: 'white' }}></i></button>
                    </div>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar