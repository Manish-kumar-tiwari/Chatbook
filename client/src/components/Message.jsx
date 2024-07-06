import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const { selectedUser, authUser } = useSelector((store) => store.user);
  const scroll = useRef();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      {selectedUser && (
        <div ref={scroll}>
          <div
            className={`chat ${
              authUser?._id === message.senderId ? "chat-end" : "chat-start"
            } p-2`}
          >
            <div className="chat-image avatar">
              <div className="w-12 rounded-full">
                <img
                  alt="Profile picture"
                  src={
                    message?.senderId === authUser._id
                      ? authUser?.profilePhoto
                      : selectedUser?.profilePhoto
                  }
                />
              </div>
            </div>
            <div className="chat-header ml-2">
              <time className="text-sm text-white opacity-50 ">12:45</time>
            </div>
            <div className="chat-bubble text-xl p-4">{message?.message}</div>
          </div>
        </div>
      )}

     
    </>
  );
};

export default Message;
