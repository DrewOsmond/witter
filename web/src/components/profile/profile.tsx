import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Profile = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  //add this logic next
  //const profile = useAppSelector((state) => state.profile);
  const user = pathname.slice(1);

  useEffect(() => {}, []);

  return <div>{user}</div>;
};

export default Profile;
