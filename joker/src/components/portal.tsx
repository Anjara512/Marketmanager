import { motion } from "framer-motion";
import { API } from "../lib/cappApi";
import { useTheme, useToggDeconnexionleCard } from "../store/zustand";
import { useActionState } from "react";
import { useNavigate } from "react-router-dom";
export const Modale = () => {
  const { toasting } = useTheme();
  const { toggleCard } = useToggDeconnexionleCard();
  const nav = useNavigate();

  const logoutUser = async () => {
    try {
      const response = await API.post("/logoutUser", null);
      if (response) {
        localStorage.removeItem("token");
        nav("/");

        toggleCard();
        return {
          state: "succes",
          message: response.data,
        };
      }
    } catch (err) {
      return {
        state: "error",
        message: err,
      };
    }
  };

  const [response, formaction, isPending] = useActionState(logoutUser, null);
  toasting.content = response?.message;
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      className=" w-62 h-30 absolute z-10 mt-10 bg-slate-800 p-2 rounded-lg"
    >
      <h2>vous voulez vraiment vous deconnecter</h2>
      <div className="flex flex-row gap-5">
        <button
          onClick={formaction}
          disabled={isPending}
          className="w-max px-4 py-2 focus:ring-4 ring-blue-700 focus:outline-none text-white font-mono bg-green-400 rounded-md cursor-pointer"
        >
          oui
        </button>
        <button
          onClick={toggleCard}
          className="w-max px-4 py-2 focus:ring-4 ring-blue-700 focus:outline-none text-white font-mono bg-red-800 rounded-md cursor-pointer"
        >
          Non
        </button>
      </div>
    </motion.div>
  );
};
