// pages/DashboardPage.tsx

import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/auth/authSlice";

export default function DashboardPage() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!user) {
    // teoretic nu se ajunge aici datorită ProtectedRoute, dar ne asigurăm
    return <p>Se încarcă...</p>;
  }

  return (
    <div className="dashboard-container">
      <div className="user-card">
        {user.avatarUrl && (
          <img
            src={user.avatarUrl}
            alt={user.name}
            width={64}
            height={64}
            style={{ borderRadius: "50%" }}
          />
        )}
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p style={{ fontSize: 12, color: "#888" }}>ID: {user.id}</p>
      </div>

      <button onClick={handleLogout}>Deconectare</button>
    </div>
  );
}