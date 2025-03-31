import { useState } from "react";
import { Modale } from "../components/portal";
import { cn } from "../lib/utils";
import {
  useTheme,
  useToggDeconnexionleCard,
  useToggleCard,
} from "../store/zustand";
import { MoonStar, Search, SunIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = ({ notconnect }: { notconnect?: boolean }) => {
  const { theme, toggleTheme } = useTheme();
  const [globalSearch, setGlobalSearch] = useState(" ");
  const [globaLink, setGlobalLink] = useState([""]);
  const { toggleCard } = useToggleCard();
  const { card } = useToggDeconnexionleCard();

  const nav = useNavigate();
  const GlobaChoice = [
    "product",
    "archives",
    "contact",
    "Ajouter de nouveau produit",
    "tables",
    "vendre",
  ];
  const navigateTo = (e: string) => {
    switch (e) {
      case "product":
        nav("/connect/product");
        break;
      case "archives":
        nav("/connect/Archives");
        break;
      case "contact":
        nav("/connect/contact");
        break;
      case "table":
        nav("/connect/Table");
        break;

      default:
        break;
    }
  };
  const getNav = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalSearch(e.target.value);
    if (globalSearch.trim()) {
      setGlobalLink(
        GlobaChoice.filter((el) => {
          return el.startsWith(globalSearch.trim());
        })
      );
    } else {
      setGlobalLink([" "]);
    }
  };

  return (
    <header
      className={cn(
        "flex justify-between sticky top-0 z-50 w-full h-max pb-2  bg-slate-300",
        {
          "bg-zinc-800": theme === "dark",
        }
      )}
    >
      <h1 className="uppercase sm:text-3xl md:text-2xl  text-transparent bg-clip-text font-medium  bg-gradient-to-l from-blue-800 to-purple-800">
        market manager
      </h1>
      <span className="flex flex-row gap-5 ml-4 mt-2 ">
        {!notconnect && (
          <div className="flex flex-col">
            <div className="flex flex-row ">
              <Search
                values={globalSearch}
                className="absolute text-white  mt-2 ml-2"
                size={20}
              ></Search>

              <input
                type="search"
                onChange={getNav}
                className={cn(
                  "rounded-md sm:w-full  text-white focus:outline-none border-white bg-zinc-950  pl-8  py-1 focus:ring-4 focus:ring-blue-400"
                )}
                name=""
                placeholder="search..."
                id=""
              />
            </div>
            {globalSearch.trim()
              ? globaLink.map((el, index) => (
                  <span
                    className={cn("text-white bg-zinc-900", {
                      "text-black": theme !== "dark",
                    })}
                    onClick={() => navigateTo(el)}
                    key={index}
                  >
                    {el}
                  </span>
                ))
              : null}
          </div>
        )}

        {notconnect && (
          <button
            className="w-max px-4 py-2 bg-green-500 cursor-pointer rounded-md"
            onClick={() => toggleCard()}
          >
            connexion
          </button>
        )}
        {card && <Modale />}
        {theme === "dark" ? (
          <MoonStar
            style={{ transform: "rotateX(360deg)" }}
            onClick={toggleTheme}
            size={30}
            className="text-yellow-500 cursor-pointer"
          />
        ) : (
          <SunIcon
            onClick={toggleTheme}
            size={30}
            className="text-yellow cursor-pointer"
          ></SunIcon>
        )}
      </span>
    </header>
  );
};

export default Header;
