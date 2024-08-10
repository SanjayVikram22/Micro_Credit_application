import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { signOut } from "../components/googlesignin/Config";
import { auth } from "../components/googlesignin/Config";
export default function Nav() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between m-4 items-center">
        <h3 className="text-xl font-bold">Loan Eligibility</h3>
        <div className="flex gap-3">
          <button
            className="bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 border-2 hover:text-blue-600 hover:bg-white"
            onClick={() => navigate("/home")}
          >
            Home
          </button>
          <button
            className="bg-red-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 border-2 hover:text-red-600 hover:bg-white"
            onClick={logout}
          >
            <LogoutIcon /> Logout
          </button>
        </div>
      </div>
      <hr />
    </>
  );
}
