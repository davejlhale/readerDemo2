import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/NavigateBackButton.css";

interface ExitButtonProps {
  fallbackRoute?: string;
  label?: string;
}
export function NavigateBackButton({
  fallbackRoute = "",
  label = "X",
}: ExitButtonProps) {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(fallbackRoute);
  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate(fallbackRoute);
    }
  };
  return (
    <button className="navigate-back-button scaler-cap" onClick={handleBack}>
      {label}
    </button>
  );
}
