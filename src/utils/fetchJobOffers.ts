import axios from 'axios';

export const fetchJobOffers = async () => {
  try {
    const response = await axios.get('https://justjoin.it/api/offers'); // Pobieranie ofert z API
    return response.data; // Zakładamy, że odpowiedź jest w formacie JSON
  } catch (error) {
    console.error('Błąd podczas pobierania ofert pracy:', error);
    throw new Error('Nie udało się pobrać ofert pracy.');
  }
};
