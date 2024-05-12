import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import { useAppDispatch, useTypedSelector } from "../../../app/store";
import { setIsChatOpen, selectChatVisibility } from "../../../app/globalSlice";

import { useGetUserQuery } from "../../../app/services/user";
import useUserData from "../../../hooks/useUserData";

import ProfileFavorites from "./ProfileFavorites";
import ProfileContent from "./ProfileContent";
import ProfileChat from "./ProfileChat";
import AnimElement from "../../../components/AnimElement";

import { ProfileChatStatusCtx } from "../../../context";

export const ProfileContainer = () => {
  const dispatch = useAppDispatch();

  const isChatOpen = useTypedSelector(selectChatVisibility);
  const [isFavListOpen, setIsFavListOpen] = useState<boolean>(false);

  const location = useLocation();
  const userNickname = location.pathname.split("/")[2];

  const { nickname: me } = useUserData();
  const userData = useGetUserQuery(userNickname);

  useEffect(() => {
    if (me === userNickname) dispatch(setIsChatOpen(false));
  }, [userNickname, me]);

  const handleChatVisibility = () => dispatch(setIsChatOpen());

  const { data, isLoading, isFetching } = userData;

  if (isLoading || !data) {
    return null;
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
        isItMe={me === userNickname}
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
      <AnimElement
        isOpen={isChatOpen}
        style={{
          minWidth: "400px",
          height: "100%",
          position: "absolute",
          top: "0",
          right: "0",
        }}
      >
        <ProfileChat
          companionId={data.id}
          handleChatVisibility={handleChatVisibility}
        />
      </AnimElement>
    </div>
  );
};
