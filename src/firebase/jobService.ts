import { 
    collection, 
    addDoc, 
    getDocs, 
    doc, 
    updateDoc, 
    deleteDoc 
  } from "firebase/firestore";
  import { db } from "./firebase"; // Import konfiguracji Firebase
  
  // Referencja do kolekcji
  const jobCollection = collection(db, "job_posts");
  
  // Dodawanie ogłoszenia
  export const addJobPost = async (jobData: { title: string; description: string }) => {
    try {
      const docRef = await addDoc(jobCollection, jobData);
      console.log("Dodano nowe ogłoszenie o ID:", docRef.id); // Logowanie
      return docRef.id;
    } catch (error) {
      console.error("Błąd podczas dodawania ogłoszenia:", error); // Obsługa błędu
      throw new Error("Nie udało się dodać ogłoszenia.");
    }
  };
  
  // Pobieranie wszystkich ogłoszeń
  export const getJobPosts = async () => {
    try {
      const querySnapshot = await getDocs(jobCollection);
      const jobList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Pobrano oferty pracy:", jobList); // Logowanie danych
      return jobList;
    } catch (error) {
      console.error("Błąd podczas pobierania ogłoszeń:", error); // Obsługa błędu
      throw new Error("Nie udało się pobrać ogłoszeń.");
    }
  };
  
  // Aktualizacja ogłoszenia
  export const updateJobPost = async (id: string, updatedData: { title?: string; description?: string }) => {
    try {
      const jobDoc = doc(db, "job_posts", id);
      await updateDoc(jobDoc, updatedData);
      console.log(`Zaktualizowano ogłoszenie o ID: ${id}`); // Logowanie
    } catch (error) {
      console.error(`Błąd podczas aktualizacji ogłoszenia o ID ${id}:`, error); // Obsługa błędu
      throw new Error("Nie udało się zaktualizować ogłoszenia.");
    }
  };
  
  // Usuwanie ogłoszenia
  export const deleteJobPost = async (id: string) => {
    try {
      const jobDoc = doc(db, "job_posts", id);
      await deleteDoc(jobDoc);
      console.log(`Usunięto ogłoszenie o ID: ${id}`); // Logowanie
    } catch (error) {
      console.error(`Błąd podczas usuwania ogłoszenia o ID ${id}:`, error); // Obsługa błędu
      throw new Error("Nie udało się usunąć ogłoszenia.");
    }
  };
  