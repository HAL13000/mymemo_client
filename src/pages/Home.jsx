import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import React, { useState } from "react";

const createMemo = () => {};
export const Home = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoadingButton
          variant="outlined"
          onClick={() => createMemo}
          loading="loading"
        >
          Create a Memo
        </LoadingButton>
      </Box>
    </div>
  );
};
