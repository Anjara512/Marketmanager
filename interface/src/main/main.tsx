import React, { useEffect } from "react";
import Header from "./Header";
import { Toaster, toast } from "sonner";
import { useTheme, useToggleCard } from "../store/zustand";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { Typewriter, Cursor } from "react-simple-typewriter";

const Main = () => {
  const { toasting, theme } = useTheme();
  const { card } = useToggleCard();
  const nav = useNavigate();
  useEffect(() => {
    if (toasting.content !== " ") toast.success(toasting.content);

    setTimeout(() => {
      toasting.content = " ";
    }, 1000);
  });
  const LoginUser = async (form: FormData) => {
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    if (email && password) {
      try {
        const response = await axios.post("http://localhost:7000/loginUser", {
          email,
          password,
        });
        if (response) {
          localStorage.setItem("token", response.data);
          nav("/connect");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col m-0 p-0">
      <Header notconnect={true} />
      <div
        className={cn(
          "flex flex-col bg-[url(public/1000005627.jpg)] text-white w-full h-screen bg-repeat-none bg-cover bg-center",
          {
            "bg-[url(public/1000005629.jpg)] text-black ": theme !== "dark",
          }
        )}
      >
        {card === true ? (
          <form
            action={LoginUser}
            className={cn(
              " flex flex-col w-62 absolute h-max px-4 py-2 rounded-md border-1 bg-slate-800  border-green-100  gap-4",
              {
                "bg-zinc-100": theme !== "dark",
              }
            )}
          >
            <input
              type="email"
              name="email"
              id=""
              className="input-dark focus:outline-none focus:ring-4 focus:ring-blue-400 "
            />
            <input
              type="password"
              name="password"
              id=""
              className="input-dark focus:outline-none focus:ring-4 focus:ring-blue-400 "
            />
            <button className="w-max px-4 py-2 bg-green-500 rounded-md">
              connexion
            </button>
            <NavLink
              className="text-blue-500 cursor-pointer hover:underline"
              to="/createUser"
            >
              creer votre compte
            </NavLink>
          </form>
        ) : null}
        <div className="bg-gradient-to-t  from-blue-800  to-red-500  bg-clip-text text-transparent">
          <div className="w-full flex font-bold h-screen justify-center items-center uppercase text-6xl ">
            <Typewriter
              typeSpeed={50}
              loop={0}
              words={["developeur ", "web ", "de", "madagascar"]}
            ></Typewriter>
            <span>
              <Cursor />
            </span>
          </div>
        </div>

        <Toaster />
      </div>
    </div>
  );
};

export default Main;
