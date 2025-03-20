import React from "react";
import axios from "axios";
import { useTheme } from "../store/zustand";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { cn } from "../lib/utils";

const CreateUser = () => {
  const { toasting, theme } = useTheme();
  const nav = useNavigate();
  const submit = async (data: FormData) => {
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const name = data.get("name") as string;
    try {
      const response = await axios.post("http://localhost:7000/createUser", {
        password,
        email,
        name,
      });
      if (response) {
        toasting.content = response.data;
        nav("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className={cn(" h-screen  flex flex-col bg-neutral-800", {
        "bg-zinc-100": theme !== "dark",
      })}
    >
      <Header></Header>
      <div className="flex flex-col items-center  ">
        {" "}
        <form
          action={submit}
          className=" mt-20 flex flex-col md:gap-2 gap-3   w-1/2 "
        >
          <label
            htmlFor=""
            className={cn("text-white", {
              "text-black": theme !== "dark",
            })}
          >
            Pseudo
          </label>
          <input type="text" name="name" id="" className="input-dark" />
          <label
            htmlFor=""
            className={cn("text-white", {
              "text-black": theme !== "dark",
            })}
          ></label>
          Adresse email
          <input type="email" name="email" id="" className="input-dark" />
          <label
            htmlFor=""
            className={cn("text-white", {
              "text-black": theme !== "dark",
            })}
          >
            mot de passe
          </label>
          <input type="password" name="password" id="" className="input-dark" />
          <button className="rounded-full bg-blue-500 px-1  py:0.5 md:px-2  mdpy-3 ">
            creer un utilisateur
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
