import { Dispatch, SetStateAction } from "react";

import Picker, { EmojiClickData } from "emoji-picker-react";
import AnimElement from "../../components/AnimElement";
import Icon from "../../components/Icon";

import useClickOutside from "../../hooks/useClickOutside";

import IcEmoji from "../../assets/icons/emoji.svg";

import styles from "./ChatEmoji.module.scss";

const ChatEmoji = ({
  setMessage,
}: {
  setMessage: Dispatch<SetStateAction<string>>;
}) => {
  const { ref, isVisible, setIsVisible } = useClickOutside();

  const onEmojiClick = (emojiObject: EmojiClickData) => {
    console.log(emojiObject.emoji);

    setMessage((message) => message + emojiObject.emoji);
    setIsVisible(false);
  };

  return (
    <>
      <div
        ref={ref}
        className={styles.chatEmojiIcon}
        onClick={() => setIsVisible(true)}
      >
        <Icon src={IcEmoji} alt="Emoji" />
      </div>
      <AnimElement
        isOpen={isVisible}
        style={{ position: "absolute", bottom: "calc(100% + 10px)", right: 0 }}
      >
        <Picker onEmojiClick={onEmojiClick} />
      </AnimElement>
    </>
  );
};

export default ChatEmoji;
