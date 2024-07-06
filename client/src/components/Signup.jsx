import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { useSelector } from "react-redux";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });

  const { authUser } = useSelector((store) => store.user);
  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "male",
    });
    try {
      const res = await axios.post("/api/v1/user/register", user);
      if (res.data.success) {
        message.success(res.data.msg);
        navigate("/login");
      }
    } catch (error) {
      message.error(error.response.data.msg);
    }
  };

  return (
    <div className="min-w-96">
      <div className="h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 p-3 px-5 ">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black">SignUp</h1>
        </div>

        <form onSubmit={submitHandler}>
          <div className="w-full p-1">
            <label>
              <p className="text-lg text-black py-1">Full Name</p>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className="p-2 w-full rounded-md bg-white text-lg text-gray-700"
              type="text"
              placeholder="Full Name"
            />
          </div>

          <div className="w-full p-1">
            <label>
              <p className="text-lg text-black py-1">Username</p>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="p-2 w-full rounded-md bg-white text-lg text-gray-700"
              type="text"
              placeholder="Username "
            />
          </div>

          <div className="w-full p-1">
            <label>
              <p className="text-lg text-black py-1">Password</p>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="p-2 w-full rounded-md bg-white text-lg text-gray-700"
              type="password"
              placeholder="Password"
            />
          </div>

          <div className="w-full p-1">
            <label>
              <p className="text-lg text-black py-1">Confirm Password</p>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              className="p-2 w-full rounded-md bg-white text-lg text-gray-700"
              type="password"
              placeholder="Confirm Password"
            />
          </div>

          <div className="w-full p-1 flex py-3">
            <div className="flex items-center">
              <p className="text-black text-lg">Male</p>
              <input
                onClick={(e) => setUser({ ...user, gender: "male" })}
                type="radio"
                name={user.gender}
                checked={user.gender === "male"}
                className="radio ml-2"
              />
            </div>

            <div className="flex items-center px-3 ml-4">
              <p className="text-black text-lg">Femaile</p>
              <input
                onClick={(e) => setUser({ ...user, gender: "female" })}
                type="radio"
                name={user.gender}
                className="radio ml-2"
                checked={user.gender === "female"}
              />
            </div>
          </div>

          <div className="flex items-center p-4 text-center">
            <p className="text-black text-lg">Already have an account?</p>
            <Link to={"/login"} className="text-blue-900 text-lg ml-1">
              login
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-active border-slate-500 text-black font-bold w-full text-xl bg-transparent hover:text-white"
          >
            Sinnup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
