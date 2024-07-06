import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import OtherUsers from "./OtherUsers";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setAuthUser,
  setOtherUsers,
  setSelectedUser,
} from "../redux/userSlice";
import { setSocket } from "../redux/socketSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const logoutHandler = async () => {
    try {
      const res = await axios.get("/api/v1/user/logout");
      if (res.data.success) {
        message.success(res.data.msg);
        dispatch(setAuthUser(null));
        dispatch(setOtherUsers(null));
        dispatch(setSelectedUser(null));
        dispatch(setSocket(null));
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-r-2 border-gray-200 w-[30%] ">
      <div className="flex w-full rounded-full bg-gray-500 items-center p-1">
        <FaSearch size={"34px"} className="px-1" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search..."
          className="w-full rounded-full text-3xl text-black p-1 border-none outline-none bg-gray-500 "
        />
      </div>

      <div className="divider text-black"></div>

      <OtherUsers search={search} />

      <button
        onClick={logoutHandler}
        className=" absolute bottom-3 p-2  bg-slate-500 px-4 rounded-full text-lg font-semibold text-white hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
