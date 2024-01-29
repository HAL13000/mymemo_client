import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import memoApi from "../api/memoApi";
import { useDispatch, useSelector } from "react-redux";
import setMemo from "../redux/features/memoSlice";

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const memos = useSelector((state) => state.memo.value);

  const createMemo = async () => {
    try {
      setLoading(true);
      const res = await memoApi.create();
      navigate(`/memo/${res._id}`);
      const newMemos = [res, ...memos];
      dispatch(setMemo(newMemos));
      // !
    } catch (err) {
      // alert(err);
      if (err.message) {
        alert(err.message);
      } else {
        alert("An error: Create memos");
        console.log(err);
      }
    } finally {
      setLoading(false);
    }
  };
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
          onClick={() => createMemo()}
          loading={loading}
        >
          Create a Memo
        </LoadingButton>
      </Box>
    </div>
  );
};
