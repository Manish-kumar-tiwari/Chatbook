import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const { authUser } = useSelector((store) => store.user);
  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, []);

  useGetOtherUsers();

  return (
    <div className="flex h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 p-3 px-5 ">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default HomePage;
