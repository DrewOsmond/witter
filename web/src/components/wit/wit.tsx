import { useLocation } from "react-router-dom";

export const SelectedWit = () => {
  const location = useLocation();
  const { wit } = location.state;
  console.log(wit);
  return <div>{wit.content}</div>;
};
