'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './EmployeeProfile.css'; 

export default function EmployeeProfilePage() {
  const [userID, setUserID] = useState('');
  const [userName, setUserName] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState('');
  const [city, setCity] = useState('');
  const [history, setHistory] = useState('');
  const router = useRouter();

  useEffect(() => {
    const userEmail = sessionStorage.getItem('userEmail');
    if (userEmail) {
      setEmail(userEmail);
      const generatedUserID = `user-${Date.now()}`;
      setUserID(generatedUserID);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dane użytkownika zapisane:', {
      userID, userName, lastName, firstName, phone, email, education, skills, city, history,
    });
    router.push('/');
  };

  return (
    <div className="profile-container">
      <div className="profile-form">
        <h2 className="form-title">Wprowadź swoje dane</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <input
                type="text"
                className="form-input"
                placeholder="ID użytkownika"
                value={userID}
                readOnly 
              />
            </div>
            <div>
              <input
                type="text"
                className="form-input"
                placeholder="Nazwa użytkownika"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                className="form-input"
                placeholder="Nazwisko"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                className="form-input"
                placeholder="Imię"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="tel"
                className="form-input"
                placeholder="Telefon"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="email"
                className="form-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                readOnly 
              />
            </div>
            <div>
              <input
                type="text"
                className="form-input"
                placeholder="Edukacja"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                className="form-input"
                placeholder="Umiejętności"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                className="form-input"
                placeholder="Miasto"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div>
              <textarea
                className="form-input"
                placeholder="Historia"
                value={history}
                onChange={(e) => setHistory(e.target.value)}
                required
              ></textarea>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="submit-button"
            >
              Zapisz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
