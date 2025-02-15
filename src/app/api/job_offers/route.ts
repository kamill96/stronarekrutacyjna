import { NextResponse } from 'next/server';
import { addJobPost, getJobPosts, updateJobPost, deleteJobPost } from '../../../firebase/jobService';

// GET - pobiera wszystkie oferty pracy
export async function GET() {
  try {
    const jobPosts = await getJobPosts();  // Pobiera oferty pracy z MSSQL
    return NextResponse.json(jobPosts);    // Zwraca oferty jako JSON
  } catch (error: unknown) {
    console.error('Błąd podczas pobierania ofert pracy:', error);
    return NextResponse.json({ error: 'Nie udało się pobrać ofert pracy' }, { status: 500 });
  }
}

// POST - dodaje nową ofertę pracy
export async function POST(request: Request) {
  try {
    const jobData = await request.json();  // Pobiera dane z ciała żądania
    // Weryfikacja, czy wymagane pola są obecne
    if (!jobData.title || !jobData.description) {
      return NextResponse.json({ error: 'Brakuje wymaganych pól (title, description)' }, { status: 400 });
    }
    const newJobId = await addJobPost({ title: jobData.title, description: jobData.description });
    return NextResponse.json({ message: 'Ogłoszenie zostało dodane', jobId: newJobId }, { status: 201 });
  } catch (error: unknown) {
    console.error('Błąd podczas dodawania ogłoszenia:', error);
    return NextResponse.json({ error: 'Nie udało się dodać ogłoszenia' }, { status: 500 });
  }
}

// PUT - aktualizuje ofertę pracy
export async function PUT(request: Request) {
  try {
    const { id, title, description } = await request.json();
    // Weryfikacja danych wejściowych
    if (!id || (!title && !description)) {
      return NextResponse.json({ error: 'Brakuje wymaganych pól (id, title lub description)' }, { status: 400 });
    }
    await updateJobPost(id, { title, description });
    return NextResponse.json({ message: `Ogłoszenie o ID: ${id} zostało zaktualizowane` }, { status: 200 });
  } catch (error: unknown) {
    console.error('Błąd podczas aktualizacji ogłoszenia:', error);
    return NextResponse.json({ error: 'Nie udało się zaktualizować ogłoszenia' }, { status: 500 });
  }
}

// DELETE - usuwa ofertę pracy
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Brakuje pola ID' }, { status: 400 });
    }
    await deleteJobPost(id);
    return NextResponse.json({ message: `Ogłoszenie o ID: ${id} zostało usunięte` }, { status: 200 });
  } catch (error: unknown) {
    console.error('Błąd podczas usuwania ogłoszenia:', error);
    return NextResponse.json({ error: 'Nie udało się usunąć ogłoszenia' }, { status: 500 });
  }
}
