import { Link, useLocation } from 'react-router-dom';
import '../index.css'; 

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="navbar-container">
      <ul className="navbar">
        <li>
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'active' : ''}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/transaction" 
            className={location.pathname === '/transaction' ? 'active' : ''}
          >
            Transactions
          </Link>
        </li>
        <li>
          <Link 
            to="/dashboard" 
            className={location.pathname === '/dashboard' ? 'active' : ''}
          >
            Dashboard
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;