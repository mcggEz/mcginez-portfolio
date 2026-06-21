"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Globe,
  MapPin,
  FileText,
  Check,
  X
} from 'lucide-react';

/**
 * Hook for scroll reveal animations
 */
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => setIsVisible(entry.isIntersecting));
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );
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

/**
 * Minimal Ocean-themed cursor: a single solid dot of uniform size that follows
 * the pointer. No hover or size changes. Disabled on touch / coarse pointers.
 */
const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e: MouseEvent) => {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      dot.style.opacity = '1';
    };
    const onLeave = () => {
      dot.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.documentElement.classList.add('has-custom-cursor');

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
};

const Portfolio = () => {
  // Fixed dark mode
  const theme = 'dark';

  // Modals: résumé preview + education
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isEduOpen, setIsEduOpen] = useState(false);

  // Copy email + toast notification
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(data.email);
    } catch {
      // Fallback for older browsers / insecure contexts
      const ta = document.createElement('textarea');
      ta.value = data.email;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setEmailCopied(true);
    window.setTimeout(() => setEmailCopied(false), 2000);
  };

  useEffect(() => {
    if (!isResumeOpen && !isEduOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsResumeOpen(false);
        setIsEduOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isResumeOpen, isEduOpen]);

  // Fixed Ocean theme
  const currentTheme = {
    name: "Ocean",
    textAccent: "text-cyan-600 dark:text-cyan-400",
    bgAccent: "bg-cyan-600 dark:bg-cyan-500",
    borderAccent: "border-cyan-600 dark:border-cyan-500",
    gradient: "from-cyan-500 to-blue-400",
    buttonText: "text-white dark:text-black"
  };

  // Base background (Ocean)
  const getBaseBg = () =>
    "bg-slate-50 dark:bg-[#0b1120] text-slate-900 dark:text-slate-100 selection:bg-cyan-500 selection:text-black";

  // Portfolio Data
  const data = {
    name: "Mc Giberri M. Ginez",
    role: "Fullstack AI & Cloud Engineer",
    location: "Manila, PH",
    email: "mcgiber.179@gmail.com",
    github: "https://github.com/mcggEz",
    linkedin: "https://www.linkedin.com/in/mcginez",
    
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
        title: "MicroView AI",
        category: "Web • HealthTech",
        desc: "Low-cost automated microscopy urinalysis system. An Arduino stage and Raspberry Pi client feed a cascading cloud pipeline — YOLOv11 for coarse detection and Gemini 2.5 Pro (VLM) for explainable fine-grained analysis, surfaced in a Next.js dashboard.",
        tech: ["Next.js", "Flask", "YOLOv11", "Gemini 2.5 Pro", "Raspberry Pi"],
        link: "https://microview-ai.vercel.app/",
        image: "/shots/microview.png",
        featured: true,
      },
      {
        title: "Department of Energy GSMS",
        category: "Web • GovTech",
        desc: "Government Services Management System architected for the Department of Energy (DOE) with Next.js and NestJS — digitizing critical agency operations to cut manual processing time, with 20+ high-fidelity screens on a production-ready AWS environment.",
        tech: ["Next.js", "NestJS", "AWS", "PostgreSQL"],
        link: "https://quanbyit.com/",
        image: "/logos/gsms-bg.png",
      },
      {
        title: "ChainReaction",
        category: "Web • FoodTech",
        desc: "Full-stack food-rating platform ranking 67+ menu items across 9 restaurant chains. Shipped 145 features across 14 domains to 100% completion before MVP launch, with multi-provider auth (Email, Google, Apple) and end-to-end Playwright QA.",
        tech: ["Next.js", "Supabase", "Vercel", "Playwright"],
        link: "https://www.chainreactionhq.com/",
        image: "/shots/chainreaction.png",
        featured: true,
      },
      {
        title: "SK Council Website",
        category: "Web • Public Service",
        desc: "Official digital platform for the Sangguniang Kabataan of Barangay 828, Paco, Manila — centralizing announcements and events with a Gemini-powered chatbot.",
        tech: ["Next.js", "Tailwind", "Gemini API"],
        link: "https://barangay-828-website.vercel.app",
        image: "/shots/sk-828.png",
      },
      {
        title: "Kippap Learning",
        category: "Web • EdTech",
        desc: "EdTech platform for Civil Engineering board-exam review — structured, repeatable lecture videos and a full student portal. Contributed across the full stack (Laravel portal, Angular/Express AI dashboard, and the Flutter mobile app) during my internship at Kippap Learning Corp.",
        tech: ["Laravel", "Angular", "Flutter"],
        link: "https://www.kippap.com/",
        image: "/shots/kippap.png",
        featured: true,
      },
      {
        title: "Sacramento Library System",
        category: "Desktop • Operations",
        desc: "Electron.js + SQLite desktop app that replaced manual logging for a library — tracking borrowed and returned books, managing inventory and member records, and automating overdue tracking.",
        tech: ["Electron.js", "SQLite", "JavaScript"],
        link: "https://github.com/mcggEz/sacramento-library-management-system-desktop",
        image: "/logos/slms-bg.png",
      },
      {
        title: "CyMon",
        category: "Web • HealthTech",
        desc: "Clinical information system for a Special Education program — consolidating patient profiles, developmental assessments, daily activity logs, and consent/waiver management across four roles (clients, psychologists, psychometricians, admins), with Supabase row-level security.",
        tech: ["React", "Express", "Supabase", "PostgreSQL"],
        link: "https://cymon-clinic.vercel.app/",
        image: "/logos/cymon.png",
        featured: true,
      }
    ],

    experience: [
      {
        company: "Godelian Ltd",
        logo: "/logos/godelian.svg",
        link: "https://www.godelianlimited.com/",
        role: "Software Engineering Consultant",
        location: "London, United Kingdom · Remote",
        period: "Mar 2026 — Apr 2026",
        desc: "Built ChainReaction, a full-stack food-rating platform spanning 67+ menu items across 9 restaurant chains — shipping 145 features across 14 domains and reaching 100% feature completion before MVP launch. Implemented multi-provider auth (Email, Google, Apple OAuth) with email-verification gates, and ran end-to-end Playwright QA across all routes and mobile viewports.",
        tags: ["Next.js", "Supabase", "Playwright"]
      },
      {
        company: "Quanby Solutions Inc.",
        logo: "/logos/quanby-logo.png",
        link: "https://quanbyit.com/",
        role: "Software Developer Intern",
        location: "Metro Manila, Philippines · Onsite",
        period: "Feb 2026 — Mar 2026",
        desc: "Architected a Government Services Management System (GSMS) with Next.js and NestJS, digitizing critical agency operations and cutting manual processing time. Designed 20+ high-fidelity UI/UX screens and provisioned a production-ready AWS environment for high availability.",
        tags: ["Next.js", "NestJS", "AWS"]
      },
      {
        company: "Kippap Learning Corp",
        logo: "/logos/kippap-logo.jpg",
        link: "https://www.kippap.com/",
        role: "Software Developer Intern",
        location: "Philippines · Remote",
        period: "Jul 2025 — Nov 2025",
        desc: "Worked across the full stack of a Laravel student portal and an Angular/Express admin dashboard for an AI chatbot — integrating Gemini API, RAG, and Pinecone vector search. Built the Flutter mobile front-end from Figma and drove QA workflows through agile ceremonies.",
        tags: ["Laravel", "Angular", "RAG", "Flutter"]
      }
    ],

    leadership: [
      {
        org: "Google Developer Student Club — PLM",
        role: "Cloud Development Lead",
        period: "Aug 2025 — May 2026",
        desc: "Designed and delivered cloud-focused learning paths with fellow student leaders, equipping members to build and deploy real-world apps on Google Cloud.",
        tags: ["Google Cloud", "Community", "Mentorship"]
      },
      {
        org: "AWS Cloud Club — Haribon (PLM)",
        role: "Cloud & Infrastructure Mentor",
        period: "Aug 2025 — May 2026",
        desc: "Co-led AWS-centric learning pathways to help members architect and deploy scalable, cost-efficient applications on Amazon Web Services.",
        tags: ["AWS", "Architecture", "Mentorship"]
      },
      {
        org: "Sangguniang Kabataan — Barangay 828",
        role: "SK Council Secretary",
        period: "Jan 2023 — Present",
        desc: "Serve as council secretary for the local youth council, supporting transparent governance, documentation, and community programs.",
        tags: ["Public Service", "Governance"]
      }
    ],

    university: {
      name: "Pamantasan ng Lungsod ng Maynila",
      short: "University of the City of Manila",
      logo: "/logos/plm-logo.png",
      degree: "Bachelor of Science in Computer Engineering (BS CpE)",
      college: "College of Engineering & Technology",
      location: "Intramuros, Manila, Philippines",
      established: "1965",
      link: "https://plm.edu.ph/",
      note: "PLM is the premier public university owned and operated by the City Government of Manila, recognized for its competitive, scholarship-based admission and strong engineering programs."
    },

    resume: {
      phone: "+63 926 616 3855",
      skills: [
        { label: "Web", items: ["HTML", "CSS", "JavaScript", "TypeScript", "Python"] },
        { label: "Frameworks & Data", items: ["React", "Next.js", "Node.js", "Laravel", "Angular", "NestJS", "Express.js", "Supabase", "Firebase", "PostgreSQL", "MongoDB", "TailwindCSS"] },
        { label: "APIs", items: ["REST", "WebSockets", "GraphQL", "RPC"] },
        { label: "Mobile", items: ["Flutter", "React Native", "NativeWind", "Expo"] },
        { label: "Desktop", items: ["Electron.js"] },
        { label: "Automation", items: ["Puppeteer", "Playwright", "n8n", "Google Apps Script"] },
        { label: "Cloud & DevOps", items: ["AWS (EC2, S3, RDS, Lambda, IAM)", "Google Cloud", "Vercel", "Docker", "GitHub Actions"] },
        { label: "AI / ML", items: ["OpenAI API", "Gemini API", "RAG", "Vector Databases", "Embeddings & Semantic Search", "Prompt Engineering", "Multi-modal AI (VLMs)"] },
        { label: "IoT / Embedded", items: ["Arduino", "Raspberry Pi", "ESP32"] },
        { label: "Design", items: ["Figma", "Figma Make"] }
      ],
      education: [
        { school: "Pamantasan ng Lungsod ng Maynila", detail: "BS Computer Engineering — Manila, Philippines" },
        { school: "Paco Catholic School", detail: "STEM, Senior High School — Manila, Philippines" }
      ],
      certificates: [
        "Career Essentials in GitHub Professional Certificate — GitHub (2026)",
        "Oracle Cloud Infrastructure 2023 Certified Foundations Associate — Oracle (2023)",
        "Postman API Fundamentals Student Expert — Postman (2023)"
      ]
    }
  };

  return (
    // Apply 'dark' class conditionally to the outer wrapper
    <div className={`${theme}`}>
      <div className={`min-h-screen font-sans overflow-x-hidden relative transition-colors duration-500 ${getBaseBg()}`}>

        {/* Custom Ocean cursor */}
        <CustomCursor />

        {/* Email copied toast */}
        {emailCopied && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-900 text-white border border-white/10 shadow-xl text-sm font-medium animate-in fade-in slide-in-from-bottom-2 duration-200">
            <Check size={16} className="text-cyan-400" />
            Email copied to clipboard
          </div>
        )}

        {/* Noise Texture Overlay */}
        <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] dark:opacity-[0.04] mix-blend-multiply dark:mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

        {/* Ambient Gradients - Ocean */}
        <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none animate-pulse-slow opacity-30 dark:opacity-20 bg-cyan-300 dark:bg-cyan-900"></div>
        <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-30 dark:opacity-20 bg-blue-300 dark:bg-blue-900"></div>

        {/* Navigation */}
        <nav className="fixed top-6 left-0 right-0 z-40 flex justify-center px-4">
          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-full px-3 py-2 flex items-center gap-1.5 shadow-lg dark:shadow-2xl transition-all duration-300">
            <button onClick={() => setIsResumeOpen(true)} className="flex items-center gap-1.5 pl-2 pr-3 py-1.5 text-sm font-medium rounded-full hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors">
              <FileText size={16} /> Résumé
            </button>
            <span className="w-px h-5 bg-zinc-200 dark:bg-white/10"></span>
            <a href={data.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="p-2 hover:bg-zinc-100 dark:hover:bg-white/10 rounded-full transition-colors">
              <Github size={18} />
            </a>
            <a href={data.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="p-2 hover:bg-zinc-100 dark:hover:bg-white/10 rounded-full transition-colors">
              <Linkedin size={18} />
            </a>
            <button onClick={copyEmail} aria-label="Copy email" className={`p-2 rounded-full hover:opacity-80 transition-opacity ${currentTheme.bgAccent} ${currentTheme.buttonText}`}>
              <Mail size={18} />
            </button>
          </div>
        </nav>

        {/* Résumé Preview Modal (view-only, no download) */}
        {isResumeOpen && (
          <div className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-4 md:p-8" role="dialog" aria-modal="true" aria-label="Résumé preview">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsResumeOpen(false)}></div>

            <div
              className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-2xl bg-white text-zinc-900 shadow-2xl ring-1 ring-black/10 select-none animate-in fade-in zoom-in-95 duration-200"
              onContextMenu={(e) => e.preventDefault()}
            >
              {/* Toolbar */}
              <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 bg-white/90 backdrop-blur border-b border-zinc-200">
                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">Résumé — Preview (view only)</span>
                <button onClick={() => setIsResumeOpen(false)} aria-label="Close résumé" className="p-1.5 rounded-full hover:bg-zinc-100 transition-colors">
                  <X size={18} />
                </button>
              </div>

              {/* Document */}
              <div className="px-6 md:px-10 py-8 space-y-8">
                {/* Header */}
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">{data.name}</h2>
                  <p className="text-cyan-600 font-medium mt-1">{data.role}</p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-500">
                    <span>{data.location}</span>
                    <span>{data.resume.phone}</span>
                    <span>{data.email}</span>
                    <a href={data.github} target="_blank" rel="noreferrer" className="text-cyan-600 hover:underline">github.com/mcggEz</a>
                    <a href={data.linkedin} target="_blank" rel="noreferrer" className="text-cyan-600 hover:underline">linkedin.com/in/mcginez</a>
                  </div>
                </div>

                {/* Technical Skills */}
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-200 pb-2 mb-3">Technical Skills</h3>
                  <div className="space-y-2.5">
                    {data.resume.skills.map((group) => (
                      <div key={group.label} className="flex flex-col sm:flex-row sm:gap-3">
                        <span className="shrink-0 sm:w-36 text-sm font-semibold text-zinc-700">{group.label}</span>
                        <div className="flex flex-wrap gap-1.5">
                          {group.items.map((item) => (
                            <span key={item} className="text-xs bg-zinc-100 border border-zinc-200 text-zinc-700 px-2 py-0.5 rounded">{item}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Experience */}
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-200 pb-2 mb-3">Experience</h3>
                  <div className="space-y-5">
                    {data.experience.map((job) => (
                      <div key={job.company}>
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                          <h4 className="font-bold">{job.role} <span className="font-normal text-zinc-500">· {job.company}</span></h4>
                          <span className="text-xs font-mono text-zinc-400 shrink-0">{job.period}</span>
                        </div>
                        <p className="text-xs text-zinc-400 mb-1">{job.location}</p>
                        <p className="text-sm text-zinc-600 leading-relaxed">{job.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Education */}
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-200 pb-2 mb-3">Education</h3>
                  <div className="space-y-2">
                    {data.resume.education.map((ed) => (
                      <div key={ed.school}>
                        <h4 className="font-semibold text-sm">{ed.school}</h4>
                        <p className="text-sm text-zinc-500">{ed.detail}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Leadership & Organizations */}
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-200 pb-2 mb-3">Leadership & Organizations</h3>
                  <div className="space-y-3">
                    {data.leadership.map((item) => (
                      <div key={item.org}>
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                          <h4 className="font-semibold text-sm">{item.role} <span className="font-normal text-zinc-500">· {item.org}</span></h4>
                          <span className="text-xs font-mono text-zinc-400 shrink-0">{item.period}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Certificates */}
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-200 pb-2 mb-3">Certificates</h3>
                  <ul className="space-y-1.5">
                    {data.resume.certificates.map((c) => (
                      <li key={c} className="text-sm text-zinc-600 flex gap-2">
                        <span className="text-cyan-600">▹</span> {c}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </div>
        )}

        {/* Education Modal — university info */}
        {isEduOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Education">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsEduOpen(false)}></div>

            <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
              {/* Header */}
              <div className="flex items-start gap-4 px-5 py-5 border-b border-zinc-200 dark:border-white/10">
                <img src={data.university.logo} alt="PLM" className="w-12 h-12 rounded-lg object-contain shrink-0" />
                <div className="min-w-0">
                  <h3 className="font-bold leading-snug">{data.university.name}</h3>
                  <p className="text-xs opacity-50 mt-0.5">{data.university.short}</p>
                </div>
                <button onClick={() => setIsEduOpen(false)} aria-label="Close" className="ml-auto p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors shrink-0">
                  <X size={18} />
                </button>
              </div>

              {/* Details */}
              <div className="px-5 py-4 space-y-3 text-sm">
                {[
                  { label: 'Degree', value: data.university.degree },
                  { label: 'College', value: data.university.college },
                  { label: 'Location', value: data.university.location },
                  { label: 'Established', value: data.university.established },
                ].map((row) => (
                  <div key={row.label} className="flex gap-3">
                    <span className="w-24 shrink-0 text-xs font-semibold uppercase tracking-wider opacity-40 pt-0.5">{row.label}</span>
                    <span className="opacity-90">{row.value}</span>
                  </div>
                ))}
                <p className="opacity-60 leading-relaxed pt-1">{data.university.note}</p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between gap-2 px-5 py-4 border-t border-zinc-200 dark:border-white/10">
                <span className="text-xs opacity-40 font-mono">plm.edu.ph</span>
                <a href={data.university.link} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 px-5 py-2 text-sm font-bold rounded-full hover:opacity-80 transition-opacity ${currentTheme.bgAccent} ${currentTheme.buttonText}`}>
                  Visit website <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>
        )}

      {/* Hero Section */}
        <header id="about" className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center relative">
          <Reveal className="delay-100">
            <p className="text-sm uppercase tracking-[0.4em] opacity-60 mb-8">Mc Giberri M. Ginez</p>
          </Reveal>

          <Reveal className="delay-150">
            <h1 className="text-4xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-10 max-w-5xl">
              I build full-stack, AI-powered products that real people{' '}
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.gradient}`}>
                actually use.
              </span>
            </h1>
          </Reveal>

          <Reveal className="delay-200">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 max-w-4xl">
              <p className="text-base md:text-lg opacity-70 leading-relaxed max-w-2xl">
                Computer Engineering @ PLM. Software Engineering Consultant for a London startup. AI thesis researcher. Cloud Lead at GDSC &amp; AWS Cloud Club.
              </p>

              <div className="flex flex-col gap-3 text-sm opacity-60 font-mono">
                <div className="flex items-center gap-2">
                  <Globe size={14} /> {data.location}
                </div>
                <button
                  onClick={() => setIsEduOpen(true)}
                  className="flex items-center gap-2 hover:opacity-100 transition-opacity group w-fit text-left"
                >
                  <img src="/logos/plm-logo.png" alt="PLM" className="w-6 h-6 rounded-md object-contain" />
                  <span className="group-hover:underline">BS CpE @ PLM</span>
                </button>
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
            {(data.projects as { title: string; category: string; desc: string; tech: string[]; link: string; image?: string; featured?: boolean }[]).map((project, index) => {
              const isLarge = Boolean(project.featured);
              const spanClass = isLarge ? 'md:col-span-8' : 'md:col-span-4';
              const hasImage = Boolean(project.image);

              return (
                <Reveal key={index} className={`${spanClass} group`}>
                  <a href={project.link} target="_blank" rel="noreferrer" className="block h-full">
                    <div className="relative h-[400px] bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-white/5 hover:border-zinc-400 dark:hover:border-white/20 transition-all duration-500 shadow-sm hover:shadow-xl dark:shadow-none">

                      {hasImage ? (
                        <>
                          {/* Live screenshot */}
                          <img
                            src={project.image}
                            alt={`${project.title} screenshot`}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          />
                          {/* Legibility scrim */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20"></div>
                        </>
                      ) : (
                        /* Abstract Monotone Background */
                        <div className={`absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-pattern-grid`}></div>
                      )}

                      {/* Content */}
                      <div className={`absolute inset-0 p-8 flex flex-col justify-between ${hasImage ? 'text-white' : ''}`}>
                        <div className="flex justify-between items-start">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${hasImage ? 'bg-black/30 border-white/25 text-white backdrop-blur-sm' : 'bg-zinc-100 dark:bg-white/5 opacity-70 border-zinc-200 dark:border-white/10'}`}>
                            {project.category}
                          </span>
                          <div className={`rounded-full p-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ${currentTheme.bgAccent} ${currentTheme.buttonText}`}>
                            <ArrowUpRight size={20} />
          </div>
        </div>

                        <div className="transform group-hover:-translate-y-2 transition-transform duration-500">
                          <h3 className={`text-3xl font-bold mb-2 transition-colors ${hasImage ? 'drop-shadow' : `group-hover:${currentTheme.textAccent.split(' ')[0]}`}`}>{project.title}</h3>
                          <p className={`text-sm line-clamp-2 mb-4 ${hasImage ? 'text-white/80' : 'opacity-60'}`}>{project.desc}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map(t => (
                              <span key={t} className={`text-xs font-mono px-2 py-1 rounded border ${hasImage ? 'text-white/80 border-white/25 bg-black/20' : 'opacity-50 border-zinc-200 dark:border-white/10'}`}>
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
                    <div className="flex items-center gap-4">
                      <a href={job.link} target="_blank" rel="noreferrer" aria-label={job.company} className="shrink-0">
                        <img src={job.logo} alt={`${job.company} logo`} className="w-12 h-12 rounded-xl object-contain" />
                      </a>
                      <div>
                        <h3 className="text-2xl font-bold">{job.role}</h3>
                        <a href={job.link} target="_blank" rel="noreferrer" className={`text-lg ${currentTheme.textAccent} hover:underline`}>{job.company}</a>
                        <div className="flex items-center gap-1.5 text-xs opacity-50 mt-1">
                          <MapPin size={12} /> {job.location}
                        </div>
                      </div>
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

        {/* Leadership & Community */}
        <section id="leadership" className="py-32 px-6 md:px-12 max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-sm font-mono opacity-50 mb-10 uppercase tracking-widest border-b border-zinc-200 dark:border-white/10 pb-4">
              Leadership & Community
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.leadership.map((item, i) => (
              <Reveal key={i} className="group h-full">
                <div className="relative h-full p-6 md:p-7 bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/5 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all duration-300 flex flex-col">
                  <div className={`absolute left-0 top-0 bottom-0 w-1 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 rounded-l-2xl origin-top ${currentTheme.bgAccent}`}></div>

                  <span className="font-mono text-xs opacity-50 mb-3">{item.period}</span>
                  <h3 className="text-lg font-bold leading-snug">{item.role}</h3>
                  <p className={`text-sm mb-4 ${currentTheme.textAccent}`}>{item.org}</p>
                  <p className="opacity-70 text-sm leading-relaxed mb-5 flex-1">{item.desc}</p>

                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-wider opacity-50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Footer / Contact */}
        <footer id="contact" className="py-32 px-6 md:px-12 max-w-7xl mx-auto text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-zinc-200/50 dark:bg-zinc-800/20 rounded-full blur-[100px] pointer-events-none"></div>
          
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 opacity-50 text-sm font-mono">
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

          /* Minimal Ocean cursor */
          .has-custom-cursor,
          .has-custom-cursor * {
            cursor: none !important;
          }
          .cursor-dot {
            position: fixed;
            top: 0;
            left: 0;
            width: 12px;
            height: 12px;
            margin: -6px 0 0 -6px;
            border-radius: 9999px;
            background: #22d3ee;
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            will-change: transform;
            transform: translate(-100px, -100px);
            transition: opacity 0.2s ease;
          }
          @media (pointer: coarse) {
            .cursor-dot {
              display: none;
            }
          }
        `}</style>
        </div>
      </div>
  );
};
   
export default Portfolio;
