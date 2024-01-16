import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const EmojiPicker = (props) => {
  const [selectedEmoji, setSelectedEmoji] = useState();
  useEffect(() => {
    setSelectedEmoji(props.icon);
  }, [props.icon]);
<<<<<<< Updated upstream
=======

  const showPicker = () => setIsShowPicker(!isShowPicker);
  const selectEmoji = (e) => {
    // console.log(e);
    const emojiCode = e.unified.split("-");
    let codesArray = [];
    emojiCode.forEach((el) => codesArray.push("0x" + el));
    const emoji = String.fromCodePoint(...codesArray);
    // console.log(emoji);
    props.onChange(emoji);
    setIsShowPicker(false);
  };
>>>>>>> Stashed changes
  return (
    <div>
      <Box>
        <Typography variant="h3" fontWeight="700" sx={{ cursor: "pointer" }}>
          {props.icon}
        </Typography>
      </Box>
    </div>
  );
};

export default EmojiPicker;
