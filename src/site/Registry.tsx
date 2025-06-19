import React, { useState, ChangeEvent, FormEvent } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '/src/firebase.ts';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { sendEmailVerification } from "firebase/auth";
import { Link } from "react-router-dom";

type Gender = 'Kobieta' | 'Mężczyzna';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: Gender | '';
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
  });
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try 
    {
      const userCredential = await createUserWithEmailAndPassword(
       auth,
       formData.email,
       formData.password
      );

      const user = userCredential.user;
      
      if (user) {
        await sendEmailVerification(user);
      }


     // Zapisz dane do Firestore
      await setDoc(doc(db, "users", user.uid), {
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender,
      email: formData.email,
      
      createdAt: new Date()
    
    });

    alert("Registration was succesful!");
    navigate("/Login")
  } 
  catch (error) 
  {
    console.error("Registration error:", error);
    alert("Registration error, check parameters");
  }
};

  return (
    <div className="h-[89vh] flex items-center justify-center bg-gradient-to-r from-black to-indigo-900 ">
      <div className="bg-gray-300 bg-opacity-30 p-8 rounded-3xl w-full max-w-md shadow-xl">
        

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center bg-white rounded-full px-4 py-2">
            <img src="src\site\id-card.png" alt="user" className="w-6 h-6 mr-3" />
            <input
              type="text"
              name="firstName"
              placeholder="Name"
              value={formData.firstName}
              onChange={handleChange}
              className="outline-none w-full"
              required
            />
          </div>

          <div className="flex items-center bg-white rounded-full px-4 py-2">
            <img src="src\site\id-card.png" alt="user" className="w-6 h-6 mr-3" />
            <input
              type="text"
              name="lastName"
              placeholder="Surname"
              value={formData.lastName}
              onChange={handleChange}
              className="outline-none w-full"
              required
            />
          </div>

          <div className="flex items-center bg-white rounded-full px-4 py-2">
            <img src="src\site\mail.png" alt="email" className="w-6 h-6 mr-3" />
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={formData.email}
              onChange={handleChange}
              className="outline-none w-full"
              required
            />
          </div>

          <div className="flex items-center bg-white rounded-full px-4 py-2">
            <img src="src\site\padlock.png" alt="password" className="w-6 h-6 mr-3" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="outline-none w-full"
              required
            />
          </div>

          <div className="flex justify-between items-center mt-4 text-white">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Kobieta"
                checked={formData.gender === 'Kobieta'}
                onChange={handleChange}
                className="mr-2"
                required
              />
              Female
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Mężczyzna"
                checked={formData.gender === 'Mężczyzna'}
                onChange={handleChange}
                className="mr-2"
              />
              Male
            </label>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-pink-500 w-full py-2 rounded-full text-white font-bold text-lg block text-cente"
          >
            Register
          </button>
        </form>
        <div className="mt-6">
          <Link
             to="/Welcome"
              className="bg-gradient-to-r from-purple-500 to-pink-500 w-full py-2 rounded-full text-white font-bold text-lg block text-center"
            >
              Come back to main page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
