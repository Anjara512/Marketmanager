import React from "react";
import { NavLink } from "react-router-dom";

const Connexion = () => {
  return (
    <div>
      <div>
        <form action="" className="w-3/4 flex flex-col">
          <input type="email" name="" id="" className="input-dark" />
          <input type="password" name="" id="" className="input-dark" />
          <button>connection</button>
          <NavLink to={"/createUser"}>e nouvelle utilisateur creer un</NavLink>
        </form>
      </div>
    </div>
  );
};

export default Connexion;
