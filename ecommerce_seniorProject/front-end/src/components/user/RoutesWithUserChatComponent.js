import { Outlet } from "react-router-dom";
import UserChatComponent from "./UserChatComponent";

const RoutesWithUserChatComponent = () => {
  return (
    <div>
      <UserChatComponent />
      <Outlet />
    </div>
  );
};

export default RoutesWithUserChatComponent;
