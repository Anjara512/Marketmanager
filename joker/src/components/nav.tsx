import React from "react";
import { AngryIcon, Archive, Contact, LogOut, Table2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "../lib/utils";
import { useTheme, useToggDeconnexionleCard } from "../store/zustand";

const Nav = () => {
  const { theme } = useTheme();
  const { toggleCard } = useToggDeconnexionleCard();

  return (
    <nav
      className={cn(
        "flex flex-col gap-5  w-32 sm:w-42 md:w-42 h-screen  bg-gray-950 ",
        {
          "bg-gray-50": theme !== "dark",
        }
      )}
    >
      <p
        className={cn(
          "flex flex-row  gap-1 text-md  w-full bg-transparent hover:bg-gray-800 md:gap-2 cursor-pointer border-y-1  border-zinc-50/10",
          {
            "hover:bg-zinc-50 border-zinc-800": theme !== "dark",
          }
        )}
      >
        <AngryIcon className="mt-1.5" size={15} />
        <NavLink className={cn("md:text-xl ")} to="/connect/product">
          produits
        </NavLink>
      </p>

      <p
        className={cn(
          "flex flex-row  gap-1 text-md  w-full bg-transparent hover:bg-gray-800 md:gap-2 cursor-pointer border-y-1  border-zinc-50/10",
          {
            "hover:bg-zinc-50 border-zinc-800": theme !== "dark",
          }
        )}
      >
        <Table2 className="mt-1.5" size={15} />
        <NavLink className={cn("md:text-xl ")} to="/connect/Table">
          Table
        </NavLink>
      </p>
      <p
        className={cn(
          "flex flex-row  gap-1 text-md  w-full bg-transparent hover:bg-gray-800 md:gap-2 cursor-pointer border-y-1  border-zinc-50/10",
          {
            "hover:bg-zinc-50 border-zinc-800": theme !== "dark",
          }
        )}
      >
        <Archive className="mt-1.5" size={15} />
        <NavLink className={cn("md:text-xl ")} to="/connect/Archives">
          Archives
        </NavLink>
      </p>
      <p
        className={cn(
          "flex flex-row  gap-1 text-md  w-full bg-transparent hover:bg-gray-800 md:gap-2 cursor-pointer border-y-1  border-zinc-50/10",
          {
            "hover:bg-zinc-50 border-zinc-800": theme !== "dark",
          }
        )}
      >
        <Contact className="mt-1.5" size={15} />
        <NavLink className={cn("md:text-xl ")} to="/connect/product">
          Contact
        </NavLink>
      </p>
      <p
        className={cn(
          "flex flex-row  gap-1 text-md  w-full bg-transparent hover:bg-gray-800 md:gap-2 cursor-pointer border-y-1  border-zinc-50/10",
          {
            "hover:bg-zinc-50 border-zinc-800": theme !== "dark",
          }
        )}
      >
        <LogOut className="mt-1.5" size={15} />
        <span onClick={toggleCard}>deconnexion</span>
      </p>
    </nav>
  );
};

export default Nav;
