'use client';

import React, { useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvided,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import './upload-cv.css';

// Typy dla sekcji CV
type EducationType = {
  institution: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  currentlyStudying: boolean;
};

type ExperienceType = {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  stillEmployed: boolean;
  duties: string;
};

type ProjectType = {
  name: string;
  description: string;
  link: string;
  file: File | null;
};

type CVData = {
  name: string;
  surname: string;
  aboutMe: string;
  email: string;
  phone: string;
  address: string;
  photo: File | null;
  education: EducationType[];
  experience: ExperienceType[];
  projects: ProjectType[];
  languages: string[];
  courses: string[];
};

// Sekcja podglądu (drag & drop)
type SectionType = { id: string; label: string };

export default function CreateCV() {
  // Wybór szablonu
  const [templateCategory, setTemplateCategory] = useState<'free' | 'premium'>('free');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('klasycznyFree');
  // Flaga określająca, czy użytkownik opłacił wersję premium
  const [premiumUnlocked] = useState<boolean>(false);

  // Baza szablonów – 8 darmowych i 8 premium
  const freeTemplates = [
    { id: 'klasycznyFree', name: 'Klasyczny' },
    { id: 'nowoczesnyFree', name: 'Nowoczesny' },
    { id: 'minimalistycznyFree', name: 'Minimalistyczny' },
    { id: 'kreatywnyFree', name: 'Kreatywny' },
    { id: 'dynamicznyFree', name: 'Dynamiczny' },
    { id: 'konwencjonalnyFree', name: 'Konwencjonalny' },
    { id: 'funkcjonalnyFree', name: 'Funkcjonalny' },
    { id: 'przejrzystyFree', name: 'Przejrzysty' },
  ];

  const premiumTemplates = [
    { id: 'profesjonalnyPremium', name: 'Profesjonalny' },
    { id: 'executivePremium', name: 'Executive' },
    { id: 'artystycznyPremium', name: 'Artystyczny' },
    { id: 'innowacyjnyPremium', name: 'Innowacyjny' },
    { id: 'sformalizowanyPremium', name: 'Sformalizowany' },
    { id: 'zbalansowanyPremium', name: 'Zbalansowany' },
    { id: 'inspiracyjnyPremium', name: 'Inspiracyjny' },
    { id: 'nowatorskiPremium', name: 'Nowatorski' },
  ];

  // Dane CV
  const [formData, setFormData] = useState<CVData>({
    name: '',
    surname: '',
    aboutMe: '',
    email: '',
    phone: '',
    address: '',
    photo: null,
    education: [],
    experience: [],
    projects: [],
    languages: [],
    courses: [],
  });

  // Stany dla sekcji edukacji
  const [newEducation, setNewEducation] = useState<EducationType>({
    institution: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    currentlyStudying: false,
  });
  const [editingEducationIndex, setEditingEducationIndex] = useState<number | null>(null);
  const [showEducationForm, setShowEducationForm] = useState(false);

  // Stany dla sekcji doświadczenia
  const [newExperience, setNewExperience] = useState<ExperienceType>({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    stillEmployed: false,
    duties: '',
  });
  const [editingExperienceIndex, setEditingExperienceIndex] = useState<number | null>(null);
  const [showExperienceForm, setShowExperienceForm] = useState(false);

  // Stany dla projektów
  const [newProject, setNewProject] = useState<ProjectType>({
    name: '',
    description: '',
    link: '',
    file: null,
  });
  const [editingProjectIndex, setEditingProjectIndex] = useState<number | null>(null);

  // Stany dla języków i kursów
  const [newLanguage, setNewLanguage] = useState('');
  const [editingLanguageIndex, setEditingLanguageIndex] = useState<number | null>(null);
  const [newCourse, setNewCourse] = useState('');
  const [editingCourseIndex, setEditingCourseIndex] = useState<number | null>(null);

  // Obsługa zmian prostych pól
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'aboutMe' && value.length > 300) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setFormData((prev) => ({ ...prev, photo: file || null }));
  };

  // Funkcje dla sekcji edukacji
  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEducation((prev) => ({ ...prev, [name]: value }));
  };

  const handleEducationCheckboxChange = () => {
    setNewEducation((prev) => ({ ...prev, currentlyStudying: !prev.currentlyStudying, endDate: '' }));
  };

  const handleSaveEducation = () => {
    if (!newEducation.institution || !newEducation.fieldOfStudy || !newEducation.startDate) {
      alert('Wypełnij wszystkie pola wykształcenia.');
      return;
    }
    if (editingEducationIndex !== null) {
      setFormData((prev) => {
        const updated = [...prev.education];
        updated[editingEducationIndex] = {
          ...newEducation,
          endDate: newEducation.currentlyStudying ? 'Obecnie' : newEducation.endDate,
        };
        return { ...prev, education: updated };
      });
      setEditingEducationIndex(null);
    } else {
      setFormData((prev) => ({
        ...prev,
        education: [
          ...prev.education,
          { ...newEducation, endDate: newEducation.currentlyStudying ? 'Obecnie' : newEducation.endDate },
        ],
      }));
    }
    setNewEducation({ institution: '', fieldOfStudy: '', startDate: '', endDate: '', currentlyStudying: false });
    setShowEducationForm(false);
  };

  const handleEditEducation = (index: number) => {
    const edu = formData.education[index];
    setNewEducation({
      institution: edu.institution,
      fieldOfStudy: edu.fieldOfStudy,
      startDate: edu.startDate,
      endDate: edu.currentlyStudying ? '' : edu.endDate,
      currentlyStudying: edu.currentlyStudying,
    });
    setEditingEducationIndex(index);
    setShowEducationForm(true);
  };

  const handleRemoveEducation = (index: number) => {
    setFormData((prev) => ({ ...prev, education: prev.education.filter((_, i) => i !== index) }));
  };

  // Funkcje dla sekcji doświadczenia
  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewExperience((prev) => ({ ...prev, [name]: value }));
  };

  const handleExperienceCheckboxChange = () => {
    setNewExperience((prev) => ({ ...prev, stillEmployed: !prev.stillEmployed, endDate: '' }));
  };

  const handleSaveExperience = () => {
    if (!newExperience.company || !newExperience.position || !newExperience.startDate) {
      alert('Wypełnij wszystkie pola doświadczenia.');
      return;
    }
    if (editingExperienceIndex !== null) {
      setFormData((prev) => {
        const updated = [...prev.experience];
        updated[editingExperienceIndex] = {
          ...newExperience,
          endDate: newExperience.stillEmployed ? 'Obecnie' : newExperience.endDate,
        };
        return { ...prev, experience: updated };
      });
      setEditingExperienceIndex(null);
    } else {
      setFormData((prev) => ({
        ...prev,
        experience: [
          ...prev.experience,
          { ...newExperience, endDate: newExperience.stillEmployed ? 'Obecnie' : newExperience.endDate },
        ],
      }));
    }
    setNewExperience({ company: '', position: '', startDate: '', endDate: '', stillEmployed: false, duties: '' });
    setShowExperienceForm(false);
  };

  const handleEditExperience = (index: number) => {
    const exp = formData.experience[index];
    setNewExperience({
      company: exp.company,
      position: exp.position,
      startDate: exp.startDate,
      endDate: exp.stillEmployed ? '' : exp.endDate,
      stillEmployed: exp.stillEmployed,
      duties: exp.duties,
    });
    setEditingExperienceIndex(index);
    setShowExperienceForm(true);
  };

  const handleRemoveExperience = (index: number) => {
    setFormData((prev) => ({ ...prev, experience: prev.experience.filter((_, i) => i !== index) }));
  };

  // Funkcje dla sekcji projektów
  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleProjectFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setNewProject((prev) => ({ ...prev, file: file || null }));
  };

  const handleSaveProject = () => {
    if (!newProject.name || !newProject.link) {
      alert('Wypełnij wszystkie pola projektu.');
      return;
    }
    if (editingProjectIndex !== null) {
      setFormData((prev) => {
        const updated = [...prev.projects];
        updated[editingProjectIndex] = { ...newProject };
        return { ...prev, projects: updated };
      });
      setEditingProjectIndex(null);
    } else {
      setFormData((prev) => ({ ...prev, projects: [...prev.projects, { ...newProject }] }));
    }
    setNewProject({ name: '', description: '', link: '', file: null });
  };

  const handleEditProject = (index: number) => {
    const proj = formData.projects[index];
    setNewProject(proj);
    setEditingProjectIndex(index);
  };

  const handleRemoveProject = (index: number) => {
    setFormData((prev) => ({ ...prev, projects: prev.projects.filter((_, i) => i !== index) }));
  };

  // Funkcje dla sekcji języków
  const handleAddLanguage = () => {
    if (newLanguage.trim() === '') return;
    if (editingLanguageIndex !== null) {
      setFormData((prev) => {
        const updated = [...prev.languages];
        updated[editingLanguageIndex] = newLanguage;
        return { ...prev, languages: updated };
      });
      setEditingLanguageIndex(null);
    } else {
      setFormData((prev) => ({ ...prev, languages: [...prev.languages, newLanguage] }));
    }
    setNewLanguage('');
  };

  const handleEditLanguage = (index: number) => {
    setNewLanguage(formData.languages[index]);
    setEditingLanguageIndex(index);
  };

  const handleRemoveLanguage = (index: number) => {
    setFormData((prev) => ({ ...prev, languages: prev.languages.filter((_, i) => i !== index) }));
    if (editingLanguageIndex === index) {
      setNewLanguage('');
      setEditingLanguageIndex(null);
    }
  };

  // Funkcje dla sekcji kursów
  const handleAddCourse = () => {
    if (newCourse.trim() === '') return;
    if (editingCourseIndex !== null) {
      setFormData((prev) => {
        const updated = [...prev.courses];
        updated[editingCourseIndex] = newCourse;
        return { ...prev, courses: updated };
      });
      setEditingCourseIndex(null);
    } else {
      setFormData((prev) => ({ ...prev, courses: [...prev.courses, newCourse] }));
    }
    setNewCourse('');
  };

  const handleEditCourse = (index: number) => {
    setNewCourse(formData.courses[index]);
    setEditingCourseIndex(index);
  };

  const handleRemoveCourse = (index: number) => {
    setFormData((prev) => ({ ...prev, courses: prev.courses.filter((_, i) => i !== index) }));
    if (editingCourseIndex === index) {
      setNewCourse('');
      setEditingCourseIndex(null);
    }
  };

  // Sekcja podglądu – kolejność sekcji (drag & drop)
  const initialSections: SectionType[] = [
    { id: 'aboutMe', label: 'O mnie' },
    { id: 'education', label: 'Wykształcenie' },
    { id: 'experience', label: 'Doświadczenie' },
    { id: 'projects', label: 'Projekty' },
    { id: 'languages', label: 'Języki' },
    { id: 'courses', label: 'Kursy' },
  ];
  const [sectionOrder, setSectionOrder] = useState<SectionType[]>(initialSections);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newOrder = Array.from(sectionOrder);
    const [moved] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, moved);
    setSectionOrder(newOrder);
  };

  // Funkcje eksportu
  const handleExportWord = () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [new TextRun(`${formData.name} ${formData.surname}`)],
            }),
          ],
        },
      ],
    });
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, 'CV.docx');
    });
  };

  const handleExportHTML = () => {
    const preview = document.getElementById('cv-preview-content');
    if (preview) {
      const html = preview.innerHTML;
      const blob = new Blob([html], { type: 'text/html' });
      saveAs(blob, 'CV.html');
    }
  };

  // Funkcja przekierowująca do okienka płatności
  const handlePaymentRedirect = () => {
    // Przykładowe przekierowanie – w rzeczywistości można wywołać modal płatności
    window.location.href = '/payment';
  };

  return (
    <div className="create-cv-container">
      {/* Wybór szablonu */}
      <div className="template-selector">
        <h3>Wybierz szablon</h3>
        <div className="template-tabs">
          <button
            className={templateCategory === 'free' ? 'active' : ''}
            onClick={() => {
              setTemplateCategory('free');
              setSelectedTemplate(freeTemplates[0].id);
            }}
          >
            Szablony darmowe
          </button>
          <button
            className={templateCategory === 'premium' ? 'active' : ''}
            onClick={() => {
              // Użytkownik może wybrać szablon premium, nawet jeśli nie zapłacił – eksport będzie zablokowany
              setTemplateCategory('premium');
            }}
          >
            Szablony premium
          </button>
        </div>
        <div className="template-grid">
          {(templateCategory === 'free' ? freeTemplates : premiumTemplates).map((tpl) => (
            <div
              key={tpl.id}
              className={`template-item ${selectedTemplate === tpl.id ? 'selected' : ''}`}
              onClick={() => {
                if (templateCategory === 'premium' && !premiumUnlocked) {
                  setSelectedTemplate(tpl.id);
                } else {
                  setSelectedTemplate(tpl.id);
                }
              }}
            >
              <p>{tpl.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Formularz CV */}
      <div className="create-cv-content">
        <div className="create-cv-form">
          <h3>Podaj dane</h3>
          {/* Dane podstawowe */}
          <div className="form-group">
            <label>Imię:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Wpisz imię" />
          </div>
          <div className="form-group">
            <label>Nazwisko:</label>
            <input type="text" name="surname" value={formData.surname} onChange={handleChange} placeholder="Wpisz nazwisko" />
          </div>
          <div className="form-group">
            <label>Adres:</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Wpisz adres" />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Wpisz email" />
          </div>
          <div className="form-group">
            <label>Telefon:</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Wpisz telefon" />
          </div>
          <div className="form-group">
            <label>O mnie:</label>
            <textarea name="aboutMe" value={formData.aboutMe} onChange={handleChange} placeholder="Opowiedz coś o sobie" maxLength={300} />
            <small>{formData.aboutMe.length}/300</small>
          </div>

          {/* Sekcja wykształcenia */}
          <div className="form-group">
            <label>Wykształcenie:</label>
            {formData.education.length === 0 ? (
              <p>Brak dodanego wykształcenia</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Instytucja</th>
                    <th>Kierunek</th>
                    <th>Okres</th>
                    <th>Akcje</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.education.map((edu, index) => (
                    <tr key={index}>
                      <td>{edu.institution}</td>
                      <td>{edu.fieldOfStudy}</td>
                      <td>{edu.startDate} - {edu.endDate}</td>
                      <td>
                        <button onClick={() => handleEditEducation(index)}>Edytuj</button>
                        <button onClick={() => handleRemoveEducation(index)}>Usuń</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {showEducationForm ? (
              <div className="education-form">
                <div className="form-group">
                  <label>Instytucja:</label>
                  <input type="text" name="institution" value={newEducation.institution} onChange={handleEducationChange} placeholder="Wpisz instytucję" />
                </div>
                <div className="form-group">
                  <label>Kierunek:</label>
                  <input type="text" name="fieldOfStudy" value={newEducation.fieldOfStudy} onChange={handleEducationChange} placeholder="Wpisz kierunek" />
                </div>
                <div className="form-group">
                  <label>Data rozpoczęcia:</label>
                  <input type="text" name="startDate" value={newEducation.startDate} onChange={handleEducationChange} placeholder="dd-mm-yyyy" />
                </div>
                <div className="form-group">
                  <label>Data zakończenia:</label>
                  {newEducation.currentlyStudying ? (
                    <input type="text" name="endDate" value="Obecnie" readOnly />
                  ) : (
                    <input type="text" name="endDate" value={newEducation.endDate} onChange={handleEducationChange} placeholder="dd-mm-yyyy" />
                  )}
                </div>
                <div className="form-group">
                  <label>Obecnie studiuję:</label>
                  <input type="checkbox" name="currentlyStudying" checked={newEducation.currentlyStudying} onChange={handleEducationCheckboxChange} />
                </div>
                <button onClick={handleSaveEducation}>{editingEducationIndex !== null ? 'Aktualizuj wykształcenie' : 'Dodaj wykształcenie'}</button>
                <button onClick={() => { setShowEducationForm(false); setEditingEducationIndex(null); setNewEducation({ institution: '', fieldOfStudy: '', startDate: '', endDate: '', currentlyStudying: false }); }}>Anuluj</button>
              </div>
            ) : (
              <button onClick={() => { setShowEducationForm(true); setEditingEducationIndex(null); setNewEducation({ institution: '', fieldOfStudy: '', startDate: '', endDate: '', currentlyStudying: false }); }}>
                Dodaj wykształcenie
              </button>
            )}
          </div>

          {/* Sekcja doświadczenia */}
          <div className="form-group">
            <label>Doświadczenie:</label>
            {formData.experience.length === 0 ? (
              <p>Brak dodanego doświadczenia</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Firma</th>
                    <th>Stanowisko</th>
                    <th>Okres</th>
                    <th>Akcje</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.experience.map((exp, index) => (
                    <tr key={index}>
                      <td>{exp.company}</td>
                      <td>{exp.position}</td>
                      <td>{exp.startDate} - {exp.endDate}</td>
                      <td>
                        <button onClick={() => handleEditExperience(index)}>Edytuj</button>
                        <button onClick={() => handleRemoveExperience(index)}>Usuń</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {showExperienceForm ? (
              <div className="experience-form">
                <div className="form-group">
                  <label>Firma:</label>
                  <input type="text" name="company" value={newExperience.company} onChange={handleExperienceChange} placeholder="Wpisz firmę" />
                </div>
                <div className="form-group">
                  <label>Stanowisko:</label>
                  <input type="text" name="position" value={newExperience.position} onChange={handleExperienceChange} placeholder="Wpisz stanowisko" />
                </div>
                <div className="form-group">
                  <label>Obowiązki:</label>
                  <textarea name="duties" value={newExperience.duties} onChange={handleExperienceChange} placeholder="Wpisz obowiązki"></textarea>
                </div>
                <div className="form-group">
                  <label>Data rozpoczęcia:</label>
                  <input type="text" name="startDate" value={newExperience.startDate} onChange={handleExperienceChange} placeholder="dd-mm-yyyy" />
                </div>
                <div className="form-group">
                  <label>Data zakończenia:</label>
                  {newExperience.stillEmployed ? (
                    <input type="text" name="endDate" value="Obecnie" readOnly />
                  ) : (
                    <input type="text" name="endDate" value={newExperience.endDate} onChange={handleExperienceChange} placeholder="dd-mm-yyyy" />
                  )}
                </div>
                <div className="form-group">
                  <label>Nadal zatrudniony:</label>
                  <input type="checkbox" name="stillEmployed" checked={newExperience.stillEmployed} onChange={handleExperienceCheckboxChange} />
                </div>
                <button onClick={handleSaveExperience}>{editingExperienceIndex !== null ? 'Aktualizuj doświadczenie' : 'Dodaj doświadczenie'}</button>
                <button onClick={() => { setShowExperienceForm(false); setEditingExperienceIndex(null); setNewExperience({ company: '', position: '', startDate: '', endDate: '', stillEmployed: false, duties: '' }); }}>Anuluj</button>
              </div>
            ) : (
              <button onClick={() => { setShowExperienceForm(true); setEditingExperienceIndex(null); setNewExperience({ company: '', position: '', startDate: '', endDate: '', stillEmployed: false, duties: '' }); }}>
                Dodaj doświadczenie
              </button>
            )}
          </div>

          {/* Sekcja projektów */}
          <div className="form-group">
            <label>Projekty:</label>
            {formData.projects.length === 0 ? (
              <p>Brak dodanych projektów</p>
            ) : (
              <ul>
                {formData.projects.map((proj, index) => (
                  <li key={index}>
                    {proj.name} - <a href={proj.link} target="_blank" rel="noreferrer">Zobacz projekt</a>
                    <button onClick={() => handleEditProject(index)}>Edytuj</button>
                    <button onClick={() => handleRemoveProject(index)}>Usuń</button>
                  </li>
                ))}
              </ul>
            )}
            <div className="project-form">
              <input type="text" name="name" value={newProject.name} onChange={handleProjectChange} placeholder="Nazwa projektu" />
              <textarea name="description" value={newProject.description} onChange={handleProjectChange} placeholder="Opis projektu"></textarea>
              <input type="text" name="link" value={newProject.link} onChange={handleProjectChange} placeholder="Link do projektu" />
              <input type="file" onChange={handleProjectFileChange} />
              <button onClick={handleSaveProject}>{editingProjectIndex !== null ? 'Aktualizuj projekt' : 'Dodaj projekt'}</button>
            </div>
          </div>

          {/* Sekcja języków */}
          <div className="form-group">
            <label>Języki:</label>
            {formData.languages.length === 0 ? (
              <p>Brak dodanych języków</p>
            ) : (
              <ul>
                {formData.languages.map((lang, index) => (
                  <li key={index}>
                    {lang} <button onClick={() => handleEditLanguage(index)}>Edytuj</button> <button onClick={() => handleRemoveLanguage(index)}>Usuń</button>
                  </li>
                ))}
              </ul>
            )}
            <input type="text" value={newLanguage} onChange={(e) => setNewLanguage(e.target.value)} placeholder="Dodaj język" />
            <button onClick={handleAddLanguage}>Dodaj język</button>
          </div>

          {/* Sekcja kursów */}
          <div className="form-group">
            <label>Kursy:</label>
            {formData.courses.length === 0 ? (
              <p>Brak dodanych kursów</p>
            ) : (
              <ul>
                {formData.courses.map((course, index) => (
                  <li key={index}>
                    {course} <button onClick={() => handleEditCourse(index)}>Edytuj</button> <button onClick={() => handleRemoveCourse(index)}>Usuń</button>
                  </li>
                ))}
              </ul>
            )}
            <input type="text" value={newCourse} onChange={(e) => setNewCourse(e.target.value)} placeholder="Dodaj kurs" />
            <button onClick={handleAddCourse}>Dodaj kurs</button>
          </div>

          {/* Sekcja zdjęcia */}
          <div className="form-group">
            <label>Zdjęcie:</label>
            <input type="file" name="photo" onChange={handleFileChange} />
          </div>
          <button className="save-cv-btn">Zapisz CV</button>
        </div>

        {/* Podgląd CV */}
        <div className="create-cv-preview">
          <h3>Podgląd CV</h3>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="cv-preview-sections">
              {(provided: DroppableProvided) => (
                <div
                  id="cv-preview-content"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`cv-preview cv-preview-${selectedTemplate}`}
                >
                  <h4>{formData.name} {formData.surname}</h4>
                  <p>Adres: {formData.address}</p>
                  <p>Email: {formData.email}</p>
                  <p>Telefon: {formData.phone}</p>
                  <p>O mnie: {formData.aboutMe}</p>
                  {sectionOrder.map((section, index) => (
                    <Draggable key={section.id} draggableId={section.id} index={index}>
                      {(provided: DraggableProvided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{ marginBottom: '20px', border: '1px dashed #ccc', padding: '10px', ...provided.draggableProps.style }}
                        >
                          <h5>{section.label}</h5>
                          <p>Treść sekcji {section.label}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {templateCategory === 'premium' && !premiumUnlocked ? (
            <button onClick={handlePaymentRedirect} className="payment-btn">
              Zapłać, aby pobrać plik
            </button>
          ) : (
            <>
              <button onClick={handleExportWord}>Eksport do Worda</button>
              <button onClick={handleExportHTML}>Eksport do HTML</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
