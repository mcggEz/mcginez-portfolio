"use client";

import Link from "next/link";
import { useState } from "react";

// Import the autoAnimate hook
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Noise from '../components/ui/noise';


const projects = [
  {
    title: "Purrfect Choys Report Management System",
    description: "A comprehensive report management system designed for Purrfect Choys Store. This project streamlines data reporting and visualization using React and TailwindCSS, ensuring an intuitive user experience.",
    role: "Fullstack Developer",
    time: "October 2024 - December 2024",
    technologies: ["React", "TailwindCSS", "JavaScript"],
    image: "/pchoys.png",
    logo: "🐾",
    category: "Web",
    link: "https://purrfectchoys.vercel.app/"
  },
  {
    title: "Sacramento Library Management System",
    description: "A robust library management system created for Sacramento Library. Features include book cataloging, user management, and transaction tracking, built with Flutter, Express, and MongoDB.",
    role: "Fullstack Developer",
    time: "January 2025 - March 2025",
    technologies: ["JavaFX", "SQLite"],
    image: "/sacramento-library.png",
    logo: "📚",
    category: "Desktop",
       link: "https://purrfectchoys.vercel.app/"
  },
  {
    title: "Synaps",
    description: "A powerful web application enabling agentic workflows through intelligent automation and modular task orchestration.",
    role: "Fullstack Developer",
    time: "October 2025 - December 2025",
    technologies: ["Next.js", "React", "TypeScript", "LangChain", "Supabase"],
    image: "/synaps.png",
    logo: "⚙️",
    category: "Web",
       link: "https://purrfectchoys.vercel.app/"
  },
  {
    title: "FlipFinds",
    description: "A thrift buying app with a unique UI style.",
    role: "Fullstack Developer",
    time: "February 2025 - April 2025",
    technologies: ["React Native", "Java SpringBoot", "PostgreSQL"],
    image: "/flipfinds.png",
    logo: "🛍️",
    category: "Mobile",
       link: "https://purrfectchoys.vercel.app/"
  },
];

const skills = [
  { name: "HTML", icon: "/html5.svg", color: "bg-orange-500" },
  { name: "CSS", icon: "/css3.svg", color: "bg-blue-500" },
  { name: "JavaScript", icon: "/js.svg", color: "bg-yellow-400" },
  { name: "TypeScript", icon: "/typescript.svg", color: "bg-blue-600" },
  { name: "React", icon: "/react.svg", color: "bg-sky-400" },
  { name: "Node.js", icon: "/nodejs.svg", color: "bg-green-500" },
  { name: "Next.js", icon: "/nextjs.svg", color: "bg-zinc-700" },
  { name: "Firebase", icon: "/firebase.svg", color: "bg-amber-500" },
  { name: "Python", icon: "/python.svg", color: "bg-blue-800" },
];

// Social links
const socialLinks = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/mcginez/", icon: "/linkedin.svg" },
  { name: "GitHub", url: "https://github.com/mcggEz", icon: "/github.svg" },
  { name: "Discord", url: "https://discord.com/users/elonnmusk.", icon: "/discord.svg" },
];

// Define filter categories
const filterCategories = ["All", "Web", "Mobile", "Desktop"];

