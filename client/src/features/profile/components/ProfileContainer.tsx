import { useState } from "react";

import { useLocation } from "react-router-dom";

import { useGetUserQuery } from "../../../app/services/user";

import ProfileFavorites from "./ProfileFavorites";
import ProfileContent from "./ProfileContent";
import Loading from "../../../components/Loading";

export const ProfileContainer = () => {
  const [isFavListOpen, setIsFavListOpen] = useState<boolean>(false);

  const location = useLocation();
  const userNickname = location.pathname.split("/")[2];

  const userData = useGetUserQuery(userNickname);

  const { data, isLoading, isFetching } = userData;

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "inherit",
        position: "relative",
      }}
    >
      <ProfileFavorites
        userId={data.id}
        isFavListOpen={isFavListOpen}
        handleFavList={() => setIsFavListOpen((prevState) => !prevState)}
      />

      <ProfileContent
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        handleFavList={() => setIsFavListOpen((prevState) => !prevState)}
      />
    </div>
  );
};
