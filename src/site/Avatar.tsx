import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

export default function Avatar() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    bio: "",
    accountType: "",
    signalsCount: 0,
    lastAnalysisDate: "",
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [bioInput, setBioInput] = useState("");
  const [accountTypeInput, setAccountTypeInput] = useState("");
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUser({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || currentUser.email,
            gender: data.gender || "",
            bio: data.bio || "",
            accountType: data.accountType || "",
            signalsCount: data.signalsCount || 0,
            lastAnalysisDate: data.lastAnalysisDate || "",
          });
          setBioInput(data.bio || "");
          setAccountTypeInput(data.accountType || "");
        }
      }
    };
    fetchUserData();
  }, []);

  const handleSave = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const docRef = doc(db, "users", currentUser.uid);
      await updateDoc(docRef, {
        bio: bioInput,
        accountType: accountTypeInput,
      });
      setUser((prev) => ({ ...prev, bio: bioInput, accountType: accountTypeInput }));
      setEditMode(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#0d0f1a] via-[#1f2233] to-[#0d0f1a] text-white min-h-screen font-sans relative overflow-x-hidden px-4">
      {/* Menu */}
      <div className="fixed top-5 right-5 z-50">
        <div
          className="bg-white rounded-full w-14 h-14 flex items-center justify-center cursor-pointer shadow-lg"
          onClick={toggleMenu}
        >
          <div className="flex flex-col gap-1">
            <div className="w-7 h-1 bg-[#0d0f1a] rounded"></div>
            <div className="w-7 h-1 bg-[#0d0f1a] rounded"></div>
            <div className="w-7 h-1 bg-[#0d0f1a] rounded"></div>
          </div>
        </div>

        {menuOpen && (
          <div className="absolute top-20 right-0 w-64 sm:w-72 bg-gradient-to-r from-purple-700 to-pink-500 rounded-2xl p-6 flex flex-col gap-4 shadow-xl z-50">
            <Link to="/signal" className="flex items-center bg-white bg-opacity-20 rounded-xl px-5 py-3 text-base font-medium hover:bg-opacity-40 transition">
              <img src="src/site/heart-rate.png" alt="Add" className="w-6 h-6 mr-3" />
              Add Signal
            </Link>
            <Link to="/About" className="flex items-center bg-white bg-opacity-20 rounded-xl px-5 py-3 text-base font-medium hover:bg-opacity-40 transition">
              <img src="src/site/welcome-back.png" alt="About" className="w-6 h-6 mr-3" />
              About us
            </Link>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-start pt-32 sm:pt-40 max-w-4xl mx-auto space-y-8">
        {/* Avatar Info */}
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <img
            src="src/site/3177440.png"
            alt="Avatar"
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-purple-500 shadow-md"
          />
          <div>
            <h1 className="text-3xl font-bold">{user.firstName} {user.lastName}</h1>
            <p className="text-sm text-gray-300">{user.email}</p>
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-white/20 backdrop-blur-sm p-6 rounded-3xl w-full space-y-4">
          <div><strong>Name:</strong> {user.firstName}</div>
          <div><strong>Surname:</strong> {user.lastName}</div>
          <div><strong>Email:</strong> {user.email}</div>
          <div><strong>Gender:</strong> {user.gender}</div>
          <div>
            <strong>Bio:</strong>
            {editMode ? (
              <textarea
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                className="w-full mt-1 p-2 rounded-lg text-black"
              />
            ) : (
              <span className="ml-2">{user.bio || "–"}</span>
            )}
          </div>
          <div>
            <strong>Account type:</strong>
            {editMode ? (
              <select
                value={accountTypeInput}
                onChange={(e) => setAccountTypeInput(e.target.value)}
                className="w-full mt-1 p-2 rounded-lg text-black"
              >
                <option value="">Choose...</option>
                <option value="student">Student</option>
                <option value="lekarz">Doctor</option>
                <option value="zainteresowany">Interested</option>
              </select>
            ) : (
              <span className="ml-2 capitalize">{user.accountType || "–"}</span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="bg-purple-300 text-purple-900 text-center rounded-2xl py-10 px-6 shadow-lg text-2xl font-bold">
            <p className="text-6xl">{user.signalsCount}</p>
            <p className="text-lg mt-2">Sent Signals</p>
          </div>
          <div className="bg-pink-300 text-pink-900 text-center rounded-2xl py-10 px-6 shadow-lg text-2xl font-bold">
            <p className="text-3xl">{user.lastAnalysisDate || "–"}</p>
            <p className="text-lg mt-2">Last Analysis</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 w-full">
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white font-semibold py-3 px-6 rounded-full transition w-full sm:w-auto"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white font-semibold py-3 px-6 rounded-full transition w-full sm:w-auto"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditMode(true)}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white font-semibold py-3 px-6 rounded-full transition w-full sm:w-auto"
              >
                Edit
              </button>
              <button
                onClick={async () => {
                  await auth.signOut();
                  navigate("/");
                }}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white font-semibold py-3 px-6 rounded-full transition w-full sm:w-auto"
              >
                Log out
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
