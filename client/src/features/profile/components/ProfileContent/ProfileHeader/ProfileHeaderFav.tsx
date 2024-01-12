import { useState, useEffect } from "react";

import { isMobile } from "react-device-detect";

import Icon from "../../../../../components/Icon";

import IcPlus from "../../../../../assets/icons/plus.svg";
import IcUnfollow from "../../../../../assets/icons/unfollow.svg";

import { useModifyFavListMutation } from "../../../../../app/services/user";

import useUserData from "../../../../../hooks/useUserData";

const ProfileHeaderFav = ({ userId: favId }: { userId: string }) => {
  const [isFav, setIsFav] = useState<boolean>(false);

  const { id: myId, favorites } = useUserData() || {};

  const [favModify] = useModifyFavListMutation();

  useEffect(() => {
    const favFound = favorites?.find(
      (fav: { id: string; name: string }) => fav.id === favId
    );

    if (favFound && !isFav) {
      setIsFav(true);
    } else if (!favFound && isFav) {
      setIsFav(false);
    }
  }, [favorites, favId]);

  return (
    <Icon
      src={isFav ? IcUnfollow : IcPlus}
      alt={`${isFav ? "Remove from" : "Add to"} favorites`}
      style={{ height: isMobile ? "40px" : "50px" }}
      handleClick={() => favModify({ userId: myId, favId })}
    />
  );
};

export default ProfileHeaderFav;
