import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetMessages = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMessage = async () => {
      axios.defaults.withCredentials = true;
      const res = await axios.get(`/api/v1/message/${selectedUser?._id}`);

      dispatch(setMessages(res.data));
    };
    fetchMessage();
  }, [selectedUser]);
};

export default useGetMessages;
