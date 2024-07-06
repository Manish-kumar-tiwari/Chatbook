import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUser } from "./redux/userSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  const { authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:8080", {
        query: {
          userId: authUser._id,
        },
      });

      dispatch(setSocket(socket));
     

      socket.on("onlineUsers", (user) => {
        dispatch(setOnlineUser(user));
      });

      return ()=>socket.close();
    }
  }, [authUser]);

  return (
    <div className="App p-4 h-screen flex justify-center items-center ">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
