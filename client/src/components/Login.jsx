import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
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
      username: "",
      password: "",
    });

    try {
      const res = await axios.post("/api/v1/user/login", user);
      dispatch(setAuthUser(res.data.user));

      message.success("User login successfull");
      navigate("/");
    } catch (error) {
      message.error(error.response.data.msg);
    }
  };

  return (
    <div className="min-w-96">
      <div className="h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 p-3 px-5 ">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black">Login</h1>
        </div>

        <form onSubmit={submitHandler}>
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

          <div className="flex items-center p-4 text-center">
            <p className="text-black text-lg">Don't have an account?</p>
            <Link to={"/register"} className="text-blue-900 text-lg ml-1">
              signup
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-active border-slate-500 text-black font-bold w-full text-xl bg-transparent hover:text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
