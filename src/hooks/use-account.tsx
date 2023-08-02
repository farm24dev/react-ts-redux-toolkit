import { useNavigate } from "react-router-dom";
import { selecteAuthState } from "../redux-toolkit/auth/auth-slice";
import { useAppSelector } from "../redux-toolkit/hook";
import { logout } from "../services/auth.service";

export const useAccount = () => {
  const { account } = useAppSelector(selecteAuthState);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return { account, handleLogout };
};
