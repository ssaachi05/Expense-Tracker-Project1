import { Link } from 'react-router-dom';
import '../index.css'; 

const Navbar = () => {
  return (
    <div className="navbar-container">
      <ul className="navbar">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/transaction">Transactions</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
      </ul>
    </div>
  );
};

export default Navbar;