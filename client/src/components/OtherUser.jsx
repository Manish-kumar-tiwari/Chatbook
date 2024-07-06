import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({ user }) => {
  
  const dispatch = useDispatch();
  const { selectedUser, onlineUser } = useSelector((store) => store.user);

  const selectedHandter = () => {
    dispatch(setSelectedUser(user));
  };

  const isOnline = onlineUser?.includes(user._id);

  return (
    <div
      onClick={selectedHandter}
      className={`p-2 ${
        selectedUser?._id === user?._id && "bg-slate-400"
      } cursor-pointer  hover:bg-slate-400 h-20   rounded-md flex items-center`}
    >
      <div className="flex gap-2 items-center  rounded-r-md  ">
        <div className={`avatar ${isOnline && "online"}  w-12 rounded-full `}>
          <img src={user.profilePhoto} alt="profile-pic" />
        </div>

        <div>
          <h1 className="text-2xl  text-white font-semmibold">
            {user.fullName}
          </h1>
        </div>
        <div className="divider text-black"></div>
      </div>
    </div>
  );
};

export default OtherUser;
