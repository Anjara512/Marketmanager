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
    try {
      const response = await axios.post("http://localhost:7000/createUser", {
        password,
        email,
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
      className={cn("flex flex-col bg-neutral-800", {
        "bg-zinc-100": theme !== "dark",
      })}
    >
      <Header></Header>
      <form action={submit} className="flex flex-col gap-2 w-1/2 ">
        <input type="email" name="email" id="" className="input-dark" />
        <input type="password" name="password" id="" className="input-dark" />
        <button className="rounded-full bg-blue-500 px-2 py-3 ">
          creer un utilisateur
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
