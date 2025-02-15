import sql from 'mssql';

// Konfiguracja połączenia z bazą danych SQL Server
const config = {
  user: 'your_username',  // Zamień na właściwą nazwę użytkownika
  password: 'your_password',  // Zamień na właściwe hasło
  server: 'localhost',  // Adres serwera, np. 'localhost'
  database: 'job_recruitment',  // Nazwa bazy danych
  options: {
    encrypt: true,  // Dla połączeń zabezpieczonych (np. Azure)
    trustServerCertificate: true,  // Dla środowiska lokalnego
  },
};

// Typ dla pojedynczego ogłoszenia pracy
interface JobPost {
  id: number;
  title: string;
  description: string;
}

// Funkcja dodająca nowe ogłoszenie do bazy SQL Server
export const addJobPost = async (jobData: { title: string; description: string }): Promise<number> => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('title', sql.NVarChar, jobData.title)
      .input('description', sql.NVarChar, jobData.description)
      .query('INSERT INTO dbo.job_posts (title, description) VALUES (@title, @description)');
    console.log('Dodano ogłoszenie, liczba zmienionych wierszy:', result.rowsAffected);
    return result.rowsAffected[0];  // Zwracamy liczbę zmienionych wierszy
  } catch (error) {
    console.error('Błąd podczas dodawania ogłoszenia:', error);
    throw new Error('Nie udało się dodać ogłoszenia.');
  }
};

// Funkcja pobierająca wszystkie oferty pracy z bazy SQL Server
export const getJobPosts = async (): Promise<JobPost[]> => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM dbo.job_posts');
    const jobList: JobPost[] = result.recordset;  // Typowanie wyniku jako tablicy obiektów JobPost
    console.log('Pobrano oferty pracy:', jobList);
    return jobList;
  } catch (error) {
    console.error('Błąd podczas pobierania ogłoszeń:', error);
    throw new Error('Nie udało się pobrać ogłoszeń.');
  }
};

// Funkcja aktualizująca ofertę pracy
export const updateJobPost = async (id: number, updatedData: { title?: string; description?: string }): Promise<number> => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('title', sql.NVarChar, updatedData.title)
      .input('description', sql.NVarChar, updatedData.description)
      .query('UPDATE dbo.job_posts SET title = @title, description = @description WHERE id = @id');
    console.log(`Zaktualizowano ogłoszenie o ID: ${id}`);
    return result.rowsAffected[0];  // Zwracamy liczbę zmienionych wierszy
  } catch (error) {
    console.error(`Błąd podczas aktualizacji ogłoszenia o ID ${id}:`, error);
    throw new Error('Nie udało się zaktualizować ogłoszenia.');
  }
};

// Funkcja usuwająca ofertę pracy
export const deleteJobPost = async (id: number): Promise<number> => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM dbo.job_posts WHERE id = @id');
    console.log(`Usunięto ogłoszenie o ID: ${id}`);
    return result.rowsAffected[0];  // Zwracamy liczbę zmienionych wierszy
  } catch (error) {
    console.error(`Błąd podczas usuwania ogłoszenia o ID ${id}:`, error);
    throw new Error('Nie udało się usunąć ogłoszenia.');
  }
};
