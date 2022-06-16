import { useParams } from "react-router-dom";

type UserProfileParams = {
  username: string;
};

export const UserProfile = () => {
  const params = useParams<UserProfileParams>();

  return (
    <>
      <h1>{params.username}</h1>
    </>
  );
};