export default function Home() {
  // State for active filter
  const [activeFilter, setActiveFilter] = useState("All");
  
  // Refs for auto-animate
  const [projectsParent] = useAutoAnimate({ duration: 300, easing: 'ease-in-out' });
  const [skillsParent] = useAutoAnimate();
  
  // Filter projects based on active category
  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white overflow-hidden relative">
      {/* Noise Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Noise
          patternSize={250}
          patternScaleX={1}
          patternScaleY={1}
          patternRefreshInterval={2}
          patternAlpha={15}
        />
      </div>
      
      {/* Header with social links */}
      <header className="fixed top-0 w-full z-50 py-4 px-6 flex justify-between items-center bg-black/0 backdrop-blur-sm">
        <Link href="/" className="text-xl font-semibold hover:text-zinc-300 transition"><img src="/m.png" alt="" className="h-7 w-7" /></Link>
        <div className="flex items-center gap-4">
          {socialLinks.map((link, index) => (
            <Link 
              key={index} 
              href={link.url} 
              className="text-zinc-400 hover:text-white transition" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative px-6 py-32 flex flex-col items-center justify-center min-h-screen border-b border-zinc-800">
        <div className="absolute right-0 top-10 opacity-10 z-0">
          <div className="grid grid-cols-3 gap-6">
            {skills.map((skill, i) => (
              <div key={i} className={`w-16 h-16 rounded-full ${skill.color} flex items-center justify-center opacity-60`}>
                {skill.name.charAt(0)}
              </div>
            ))}
          </div>
        </div>
        
        <div className="container max-w-4xl mx-auto z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Mc Giberri Ginez
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 mb-8">Computer Engineering Student</p>
          
          <div className="flex flex-wrap gap-2 mb-8" ref={skillsParent}>
            {skills.slice(0, 5).map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300">
                {skill.name}
              </span>
            ))}
          </div>
          
          <p className="text-lg text-zinc-400 max-w-2xl mb-10">
            My path in technology began at <Link href="https://plm.edu.ph" className="text-blue-400 hover:underline" target="_blank">Pamantasan ng Lungsod ng Maynila</Link>, where I pursued a <span className="text-white">Bachelor of Science in Computer Engineering</span> degree. Since then, I&apos;ve been eager to get my feet on the door—exploring how to turn ideas into innovative and impactful software solutions.
          </p>
          
          <p className="text-lg text-zinc-400 max-w-2xl mb-10">
            Throughout my academic journey, I&apos;ve built a strong foundation in software development, working on various projects both as part of my coursework and through voluntary initiatives. I&apos;ve been tasked with developing software solutions as requirements for specific subjects, allowing me to gain hands-on experience in real-world applications.
          </p>
          
          <div className="flex gap-4">
            <Link 
              href="https://docs.google.com/document/d/13Dm_cSG3F2RvN-22yBlu8wFPp0fDlK4elHTCMSlm0Z0/edit?tab=t.0" 
              className="px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-zinc-200 transition"
                target="_blank"
  rel="noopener noreferrer"
            >
              View Resumé
            </Link>
            <Link 
              href="#projects" 
              className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition"
            >
              See Projects
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="text-zinc-500 text-sm mb-2">Scroll Down</span>
          <div className="w-5 h-10 border-2 border-zinc-500 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-zinc-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="py-24 px-6 border-b border-zinc-800">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Technical Skills</h2>
          
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-6 justify-items-center" ref={skillsParent}>
            {skills.map((skill, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-16 h-16 ${skill.color} rounded-xl flex items-center justify-center mb-2`}>
                  {skill.name.charAt(0)}
                </div>
                <span className="text-sm text-zinc-400">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 border-b border-zinc-800">
        <div className="container max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
            <h2 className="text-3xl font-bold">Projects</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {filterCategories.map((category) => (
                <button 
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-md transition-all ${
                    activeFilter === category 
                      ? 'bg-white text-black' 
                      : 'bg-transparent text-zinc-400 hover:bg-zinc-900'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" ref={projectsParent}>
            {filteredProjects.map((project) => (
              <div key={project.title} className="bg-[#1a1a1a] rounded-xl overflow-hidden group hover:bg-zinc-800 transition-all">
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <span className="text-3xl">{project.logo}</span>
                  </div>
                  <p className="text-zinc-400 text-sm mb-4">{project.description}</p>
                  <div className="mb-4">
                    <p className="text-zinc-500 text-sm mb-1">Role: <span className="text-zinc-300">{project.role}</span></p>
                    <p className="text-zinc-500 text-sm">Time: <span className="text-zinc-300">{project.time}</span></p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-zinc-800 group-hover:bg-zinc-700 text-xs text-zinc-300 rounded-full transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div>
                    <Link href={project.link} className="mt-4 inline-block text-sm text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                      View Project  
                      <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l9 9-9 9-9-9z"></path></svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-10">
              <p className="text-zinc-400">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-24 px-6 border-b border-zinc-800">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Let&apos;s Connect</h2>
          <p className="text-zinc-400 max-w-lg mx-auto mb-8">
            Interested in working together? Feel free to reach out for collaborations or just a friendly hello.
          </p>
          <Link 
            href="mailto:mcgiberri@example.com" 
            className="px-8 py-4 bg-white text-black font-medium rounded-md hover:bg-zinc-200 transition inline-block"
          >
            Say Hello
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-6 bg-zinc-950">
        <div className="container max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-zinc-500 mb-4 md:mb-0">Last Updated 2020-4-21 © 2025</p>
            <div className="flex gap-6">
              {socialLinks.map((link, index) => (
                <Link 
                  key={index} 
                  href={link.url} 
                  className="text-zinc-400 hover:text-white transition" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
