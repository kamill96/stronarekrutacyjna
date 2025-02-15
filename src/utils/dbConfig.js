// src/utils/dbConfig.js
import { connect } from 'mssql';
import dotenv from 'dotenv';
dotenv.config(); // Używamy dotenv do wczytania zmiennych środowiskowych

// Funkcja do połączenia z bazą danych
const connectToDatabase = async () => {
  const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
      encrypt: true, // Użyj szyfrowania, jeśli jest wymagane
      trustServerCertificate: true, // Jeśli połączenie jest lokalne
    },
  };

  try {
    connect(config);
    console.log('Połączono z bazą danych!');
  } catch (error) {
    console.error('Błąd połączenia z bazą:', error);
  }
};

const dbConfig = { connectToDatabase };

export default dbConfig;
