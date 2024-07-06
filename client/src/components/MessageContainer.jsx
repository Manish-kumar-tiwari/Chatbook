import React from "react";
import Search from "./Search";
import Messages from "./Messages";
import { useSelector } from "react-redux";

const MessageContainer = () => {
  const { selectedUser, authUser, onlineUser } = useSelector(
    (store) => store.user
  );
  const isOnline = onlineUser?.includes(selectedUser?._id);

  return (
    <>
      {selectedUser && (
        <div className="w-full px-4">
          <div className="w-full px-4 py-1  bg-slate-600 h-20  rounded-md flex items-center ">
            <div className="flex gap-2 items-center  rounded-r-md ">
              <div
                className={`avatar ${isOnline && "online"} w-12 rounded-full `}
              >
                <img src={selectedUser?.profilePhoto} alt="profile-pic" />
              </div>

              <div>
                <h1 className="text-2xl text-white font-semmibold">
                  {selectedUser?.fullName}
                </h1>
              </div>
            </div>

            <div className="divider text-black"></div>
          </div>

          <Messages />
          <div className="absolute w-[70%] bottom-1 ml-8 mb-2">
            <Search />
          </div>
        </div>
      )}
      {!selectedUser && (
        <div className="flex flex-col justify-center items-center w-full">
          <h1 className="font-bold text-6xl text-white">
            Hii, {authUser?.fullName}
          </h1>
          <h1 className="text-3xl font-semibold text-gray-500">
            Let's start Conversation
          </h1>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
