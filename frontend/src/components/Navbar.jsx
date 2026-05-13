import { Plus, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setShowCreate }) => {

  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="h-16 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-6">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        <button
          onClick={() => {
            if (!username) {
              navigate("/login");
            } else {
              setShowCreate(true);
            }
          }}
          className="bg-blue-600 hover:bg-blue-700 transition p-2 rounded-xl"
        >
          <Plus size={20} />
        </button>

        <h1 className="text-2xl font-bold">
          Shortify AI
        </h1>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {username ? (
          <>
            <div className="flex items-center gap-2">
              <User size={18} />
              <span>{username}</span>
            </div>

            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 transition p-2 rounded-xl"
            >
              <LogOut size={18} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 px-4 py-2 rounded-xl"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="bg-green-600 px-4 py-2 rounded-xl"
            >
              Signup
            </button>
          </>
        )}

      </div>

    </div>
  );
};

export default Navbar;