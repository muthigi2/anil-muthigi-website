import React, { useEffect, useState } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Blog from "./components/Blog";
import './App.css';

const sectionIds = [
  'about',
  'education',
  'experience',
  'projects',
  'blog',
  'achievements',
  'contact',
];

function getSectionComponent(section, resume) {
  switch (section) {
    case 'about':
      return <About summary={resume.summary} funFacts={resume.funFacts} badges={resume.badges} />;
    case 'education':
      return <Education education={resume.education} />;
    case 'experience':
      return <Experience experience={resume.experience} />;
    case 'projects':
      return <Projects projects={resume.projects} />;
    case 'blog':
      return <Blog />;
    case 'achievements':
      return <Achievements achievements={resume.achievements} />;
    case 'contact':
      return <Contact contact={resume.contact} />;
    default:
      return null;
  }
}

function App() {
  const [resume, setResume] = useState(null);
  const [currentSection, setCurrentSection] = useState('about');

  const BASE = import.meta.env.BASE_URL || '/';

  useEffect(() => {
    // Default to light theme
    document.body.classList.add('light-theme');
  }, []);

  useEffect(() => {
    fetch(`resume.json`)
      .then((res) => res.json())
      .then(setResume);
  }, []);

  if (!resume) return <div>Loading...</div>;

  return (
    <>
      <Navbar currentSection={currentSection} setCurrentSection={setCurrentSection} />
      <div className="container" style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
        <Hero name={resume.name} imageUrl={`profile.jpg`} contact={resume.contact} tagline="Turning ideas into code, and code into impact." funFacts={resume.funFacts} badges={resume.badges} />
        <div style={{marginTop: '2.5rem', flex: 1, animation: 'fadeInUp 0.7s'}}>
          {getSectionComponent(currentSection, resume)}
        </div>
      </div>
    </>
  );
}

export default App;
