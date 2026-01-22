import "./Header.css";

import LogoutIcon from "@mui/icons-material/Logout";

export default function Header({}) {
  return (
    <header className="header-container">
      <div className="header-btn-icon header-btn-logout-icon">
        <LogoutIcon />
      </div>
    </header>
  );
}
