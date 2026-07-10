import { House } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./HomeButton.css";

function HomeButton() {
  const navigate = useNavigate();

  return (
    <div
      className="home-button"
      onClick={() => navigate("/home")}
      style={{ cursor: "pointer" }}
    >
      <div className="home-button-content">
        <House size={24} color="white" strokeWidth={2.5} />
        <span>홈</span>
      </div>
    </div>
  );
}

export default HomeButton;