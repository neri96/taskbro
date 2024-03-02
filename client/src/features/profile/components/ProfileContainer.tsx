import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import { useGetUserQuery } from "../../../app/services/user";
import useUserData from "../../../hooks/useUserData";

import ProfileFavorites from "./ProfileFavorites";
import ProfileContent from "./ProfileContent";
import ProfileChat from "./ProfileChat";
import Loading from "../../../components/Loading";

import { ProfileChatStatusCtx } from "../../../context";

export const ProfileContainer = () => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isFavListOpen, setIsFavListOpen] = useState<boolean>(false);

  const location = useLocation();
  const userNickname = location.pathname.split("/")[2];

  const { nickname: me } = useUserData();
  const userData = useGetUserQuery(userNickname);

  useEffect(() => {
    if (me === userNickname) setIsChatOpen(false);
  }, [userNickname, me]);

  const handleChatVisibility = () => setIsChatOpen((prevState) => !prevState);

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
      <ProfileChatStatusCtx.Provider
        value={{
          handleChatVisibility,
        }}
      >
        <ProfileContent
          data={data}
          isLoading={isLoading}
          isFetching={isFetching}
          handleFavList={() => setIsFavListOpen((prevState) => !prevState)}
        />
      </ProfileChatStatusCtx.Provider>
      <ProfileChat
        isChatOpen={isChatOpen}
        companionId={data.id}
        handleChatVisibility={handleChatVisibility}
      />
    </div>
  );
};
