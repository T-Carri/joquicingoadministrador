
import './Sidebar.css';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">MyDash</h2>
      <nav>
        <a href="#"><FaHome /> Home</a>
        <a href="#"><FaUser /> Profile</a>
        <a href="#"><FaCog /> Settings</a>
      </nav>
    </div>
  );
}