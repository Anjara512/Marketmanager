import React from "react";
import { cn } from "../lib/utils";
import { useLangage, useTheme } from "../store/zustand";
import {
  Archive,
  BookMarked,
  Contact,
  Home,
  LogOut,
  Settings,
  Table,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const { theme } = useTheme();
  const { langage } = useLangage();
  return (
    <nav
      className={cn(
        "flex flex-col sm:w-42 h-screen text-white  gap-10 w-42 bg-zinc-800 ",
        {
          "bg-zinc-100 text-stone-950": theme !== "dark",
        }
      )}
    >
      <NavLink
        to={"/connect/product"}
        className="flex flex-row gap-2 px-2  cursor-pointer  hover:bg-zinc-400 w-full h-max py-2"
      >
        <BookMarked />
        {langage === "francais" ? "produit" : "product"}
      </NavLink>{" "}
      <NavLink
        to={"/connect/Archives"}
        className="flex flex-row gap-2 px-2  cursor-pointer  hover:bg-zinc-400 w-full h-max py-2"
      >
        <Archive />
        {langage === "francais" ? "Archives" : "Archives"}
      </NavLink>{" "}
      <NavLink
        to={"/connect/Table"}
        className="flex flex-row gap-2 px-2  cursor-pointer hover:bg-zinc-400  w-full h-max py-2"
      >
        <Table />
        {langage === "francais" ? "Tables" : "Table"}
      </NavLink>
      <p className="flex flex-row gap-2 px-2  cursor-pointer hover:bg-zinc-400  w-full h-max py-2">
        <LogOut />
        {langage === "francais" ? "deconnexion" : "deconnexion"}
      </p>
      <p className="flex flex-row gap-2 px-2  cursor-pointer hover:bg-zinc-400  w-full h-max py-2">
        <Contact />
        {langage === "francais" ? "nous joindre" : "contact"}
      </p>
    </nav>
  );
};

export default Nav;
