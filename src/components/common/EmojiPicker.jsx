import { Box, Typography } from "@mui/material";
import Picker from "@emoji-mart/react";
import React, { useEffect, useState } from "react";

const EmojiPicker = (props) => {
  const [selectedEmoji, setSelectedEmoji] = useState();
  const [isShowPicker, setIsShowPicker] = useState(false);

  useEffect(() => {
    setSelectedEmoji(props.icon);
  }, [props.icon]);

  const showPicker = () => setIsShowPicker(!isShowPicker);
  const selectEmoji = (e) => {
    // console.log(e);
    const emojiCode = e.unified.split("-");
    let codesArray = [];
    emojiCode.forEach((el) => codesArray.push("0x" + el));
    const emoji = String.fromCodePoint(...codesArray);
    console.log(emoji);
    setIsShowPicker(false);
  };
  return (
    <div>
      <Box sx={{ position: "relative", width: "max-content" }}>
        <Typography
          variant="h3"
          fontWeight="700"
          sx={{ cursor: "pointer" }}
          onClick={showPicker}
        >
          {props.icon}
        </Typography>
      </Box>
      <Box
        sx={{
          display: isShowPicker ? "block" : "none",
          position: "absolute",
          zIndex: "100",
        }}
      >
        <Picker onEmojiSelect={selectEmoji} />
      </Box>
    </div>
  );
};

export default EmojiPicker;
