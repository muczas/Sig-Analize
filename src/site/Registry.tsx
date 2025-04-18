import React, { useState, ChangeEvent, FormEvent } from 'react';

type Gender = 'Kobieta' | 'Mężczyzna';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: Gender | '';
}

const Register: React.FC = () => {
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Dane rejestracji:', formData);
    // Tu możesz podpiąć zapytanie do backendu
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-800 to-pink-600">
      <div className="bg-gray-300 bg-opacity-30 p-8 rounded-3xl w-full max-w-md shadow-xl">
        <div className="flex items-center mb-6">
          <img src="logo.png" alt="logo" className="h-12 mr-3" />
          <h1 className="text-3xl font-bold text-white">Sig&Analize</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center bg-white rounded-full px-4 py-2">
            <img src="user_icon.png" alt="user" className="w-6 h-6 mr-3" />
            <input
              type="text"
              name="firstName"
              placeholder="Imię"
              value={formData.firstName}
              onChange={handleChange}
              className="outline-none w-full"
              required
            />
          </div>

          <div className="flex items-center bg-white rounded-full px-4 py-2">
            <img src="user_icon.png" alt="user" className="w-6 h-6 mr-3" />
            <input
              type="text"
              name="lastName"
              placeholder="Nazwisko"
              value={formData.lastName}
              onChange={handleChange}
              className="outline-none w-full"
              required
            />
          </div>

          <div className="flex items-center bg-white rounded-full px-4 py-2">
            <img src="email_icon.png" alt="email" className="w-6 h-6 mr-3" />
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
            <img src="lock_icon.png" alt="password" className="w-6 h-6 mr-3" />
            <input
              type="password"
              name="password"
              placeholder="Hasło"
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
              Kobieta
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
              Mężczyzna
            </label>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-700 to-pink-500 text-white font-bold py-3 rounded-full text-lg mt-6 hover:scale-105 transition"
          >
            Rejestruj
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
