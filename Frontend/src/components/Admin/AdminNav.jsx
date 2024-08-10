import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { signOut } from "../googlesignin/Config";
import { auth } from "../googlesignin/Config";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminNav = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      toast.success("log out Successfull!")
      setTimeout(()=>{
        navigate("/");
      window.location.reload();
      },5000)
      
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between m-4 items-center">
        <h3 className="text-xl font-bold">Micro Credit Application</h3>
        <div className="flex gap-3">
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
};

export default AdminNav;
