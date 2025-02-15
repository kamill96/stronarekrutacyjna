import sql from 'mssql';
import dotenv from 'dotenv';
// W trybie nodenext możesz importować bez rozszerzenia, ale warto je podać, żeby mieć pewność.
import { fetchJobOffers } from '../utils/fetchJobOffers.js';

// Załaduj zmienne środowiskowe z pliku .env
dotenv.config();

// Globalna obsługa błędów
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

// Konfiguracja MSSQL
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: { encrypt: true, trustServerCertificate: true },
};

interface Job {
  title: string;
  company: string;
  location: string;
  salary: string;
}

async function saveToDatabase(jobs: Job[]): Promise<void> {
  try {
    const pool = await sql.connect(dbConfig);
    console.log('Połączono z bazą danych.');

    const insertPromises = jobs.map((job) =>
      pool
        .request()
        .input('title', sql.NVarChar, job.title)
        .input('company', sql.NVarChar, job.company)
        .input('location', sql.NVarChar, job.location)
        .input('salary', sql.NVarChar, job.salary)
        .query(
          'INSERT INTO dbo.job_posts (title, company, location, salary) VALUES (@title, @company, @location, @salary)'
        )
    );

    await Promise.all(insertPromises);
    console.log(`Zapisano ${jobs.length} ofert pracy do bazy MSSQL.`);
  } catch (error) {
    console.error('Błąd zapisu do MSSQL:', error);
  } finally {
    await sql.close();
  }
}

// Główna funkcja
(async () => {
  try {
    console.log('Rozpoczynanie scrapowania ofert pracy...');
    const jobs = await fetchJobOffers(); // Pobieramy oferty pracy

    if (jobs.length > 0) {
      await saveToDatabase(jobs);
    } else {
      console.log('Brak ofert do zapisania w bazie.');
    }
  } catch (error) {
    console.error('Błąd w głównej funkcji:', error);
  }
})();
