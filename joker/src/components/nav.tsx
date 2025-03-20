import React from "react";
import { cn } from "../lib/utils";
import { useTheme, useToggDeconnexionleCard } from "../store/zustand";
import { Archive, BookMarked, Contact, LogOut, Table } from "lucide-react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const { theme } = useTheme();

  const { toggleCard } = useToggDeconnexionleCard();
  return (
    <nav
      className={cn(
        "flex flex-col sm:w-42 sticky top-10 ml-1 h-screen sm:gap-2 text-white text-md md:text-lg  md:gap-10 w-20 bg-zinc-800 ",
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
        Produit
      </NavLink>{" "}
      <NavLink
        to={"/connect/Archives"}
        className="flex flex-row gap-2 px-2  cursor-pointer  hover:bg-zinc-400 w-full h-max py-2"
      >
        <Archive />
        Archives
      </NavLink>{" "}
      <NavLink
        to={"/connect/Table"}
        className="flex flex-row gap-2 md:px-2  cursor-pointer hover:bg-zinc-400  w-full h-max py-2"
      >
        <Table />
        Tables
      </NavLink>
      <p
        onClick={toggleCard}
        className="flex flex-row gap-2 md:px-2  cursor-pointer hover:bg-zinc-400  w-full h-max py-2"
      >
        <LogOut />
        Deconnexion
      </p>
      <p className="flex flex-row gap-2 px-2  cursor-pointer hover:bg-zinc-400  w-full h-max py-2">
        <Contact />
        Contact
      </p>
    </nav>
  );
};

export default Nav;
