import { cn } from "../lib/utils";
import { useTheme, useToggleCard } from "../store/zustand";
import { MoonStar, Search, SunIcon } from "lucide-react";

const Header = ({ notconnect }: { notconnect?: boolean }) => {
  const { theme, toggleTheme } = useTheme();
  const { toggleCard } = useToggleCard();
  return (
    <header
      className={cn("flex justify-between w-full h-max pb-2  bg-slate-300", {
        "bg-zinc-800": theme === "dark",
      })}
    >
      <h1 className="uppercase sm:text-3xl md:text-2xl  text-transparent bg-clip-text font-medium  bg-gradient-to-l from-blue-800 to-purple-800">
        market manager
      </h1>
      <span className="flex flex-row gap-5 ml-4 mt-2 ">
        <div className="flex flex-row ">
          <Search className="absolute text-white  mt-2 ml-2" size={20}></Search>
          <input
            type="search"
            className={cn(
              "rounded-md sm:w-full  text-white focus:outline-none border-white bg-zinc-950  pl-8  py-1 focus:ring-4 focus:ring-blue-400"
            )}
            name=""
            placeholder="search..."
            id=""
          />
        </div>
        {notconnect && (
          <button
            className="w-max px-4 py-2 bg-green-500 cursor-pointer rounded-md"
            onClick={() => toggleCard()}
          >
            connexion
          </button>
        )}
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
