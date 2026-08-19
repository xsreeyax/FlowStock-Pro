import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("loginMessage");

    navigate("/login");
  };

  return (
    <header>
      <h2>FlowStock Pro</h2>

      <div>
        <span>Admin</span>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;