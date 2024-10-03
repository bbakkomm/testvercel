import { NavLink } from "react-router-dom";

// icon
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import AddIcon from '@mui/icons-material/Add';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

function Nav(props) {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? "nav__linkOn" : "nav__link")}
          >
            <HomeOutlinedIcon/>
            <p className="nav__btn">홈</p>
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/study"
            className={({ isActive }) => (isActive ? "nav__linkOn" : "nav__link")}
          >
            <MenuBookOutlinedIcon />
            <p className="nav__btn">스터디</p>
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/studycreation"
            className={({ isActive }) => (isActive ? "nav__linkOn" : "nav__link")}
          >
            <AddIcon />
            <p className="nav__btn">스터디 생성</p>
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? "nav__linkOn" : "nav__link")}>
            <PersonOutlineOutlinedIcon />
            <p className="nav__btn">마이</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;