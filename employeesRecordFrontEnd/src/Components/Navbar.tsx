import { Link } from "react-router-dom";
 import "../StyleSheets/NavbarSS.css";
const Navbar = () => {
    return ( 
<div className="topnav">
    <Link className="navbar__links" to="/">Employees</Link>
    <Link className="navbar__links" to="/departsments">Departments</Link>

  {/* <a className="active" href="#home">Home</a> */}
  <a href="#news">News</a>
  <a href="#contact">Contact</a>
  <a href="#about">About</a>
</div>

     );
}
 
export default Navbar;