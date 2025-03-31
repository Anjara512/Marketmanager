import React, { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { useTheme } from "../store/zustand";
import Header from "../main/Header";
import Nav from "../components/nav";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";

const Archives = () => {
  const calendar = new Date();
  const { theme } = useTheme();
  const [mois, setmois] = useState(calendar.getMonth());
  const getDayWithMonth = (year: number, month: number): number => {
    return new Date(year, month, 0).getDate();
  };
  const [date, setdate] = useState(
    new Array(getDayWithMonth(2024, mois - 1)).fill({})
  );

  useEffect(() => {
    if (mois === new Date().getMonth()) {
      setdate(new Array(new Date().getDate()).fill({}));
    }
  }, [mois]);
  const letter: string[] = [
    "janvier",
    "fevrier",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "aout",
    "septembre",
    "octobre",
    "novembre",
    "decembre",
  ];

  const weekLetter = ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"];

  const IncrementeMois = () => {
    if (mois === new Date().getMonth()) return;

    setmois((mois) => mois + 1);
    setdate(new Array(getDayWithMonth(2024, mois)).fill({}));
  };

  const decrementeMois = () => {
    if (letter[mois] !== "janvier") setmois((mois) => mois - 1);
    setdate(new Array(getDayWithMonth(2024, mois)).fill({}));
  };

  return (
    <div
      className={cn("flex flex-col h-screen text-slate-100 bg-zinc-950", {
        "bg-slate-100 text-black": theme !== "dark",
      })}
    >
      <Header />
      <div className="flex flex-row">
        <Nav />
        <div className="flex flex-col w-full gap-1 items-center mt-4 ">
          <div className="flex justify-between w-full">
            <h3>Archives</h3>
            <h1 className="text-lg font-medium capitalize mr-5 text-yellow-300">
              {new Date().getFullYear()}
            </h1>
          </div>
          <h1 className="text-lg font-medium capitalize">{letter[mois]}</h1>

          <div className="flex flex-row">
            <ArrowLeft
              className="h-full cursor-pointer md:text-3xl "
              onClick={decrementeMois}
            ></ArrowLeft>
            <ul
              className={cn(
                "grid md:grid-cols-6 gap-4 grid-cols-2 text-white  rounded-md  md:p-10 p-5 border border-zinc-40  ",
                {
                  "text-black": theme !== "dark",
                }
              )}
            >
              {date.map((_, index) => (
                <NavLink
                  to={`/connect/Archives/:${mois + 1},${index + 1}`}
                  className={cn(
                    "flex itels-center hover:bg-yellow-500 gap-3 cursor-pointer justify-center bg-neutral-800 w-max p-1 md:p-4 h-max rounded-md border border-zinc-400",
                    {
                      "bg-neutral-50": theme !== "dark",
                    }
                  )}
                  key={index}
                >
                  <span className="w-max h-max md:p-2 p-1 rounded-md text-x-white bg-blue-400">
                    {
                      weekLetter[
                        new Date(
                          new Date().getFullYear(),
                          mois,
                          index + 1
                        ).getDay()
                      ]
                    }
                  </span>
                  {index + 1}
                </NavLink>
              ))}
            </ul>
            {mois !== new Date().getMonth() && (
              <ArrowRight
                className="h-full cursor-pointer md:text-3xl  "
                onClick={IncrementeMois}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Archives;
