"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Mail, 
  ArrowUpRight, 
  Cpu, 
  Cloud, 
  Smartphone, 
  Code2, 
  Menu, 
  X, 
  Terminal,
  Globe,
  Moon,
  Sun,
  Palette,
  Check
} from 'lucide-react';

/**
 * Hook for scroll reveal animations
 */
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    });
    const currentElement = domRef.current;
    if (currentElement) observer.observe(currentElement);
    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, []);

  return [domRef, isVisible] as const;
};

const Reveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      } ${className}`}
    >
      {children}
    </div>
  );
};

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [activeTheme, setActiveTheme] = useState('monotone');

  // Toggle Theme (Dark/Light)
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Smooth scroll
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Theme Configurations
  const themes = {
    monotone: {
      name: "Monotone",
      base: "zinc",
      accent: "zinc",
      textAccent: "text-zinc-900 dark:text-white",
      bgAccent: "bg-zinc-900 dark:bg-white",
      borderAccent: "border-zinc-900 dark:border-white",
      gradient: "from-zinc-500 to-zinc-300",
      buttonText: "text-white dark:text-black"
    },
    forest: {
      name: "Forest",
      base: "slate",
      accent: "emerald",
      textAccent: "text-emerald-600 dark:text-emerald-400",
      bgAccent: "bg-emerald-600 dark:bg-emerald-500",
      borderAccent: "border-emerald-600 dark:border-emerald-500",
      gradient: "from-emerald-500 to-teal-400",
      buttonText: "text-white"
    },
    nebula: {
      name: "Nebula",
      base: "neutral",
      accent: "violet",
      textAccent: "text-violet-600 dark:text-violet-400",
      bgAccent: "bg-violet-600 dark:bg-violet-500",
      borderAccent: "border-violet-600 dark:border-violet-500",
      gradient: "from-violet-500 to-fuchsia-400",
      buttonText: "text-white"
    },
    ocean: {
      name: "Ocean",
      base: "slate",
      accent: "cyan",
      textAccent: "text-cyan-600 dark:text-cyan-400",
      bgAccent: "bg-cyan-600 dark:bg-cyan-500",
      borderAccent: "border-cyan-600 dark:border-cyan-500",
      gradient: "from-cyan-500 to-blue-400",
      buttonText: "text-white dark:text-black"
    }
  };

  const currentTheme = themes[activeTheme as keyof typeof themes];

  // Helper to construct dynamic classes
  const getBaseBg = () => {
    if (activeTheme === 'monotone') return "bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-black";
    if (activeTheme === 'forest') return "bg-slate-50 dark:bg-[#0a1116] text-slate-900 dark:text-slate-100 selection:bg-emerald-500 selection:text-white";
    if (activeTheme === 'nebula') return "bg-neutral-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-100 selection:bg-violet-500 selection:text-white";
    if (activeTheme === 'ocean') return "bg-slate-50 dark:bg-[#0b1120] text-slate-900 dark:text-slate-100 selection:bg-cyan-500 selection:text-black";
    return "bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-black";
  };

  // Portfolio Data
  const data = {
    name: "Mc Giberri M. Ginez",
    role: "Fullstack AI & Cloud Engineer",
    location: "Manila, PH",
    email: "mcgiber.179@gmail.com",
    github: "https://github.com/mcggEz",
    linkedin: "https://www.linkedin.com/in/mcgiberri-ginez", 
    
    // Marquee Skills
    techStack: [
      "Next.js 14", "React", "TypeScript", "TailwindCSS", "Node.js", 
      "Laravel", "Supabase", "Firebase", "PostgreSQL", "MongoDB",
      "Gemini API", "OpenAI", "RAG Pipelines", "Vector DBs",
      "AWS (EC2, S3)", "Google Cloud", "Docker", 
      "Flutter", "React Native", "Electron.js", "IoT"
    ],

    projects: [
      {
        title: "Kippap Learning Portal",
        category: "Web • EdTech",
        desc: "Reviewing for the Civil Engineering Board Exam is made much easier and more convenient with Kippap's high quality and repeatable lecture videos.",
        tech: ["Laravel", "SQL", "TDD"],
        link: "https://portal.kippap.com",
      },
      {
        title: "Kippap Mobile App",
        category: "Mobile • EdTech",
        desc: "Official mobile application for Kippap Learning Corp, featuring course management and discussion forums.",
        tech: ["Flutter", "Figma"],
        link: "#",
      },
      {
        title: "Sacramento Library System",
        category: "Desktop • Electron",
        desc: "Cross-platform desktop application built with Electron.js to modernize traditional library operations, improving efficiency in managing library resources.",
        tech: ["Electron.js", "React", "Desktop"],
        link: "#",
      },
      {
        title: "Iwas Huli",
        category: "Web • Navigation",
        desc: "Navigate Manila's Roads with Confidence. Get real-time alerts about traffic violation hotspots and stay informed to avoid fines.",
        tech: ["Next.js", "React"],
        link: "https://iwas-huli-ph.vercel.app",
      },
      {
        title: "MicroView AI",
        category: "Thesis • AI & IoT",
        desc: "Automated microscopy urinalysis system using YOLOv11 and Gemini 2.5 Pro VLM for explainable medical analysis.",
        tech: ["Next.js", "Python", "Raspberry Pi", "Gemini VLM"],
        link: "https://github.com/mcggEz/microview-ai",
      },
      {
        title: "SK Council Website",
        category: "Web • Public Service",
        desc: "Official digital platform for Barangay 828 Sangguniang Kabataan. Core features like the digital grievance system were adapted from my 'Sigla' hackathon project to enhance transparency.",
        tech: ["Next.js", "Tailwind", "Gemini"],
        link: "#",
      },
      {
        title: "Synaps",
        category: "Productivity • AI Agent",
        desc: "Smart assistant leveraging Gemini API to generate tasks, manage projects, and act as a second brain.",
        tech: ["Next.js", "Supabase", "Gemini API"],
        link: "https://github.com/mcggEz/synaps",
      },
      {
        title: "PLM Navigation",
        category: "Utility • Campus Map",
        desc: "Interactive campus wayfinding app for students and visitors of Pamantasan ng Lungsod ng Maynila.",
        tech: ["ReactJS", "Leaflet", "GeoJSON"],
        link: "https://github.com/mcggEz/plm",
      },
      {
        title: "Smart Cradle",
        category: "IoT • Mobile App",
        desc: "Bluetooth-enabled mobile app interfacing with an Arduino IoT cradle system for automated infant rocking.",
        tech: ["React Native", "Arduino", "Bluetooth"],
        link: "https://github.com/mcggEz/smart-cradle-app",
      }
    ],

    experience: [
      {
        company: "Kippap Learning Corp",
        role: "Software Developer Intern",
        period: "Jul 2025 — Dec 2025",
        desc: "Fullstack development on a Laravel portal and an Angular/Express admin dashboard. Integrated AI chatbots using RAG and Pinecone.",
        tags: ["Laravel", "Angular", "RAG"]
      },
      {
        company: "Purrfect Choys",
        role: "Freelance Mobile Dev",
        period: "Oct 2024 — Dec 2024",
        desc: "Digitized store reporting with a React Native app, automating sales summaries and replacing paper workflows.",
        tags: ["React Native", "Express"]
      },
      {
        company: "Barangay 828",
        role: "Fullstack Developer",
        period: "June 2025",
        desc: "Official community platform with an integrated Gemini AI chatbot for constituent services.",
        tags: ["Next.js", "Gemini"]
      }
    ]
  };

  return (
    // Apply 'dark' class conditionally to the outer wrapper
    <div className={`${theme}`}>
      <div className={`min-h-screen font-sans overflow-x-hidden relative transition-colors duration-500 ${getBaseBg()}`}>
        
        {/* Noise Texture Overlay */}
        <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] dark:opacity-[0.04] mix-blend-multiply dark:mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

        {/* Ambient Gradients - Dynamic based on theme */}
        <div className={`fixed top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none animate-pulse-slow opacity-30 dark:opacity-20 transition-colors duration-1000 ${
            activeTheme === 'monotone' ? 'bg-zinc-300 dark:bg-zinc-800' :
            activeTheme === 'forest' ? 'bg-emerald-300 dark:bg-emerald-900' :
            activeTheme === 'nebula' ? 'bg-violet-300 dark:bg-violet-900' :
            'bg-cyan-300 dark:bg-cyan-900'
        }`}></div>
        <div className={`fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-30 dark:opacity-20 transition-colors duration-1000 ${
            activeTheme === 'monotone' ? 'bg-zinc-400 dark:bg-zinc-800' :
            activeTheme === 'forest' ? 'bg-teal-300 dark:bg-teal-900' :
            activeTheme === 'nebula' ? 'bg-fuchsia-300 dark:bg-fuchsia-900' :
            'bg-blue-300 dark:bg-blue-900'
        }`}></div>

        {/* Navigation */}
        <nav className="fixed top-6 left-0 right-0 z-40 flex justify-center px-4">
          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-full px-6 py-3 flex items-center gap-8 shadow-lg dark:shadow-2xl transition-all duration-300">
            <div className="hidden md:flex items-center gap-6 text-sm font-medium opacity-60">
              {['Work', 'About', 'Experience', 'Contact'].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`hover:opacity-100 hover:${currentTheme.textAccent.split(' ')[0]} dark:hover:text-white transition-all relative group`}
                >
                  {item}
                  <span className={`absolute -bottom-1 left-0 w-0 h-px ${currentTheme.bgAccent} transition-all group-hover:w-full`}></span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 pl-4 border-l border-zinc-200 dark:border-zinc-800">
              {/* Theme Picker */}
              <div className="relative">
                <button
                  onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                  className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
                  aria-label="Change Theme"
                >
                  <Palette size={18} />
                </button>
                
                {isThemeMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 p-2 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-white/10 flex flex-col gap-1 min-w-[140px] animate-in fade-in zoom-in-95 duration-200">
                        {Object.entries(themes).map(([key, themeConfig]) => (
                            <button
                                key={key}
                                onClick={() => { setActiveTheme(key); setIsThemeMenuOpen(false); }}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    activeTheme === key 
                                    ? 'bg-zinc-100 dark:bg-white/10' 
                                    : 'hover:bg-zinc-50 dark:hover:bg-white/5'
                                }`}
                            >
                                <div className={`w-3 h-3 rounded-full ${
                                    key === 'monotone' ? 'bg-zinc-500' : 
                                    key === 'forest' ? 'bg-emerald-500' :
                                    key === 'nebula' ? 'bg-violet-500' : 'bg-cyan-500'
                                }`}></div>
                                <span>{themeConfig.name}</span>
                                {activeTheme === key && <Check size={14} className="ml-auto opacity-50"/>}
                            </button>
                        ))}
                    </div>
                )}
              </div>

              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <a href={data.github} target="_blank" rel="noreferrer" className="hidden sm:block p-2 hover:bg-zinc-100 dark:hover:bg-white/10 rounded-full transition-colors">
                <Github size={18} />
              </a>
              <a href={`mailto:${data.email}`} className={`hidden sm:block p-2 rounded-full hover:opacity-80 transition-opacity ${currentTheme.bgAccent} ${currentTheme.buttonText}`}>
                <Mail size={18} />
              </a>
              {/* Mobile Menu Toggle */}
              <button className="md:hidden ml-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={20}/> : <Menu size={20}/>}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-white/95 dark:bg-black/95 z-30 flex flex-col items-center justify-center space-y-8 backdrop-blur-lg transition-colors duration-300">
            {['Work', 'About', 'Experience', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-4xl font-bold hover:opacity-50 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {/* Hero Section */}
        <header id="about" className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center relative">
          <Reveal className="delay-100">
            <h1 className="text-6xl md:text-9xl font-bold leading-[0.9] tracking-tighter mb-8">
              FULLSTACK <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.gradient}`}>
                AI & CLOUD
              </span> <br />
              ENGINEER.
            </h1>
          </Reveal>

          <Reveal className="delay-200">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 max-w-4xl">
              <p className="text-lg md:text-xl opacity-70 leading-relaxed max-w-2xl">
                I’m an <span className={`font-semibold ${currentTheme.textAccent}`}>experienced Computer Engineering professional</span> focused on software development, cloud-native platforms, and AI-driven solutions. I lead learning pathways, mentor peers, and roll out modern DevOps practices that accelerate delivery in the cloud. My track record spans mission-critical web portals, AI copilots, and full-stack contributions across frontend, backend, and QA—always optimizing for scalable, secure, and human-centered outcomes that solve real problems.
              </p>
              
              <div className="flex flex-col gap-2 text-sm opacity-50 font-mono">
                <div className="flex items-center gap-2">
                  <Globe size={14} /> {data.location}
                </div>
                <div className="flex items-center gap-2">
                  <Terminal size={14} /> BS CpE @ PLM
                </div>
              </div>
            </div>
          </Reveal>

          {/* Infinite Marquee */}
          <div className="absolute bottom-12 left-0 right-0 overflow-hidden whitespace-nowrap opacity-10 dark:opacity-20 hover:opacity-40 transition-opacity duration-500 pointer-events-none">
            <div className="inline-block animate-marquee">
              {data.techStack.map((tech, i) => (
                <span key={i} className="text-6xl md:text-8xl font-bold text-transparent stroke-text-dark dark:stroke-text-light mx-8">
                  {tech}
                </span>
              ))}
            </div>
            <div className="inline-block animate-marquee" aria-hidden="true">
              {data.techStack.map((tech, i) => (
                <span key={i} className="text-6xl md:text-8xl font-bold text-transparent stroke-text-dark dark:stroke-text-light mx-8">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Selected Works (Bento Grid Style) */}
        <section id="work" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-sm font-mono opacity-50 mb-10 uppercase tracking-widest border-b border-zinc-200 dark:border-white/10 pb-4">
              Selected Works
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {data.projects.map((project, index) => {
              const isLarge = index === 0 || index === 3;
              const spanClass = isLarge ? 'md:col-span-8' : 'md:col-span-4';
              
              return (
                <Reveal key={index} className={`${spanClass} group`}>
                  <a href={project.link} target="_blank" rel="noreferrer" className="block h-full">
                    <div className="relative h-[400px] bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-white/5 hover:border-zinc-400 dark:hover:border-white/20 transition-all duration-500 shadow-sm hover:shadow-xl dark:shadow-none">
                      
                      {/* Abstract Monotone Background */}
                      <div className={`absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-pattern-grid`}></div>
                      
                      {/* Content */}
                      <div className="absolute inset-0 p-8 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-white/5 text-xs font-medium opacity-70 border border-zinc-200 dark:border-white/10">
                            {project.category}
                          </span>
                          <div className={`rounded-full p-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ${currentTheme.bgAccent} ${currentTheme.buttonText}`}>
                            <ArrowUpRight size={20} />
                          </div>
                        </div>

                        <div className="transform group-hover:-translate-y-2 transition-transform duration-500">
                          <h3 className={`text-3xl font-bold mb-2 group-hover:${currentTheme.textAccent.split(' ')[0]} transition-colors`}>{project.title}</h3>
                          <p className="opacity-60 text-sm line-clamp-2 mb-4">{project.desc}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map(t => (
                              <span key={t} className="text-xs font-mono opacity-50 border border-zinc-200 dark:border-white/10 px-2 py-1 rounded">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Experience Table */}
        <section id="experience" className="py-32 px-6 md:px-12 max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-sm font-mono opacity-50 mb-10 uppercase tracking-widest border-b border-zinc-200 dark:border-white/10 pb-4">
              Career Trajectory
            </h2>
          </Reveal>

          <div className="space-y-4">
            {data.experience.map((job, i) => (
              <Reveal key={i}>
                <div className="group relative p-6 md:p-8 bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/5 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all duration-300">
                  <div className={`absolute left-0 top-0 bottom-0 w-1 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 rounded-l-2xl origin-top ${currentTheme.bgAccent}`}></div>
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">{job.role}</h3>
                      <p className={`text-lg ${currentTheme.textAccent}`}>{job.company}</p>
                    </div>
                    <span className="font-mono text-sm opacity-50 bg-zinc-100 dark:bg-white/5 px-3 py-1 rounded-full w-fit">
                      {job.period}
                    </span>
                  </div>
                  
                  <p className="opacity-70 leading-relaxed max-w-3xl mb-4">
                    {job.desc}
                  </p>
                  
                  <div className="flex gap-3">
                    {job.tags.map(tag => (
                      <span key={tag} className="text-xs font-bold uppercase tracking-wider opacity-50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Tech Stack / Skills (Visual Grid) */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Reveal className="col-span-2 md:col-span-2 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-white/5 min-h-[240px] flex flex-col justify-between group hover:border-zinc-400 dark:hover:border-white/30 transition-colors">
              <Cloud className={`${currentTheme.textAccent} mb-4`} size={40} />
              <div>
                <h3 className="text-2xl font-bold mb-2">Cloud Native</h3>
                <p className="opacity-60 text-sm">AWS Certified Mentor & GCP Specialist. Experienced in Docker, Vercel, and Serverless architectures.</p>
              </div>
            </Reveal>
            
            <Reveal className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-white/5 flex flex-col justify-between group hover:border-zinc-400 dark:hover:border-white/30 transition-colors shadow-sm dark:shadow-none">
              <Cpu className={`${currentTheme.textAccent} mb-4`} size={32} />
              <h3 className="text-xl font-bold">AI & VLMs</h3>
              <p className="text-xs opacity-60">Gemini, OpenAI, RAG</p>
            </Reveal>

            <Reveal className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-white/5 flex flex-col justify-between group hover:border-zinc-400 dark:hover:border-white/30 transition-colors shadow-sm dark:shadow-none">
              <Smartphone className={`${currentTheme.textAccent} mb-4`} size={32} />
              <h3 className="text-xl font-bold">Mobile</h3>
              <p className="text-xs opacity-60">Flutter, React Native</p>
            </Reveal>
            
            <Reveal className="col-span-2 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-8 border border-zinc-200 dark:border-white/5 flex items-center justify-center text-center">
              <div>
                <h3 className="text-3xl font-bold mb-2">15+</h3>
                <p className="opacity-50">Projects Delivered</p>
              </div>
            </Reveal>

            <Reveal className={`col-span-2 md:col-span-2 bg-zinc-900 dark:bg-white rounded-3xl p-8 border border-zinc-800 dark:border-zinc-200 flex flex-col justify-between text-white dark:text-black ${currentTheme.bgAccent} ${currentTheme.buttonText}`}>
              <div className="flex items-center gap-4 mb-6">
                <Code2 size={32} />
                <h3 className="text-2xl font-bold">Web Stack</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                  {['Next.js 14', 'TypeScript', 'Tailwind', 'Supabase', 'Laravel', 'PostgreSQL'].map(t => (
                    <span key={t} className="px-3 py-1.5 rounded-lg bg-white/10 dark:bg-black/10 text-sm border border-white/20 dark:border-black/10">
                      {t}
                    </span>
                  ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Footer / Contact */}
        <footer id="contact" className="py-32 px-6 md:px-12 max-w-7xl mx-auto text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-zinc-200/50 dark:bg-zinc-800/20 rounded-full blur-[100px] pointer-events-none"></div>
          
          <Reveal>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-12">
              LET&apos;S BUILD <br /> 
              <span className="opacity-40">THE IMPOSSIBLE.</span>
            </h2>
            
            <a 
              href={`mailto:${data.email}`}
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-all shadow-xl ${currentTheme.bgAccent} ${currentTheme.buttonText}`}
            >
              <Mail size={20} />
              Start a Conversation
            </a>

            <div className="mt-24 flex flex-col md:flex-row justify-between items-center gap-6 opacity-50 text-sm font-mono">
              <p>© 2025 Mc Giberri M. Ginez</p>
              <div className="flex gap-6">
                <a href={data.github} className="hover:text-black dark:hover:text-white transition-colors">GITHUB</a>
                <a href={data.linkedin} className="hover:text-black dark:hover:text-white transition-colors">LINKEDIN</a>
              </div>
            </div>
          </Reveal>
        </footer>

        {/* Global CSS for custom animations */}
        <style jsx global>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
          .stroke-text-dark {
            -webkit-text-stroke: 1px rgba(0, 0, 0, 0.1);
          }
          .stroke-text-light {
            -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
          }
          .animate-pulse-slow {
            animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          html {
            scroll-behavior: smooth;
          }
          .bg-pattern-grid {
            background-image: radial-gradient(currentColor 1px, transparent 1px);
            background-size: 24px 24px;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Portfolio;
