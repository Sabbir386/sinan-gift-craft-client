import { useAppDispatch, useAppSelector } from "../redux/features/hooks";
import { logOut, useCurrentToken } from "../redux/features/auth/authSlice";
import { Navigate, useLocation } from "react-router-dom";
import { verifyToken } from "../utils/verifyToken";
const ProtectedRoutes = ({ children }) => {
  const token = useAppSelector(useCurrentToken);
  const location = useLocation();
  let user;
  if (token) {
    user = verifyToken(token);
  }
  const dispatch = useAppDispatch();
  if (!token && location.pathname !== "/login") {
    return <Navigate to="/login" replace={true} />;
  }
  if (token && location.pathname === "/login") {
    return <Navigate to="/dashboard" replace={true} />;
  }
  return children;
};
export default ProtectedRoutes;
