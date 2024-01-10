import { useNavigate } from "react-router-dom";

import { useLogOutMutation } from "../../app/services/auth";
import { useAppDispatch } from "../../app/store";

import { logOut } from "../../features/auth/authSlice";

import Icon from "../Icon";

import IcLogout from "../../assets/icons/logout.svg";

const LogOut = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [logOutMut] = useLogOutMutation();

  const handleLogOut = async () => {
    try {
      await logOutMut({}).unwrap();

      dispatch(logOut());
      navigate("/auth");
    } catch (error) {
      throw error;
    }
  };

  return <Icon src={IcLogout} alt="log out" handleClick={handleLogOut} />;
};

export default LogOut;
