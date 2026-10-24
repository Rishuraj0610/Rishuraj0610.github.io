export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  architecture: {
    title: string;
    steps: {
      title: string;
      description: string;
      tech: string;
    }[];
  };
  features: string[];
  techStack: string[];
  category: 'Agentic AI' | 'AI / GenAI' | 'Backend' | 'Full-Stack';
  githubUrl: string;
  liveUrl?: string;
  isFeatured: boolean;
  isPlaceholder?: boolean;
  challenges: string;
  whatILearned: string;
  metricsOrHighlight: string;
  period?: string;
  roleOrTeam?: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    icon?: string;
    tags?: string[];
  }[];
}

export interface InternshipExperience {
  company: string;
  role: string;
  location: string;
  period: string;
  type: string;
  description: string;
  highlights: string[];
  techStack: string[];
}

export interface JourneyMilestone {
  period: string;
  title: string;
  focus: string;
  description: string;
  highlights: string[];
  badge: string;
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: 'Cloud' | 'Coding' | 'Certification' | 'Product';
  description: string;
  credentialUrl?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialType: string;
  details: string;
  badgeUrl?: string;
}

export interface CodingProfile {
  platform: string;
  handle: string;
  stats: string;
  description: string;
  url: string;
  icon: string;
  color: string;
}

export interface BlogPost {
  id: string;
  title: string;
  readTime: string;
  date: string;
  category: string;
  summary: string;
  content: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Rishu Raj",
    phone: "+91-6204405855",
    role: "Computer Science & Engineering Undergraduate",
    subRoles: ["Generative & Agentic AI Developer", "Backend Engineer", "Full-Stack Developer"],
    degree: "Bachelor of Technology in Computer Science and Engineering",
    cgpa: "8.21 / 10",
    college: "Noida Institute of Engineering and Technology (NIET)",
    university: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
    location: "Greater Noida, India",
    batch: "2023 – 2027",
    yearLabel: "Undergraduate (2023 – 2027)",
    email: "rajrishu0610@gmail.com",
    github: "https://github.com/Rishuraj0610/",
    linkedin: "https://www.linkedin.com/in/rishu-raj0610/",
    leetcode: "https://leetcode.com/u/rajrishu0610",
    geeksforgeeks: "https://geeksforgeeks.org/user/rajrishu0610",
    resumeUrl: "#resume-modal",
    status: "Open to Software Engineering & AI Engineering Opportunities (Batch 2027)",
  },

  hero: {
    badge: "B.Tech CSE 2023–2027 • CGPA: 8.21/10",
    headline: "Building Intelligent Agentic AI & Scalable Backend Systems.",
    supportingText:
      "Computer Science & Engineering undergraduate (2027 batch) with hands-on experience architecting Generative AI, multi-agent autonomous copilots with LangGraph, hybrid RAG pipelines, and high-performance REST APIs.",
    primaryCta: "Explore Selected Projects",
    secondaryCta: "Download Resume",
    contactCta: "Let's Connect",
  },

  about: {
    headline: "Generative AI, Agentic Workflows & Enterprise Software Engineering",
    paragraphs: [
      "I am a Computer Science and Engineering undergraduate (2023–2027 batch) at Noida Institute of Engineering and Technology (NIET, Greater Noida) with a CGPA of 8.21/10. I specialize in Generative AI, Agentic AI copilots, multi-agent orchestration, and backend architectures.",
      "My work bridges LLM reasoning with production software engineering: designing autonomous multi-agent state graphs using LangGraph and Groq LLaMA 3.3 70B, engineering hybrid RAG search combining BM25 and cosine vector similarity in ChromaDB, and building resilient REST APIs in Node.js, Express, Flask, and PostgreSQL.",
      "Beyond building applications, I have proven industry exposure as a Python Developer Intern at CodSoft, completed virtual engineering programs with ServiceNow and Deloitte, earned the Google Cloud Arcade Facilitator certification across 15+ GCP labs, and solved 200+ DSA problems across LeetCode and GeeksforGeeks.",
    ],
    focusAreas: [
      {
        title: "Agentic AI & Multi-Agent Graphs",
        desc: "Designing stateful multi-agent architectures (Discovery, Personalization, Recovery, Analytics) using LangGraph and Groq LLaMA 3.3 70B.",
      },
      {
        title: "Hybrid RAG & Vector Intelligence",
        desc: "Building low-latency RAG systems leveraging ChromaDB vector search and BM25 + cosine hybrid retrieval for citation-backed accuracy.",
      },
      {
        title: "Backend & Cloud Architecture",
        desc: "Engineering RESTful API layers, JWT authentication, and database schemas across PostgreSQL, MySQL, and Google Cloud Platform (GCP).",
      },
      {
        title: "Data Structures & Core CS",
        desc: "200+ solved problems on LeetCode & GFG, with rigorous grounding in OOP, Operating Systems, DBMS, and Computer Networks.",
      },
    ],
    stats: [
      { label: "B.Tech CSE Batch", value: "2023 – 2027" },
      { label: "Academic CGPA", value: "8.21 / 10" },
      { label: "DSA Problems Solved", value: "200+ Problems" },
      { label: "GCP Arcade Labs", value: "15+ Cloud Labs" },
    ],
  },

  internship: {
    company: "CodSoft",
    role: "Python Developer Intern",
    location: "Remote",
    period: "June 2024 – July 2024",
    type: "Virtual / Remote Internship",
    description:
      "Engineered 5 Python applications utilizing machine learning algorithms, object-oriented design, and modular software architecture in an Agile development environment.",
    highlights: [
      "Engineered 5 Python applications using machine learning algorithms, OOP, and modular architecture.",
      "Resolved 25+ functional bugs through systematic testing, cutting debugging effort by 30%.",
      "Collaborated in a remote Agile environment with business and engineering stakeholders, completing 100% of assigned milestones on schedule.",
    ],
    techStack: ["Python", "Machine Learning", "OOP", "Testing", "Git", "Agile"],
  } as InternshipExperience,

  skills: [
    {
      title: "Programming Languages",
      iconName: "Code2",
      description: "Core programming and algorithmic problem solving",
      skills: [
        { name: "Python", tags: ["AI/ML", "LangChain", "Flask", "Streamlit"] },
        { name: "C++", tags: ["DSA", "OOP", "STL", "Udacity Nanodegree"] },
        { name: "JavaScript", tags: ["ES6+", "Node.js", "Async/Await"] },
      ],
    },
    {
      title: "Generative AI & Agentic AI",
      iconName: "Cpu",
      description: "Stateful agents, multi-agent orchestration, and copilots",
      skills: [
        { name: "LangGraph", tags: ["State Graphs", "Multi-Agent", "Cyclic"] },
        { name: "LangChain", tags: ["Chains", "Agents", "Prompts"] },
        { name: "Multi-Agent Systems", tags: ["Autonomous Agents", "Workflows"] },
        { name: "Prompt Engineering", tags: ["Structured Output", "Few-Shot"] },
        { name: "RAG", tags: ["Embeddings", "Hybrid Retrieval", "Chunking"] },
        { name: "AI Copilots", tags: ["Commerce", "Document", "Counselling"] },
      ],
    },
    {
      title: "Machine Learning & NLP",
      iconName: "Brain",
      description: "Natural language processing and semantic modeling",
      skills: [
        { name: "ML Algorithms", tags: ["Recommendation", "Classification"] },
        { name: "Text Embeddings", tags: ["HuggingFace", "Gemini Embeddings"] },
        { name: "Semantic Search", tags: ["Vector Search", "Recall"] },
        { name: "Intent Recognition", tags: ["NLP", "Classification"] },
      ],
    },
    {
      title: "LLM Platforms & APIs",
      iconName: "Zap",
      description: "State-of-the-art inference engines and REST integrations",
      skills: [
        { name: "Google Gemini API", tags: ["Multimodal", "NLP Workflows"] },
        { name: "Groq (LLaMA 3.3 70B)", tags: ["Ultra-Fast LPU", "High-Throughput"] },
        { name: "REST APIs", tags: ["HTTP Specs", "Endpoints", "Postman"] },
      ],
    },
    {
      title: "Vector & Databases",
      iconName: "Database",
      description: "Relational, document, and vector similarity indexing",
      skills: [
        { name: "ChromaDB", tags: ["Vector DB", "Embeddings Index"] },
        { name: "Hybrid Retrieval", tags: ["BM25 + Cosine Similarity"] },
        { name: "PostgreSQL", tags: ["Relational", "SQL", "Indexing"] },
        { name: "MySQL", tags: ["Relational", "Normalization", "Queries"] },
      ],
    },
    {
      title: "Cloud & Backend",
      iconName: "Server",
      description: "Enterprise server runtimes, cloud deployment, and auth",
      skills: [
        { name: "Google Cloud Platform", tags: ["GCP Arcade", "Cloud Run", "Storage"] },
        { name: "Node.js", tags: ["Event Loop", "V8 Engine"] },
        { name: "Express.js", tags: ["Middleware", "REST", "Routing"] },
        { name: "Flask", tags: ["Python Microframework", "APIs"] },
        { name: "Streamlit", tags: ["AI Frontends", "Rapid Dashboards"] },
        { name: "React 19", tags: ["Component Architecture", "Hooks"] },
        { name: "JWT Auth", tags: ["Stateless Tokens", "Security"] },
      ],
    },
    {
      title: "Core CS & Tools",
      iconName: "Wrench",
      description: "Theoretical fundamentals and software tooling",
      skills: [
        { name: "Data Structures & Algorithms", tags: ["200+ Solved", "LeetCode", "GFG"] },
        { name: "Object-Oriented Programming", tags: ["Design Patterns", "Clean Code"] },
        { name: "DBMS", tags: ["Transactions", "ACID", "Schema Modeling"] },
        { name: "Operating Systems", tags: ["Processes", "Memory", "Concurrency"] },
        { name: "Git & GitHub", tags: ["Branching", "Version Control"] },
        { name: "Postman & VS Code", tags: ["API Testing", "Debugging"] },
      ],
    },
  ] as SkillCategory[],

  projects: [
    {
      id: "growthpilot-ai",
      name: "GrowthPilot AI: Multi-Agent Agentic Commerce Copilot",
      tagline: "Autonomous 4-Agent Orchestration Engine with LangGraph & Groq LLaMA 3.3 70B",
      period: "2026",
      description:
        "An enterprise-grade agentic AI system orchestrating four specialized autonomous agents (Discovery, Personalization, Cart Recovery, Analytics) using LangGraph state graphs and Groq LLaMA 3.3 70B to automate an end-to-end e-commerce growth workflow.",
      problem:
        "Modern e-commerce workflows involve disconnected silos: product discovery fails to personalize in real time, cart abandonment follow-ups lack context, and growth analytics require manual compilation.",
      solution:
        "Architected an autonomous multi-agent state graph where four specialized agents collaborate with shared state. Built a RAG pipeline with ChromaDB and HuggingFace embeddings for semantic product discovery and context-grounded agent reasoning.",
      architecture: {
        title: "GrowthPilot AI Multi-Agent State Graph",
        steps: [
          {
            title: "1. Intent & Session Router",
            description: "Classifies customer intent and triggers specialized agent subgraphs based on real-time activity.",
            tech: "LangGraph StateGraph / Python",
          },
          {
            title: "2. Autonomous Discovery Agent",
            description: "Executes semantic product discovery using ChromaDB vector search and HuggingFace embeddings.",
            tech: "ChromaDB / HuggingFace",
          },
          {
            title: "3. Personalization & Recovery Agents",
            description: "Synthesizes customer purchase histories to trigger personalized promotions and cart recovery workflows.",
            tech: "Groq LLaMA 3.3 70B / LangChain",
          },
          {
            title: "4. Autonomous Analytics Agent",
            description: "Aggregates conversion rates, token usage metrics, and multi-agent interaction insights into dashboards.",
            tech: "Streamlit / Python",
          },
        ],
      },
      features: [
        "Orchestration of 4 autonomous agents: Discovery, Personalization, Cart Recovery, and Analytics",
        "LangGraph cyclic state graph managing dynamic agent handoffs and context memory",
        "Sub-second agent execution powered by Groq LLaMA 3.3 70B LPU acceleration",
        "Semantic product retrieval powered by ChromaDB and HuggingFace embeddings",
        "Real-time customer journey analytics dashboard",
        "Context-grounded prompt templates reducing hallucination to near zero",
      ],
      techStack: [
        "Python",
        "LangGraph",
        "LangChain",
        "Groq (LLaMA 3.3 70B)",
        "ChromaDB",
        "HuggingFace Embeddings",
        "Streamlit",
        "RAG",
      ],
      category: "Agentic AI",
      githubUrl: "https://github.com/Rishuraj0610/growthpilot-ai",
      liveUrl: "https://growthpilot-ai.preview.app",
      isFeatured: true,
      challenges:
        "Managing shared state across 4 autonomous agents without race conditions or looping, and ensuring deterministic structured JSON outputs from LLaMA 3.3 70B.",
      whatILearned:
        "Deepened mastery over cyclic graph state management in LangGraph, agentic routing patterns, and low-latency token streaming with Groq.",
      metricsOrHighlight: "4 Autonomous Agents • Groq LLaMA 3.3 70B • ChromaDB RAG",
    },
    {
      id: "documind-ai",
      name: "DocuMind: Full-Stack AI Research & Document Intelligence Platform",
      tagline: "Production Hybrid RAG (BM25 + Cosine) & 5-Utility Academic NLP Suite",
      period: "2026",
      description:
        "A full-stack AI research and document intelligence platform featuring a hybrid retrieval RAG engine (BM25 + Cosine similarity) for citation-tracked document analysis and an academic integrity suite of 5 NLP micro-utilities.",
      problem:
        "Standard vector search often misses exact technical keywords, while keyword search lacks semantic understanding. Furthermore, researchers need verified inline citations and academic integrity checking tools in one unified interface.",
      solution:
        "Engineered a production-style hybrid RAG pipeline combining BM25 keyword matching with high-dimensional vector embeddings, paired with an NLP academic-integrity suite of five micro-utilities powered by Google Gemini API.",
      architecture: {
        title: "DocuMind Hybrid RAG & NLP Architecture",
        steps: [
          {
            title: "1. Document Preprocessing & Parsing",
            description: "Multi-format document ingestion (.pdf, .docx, .txt) with recursive character splitting and metadata tagging.",
            tech: "Node.js / Express / Multer",
          },
          {
            title: "2. Hybrid Vector + BM25 Indexing",
            description: "Parallel indexing into ChromaDB vector store and BM25 sparse index for exact terminology matching.",
            tech: "ChromaDB / BM25 Algorithm",
          },
          {
            title: "3. Re-ranked Context Retrieval",
            description: "Reciprocal rank fusion combining dense vector embeddings with BM25 sparse scores for superior recall.",
            tech: "TypeScript / PostgreSQL",
          },
          {
            title: "4. Grounded Synthesis & Citations",
            description: "Google Gemini generation with verified inline citations and text-to-speech audio synthesis.",
            tech: "Google Gemini API / Web Speech",
          },
          {
            title: "5. Academic Integrity NLP Suite",
            description: "Prompt-engineered micro-utilities: Paraphraser, Grammar Corrector, AI Detector, Plagiarism Scanner, Humanizer.",
            tech: "Prompt Engineering / Gemini API",
          },
        ],
      },
      features: [
        "Production-style hybrid RAG engine (BM25 + Cosine similarity) minimizing hallucinations",
        "Verifiable page-level and section-level citation stamps",
        "Academic integrity suite: Paraphraser, Grammar Corrector, AI Detector, Plagiarism Scanner, and Humanizer",
        "Full-stack architecture built on React 19, TypeScript, Node.js, Express, and PostgreSQL",
        "Secure stateless JWT token authentication with role-based access",
        "Document-to-speech (TTS) playback and Markdown/PDF report exports",
      ],
      techStack: [
        "React 19",
        "TypeScript",
        "Node.js",
        "Express",
        "PostgreSQL",
        "Google Gemini API",
        "ChromaDB",
        "BM25 Retrieval",
        "JWT Auth",
      ],
      category: "AI / GenAI",
      githubUrl: "https://github.com/Rishuraj0610/documind-ai",
      liveUrl: "https://documind-ai.preview.app",
      isFeatured: true,
      challenges:
        "Balancing sparse BM25 scores with dense cosine distance to achieve optimal re-ranking without latency spikes on multi-page PDF uploads.",
      whatILearned:
        "Mastered hybrid search theory, dense vs sparse representations, reciprocal rank fusion, and modular prompt pipelines for distinct NLP micro-tools.",
      metricsOrHighlight: "React 19 + TypeScript • BM25 Hybrid RAG • 5 NLP Tools",
    },
    {
      id: "stuttercare-ai",
      name: "StutterCare AI: Speech Therapy & AI Counselling Platform",
      tagline: "Empathetic Groq LLM Agent & ML Therapy Recommendation Engine",
      period: "Nov 2025 – Apr 2026",
      roleOrTeam: "4-Member Agile Team Project",
      description:
        "A full-stack speech-therapy web application integrating a Groq-powered LLM counselling agent delivering adaptive, empathetic conversational support alongside clinical speech exercises and an ML recommendation engine.",
      problem:
        "Individuals with speech disorders often face emotional anxiety during exercises and lack personalized pacing between therapy sessions, leading to high abandonment rates.",
      solution:
        "Built a responsive Node.js and MySQL web application with a Groq-powered empathetic conversational agent and an ML-driven recommendation engine that customizes therapy routines based on user progression.",
      architecture: {
        title: "StutterCare AI Clinical Support System",
        steps: [
          {
            title: "1. Interactive Exercise Ingestion",
            description: "Speech drill tracking, hesitation duration logging, and repetition feedback capture.",
            tech: "Node.js / Express / JavaScript",
          },
          {
            title: "2. Groq-Powered Empathetic Agent",
            description: "Low-latency LLM agent with prompt engineering tuned for empathetic psychological support and positive reinforcement.",
            tech: "Groq API / LLaMA / Prompt Engineering",
          },
          {
            title: "3. ML Recommendation Engine",
            description: "Calculates optimal exercise difficulty progression based on historical completion and fluency scores.",
            tech: "Machine Learning / MySQL",
          },
          {
            title: "4. Dual Dashboard Analytics",
            description: "Separate analytics interfaces for patients to track fluency progress and therapists to review clinical data.",
            tech: "MySQL / Responsive UI / Agile",
          },
        ],
      },
      features: [
        "Groq-powered conversational counselling agent for psychological encouragement",
        "Machine Learning recommendation engine optimizing therapy plan difficulty",
        "Boosted session completion rates by 35% through personalized adaptation",
        "Comprehensive patient and therapist-facing analytics dashboards",
        "Built in an Agile team of 4 members with sprint-based delivery",
        "Secure relational storage of patient logs and therapy session history in MySQL",
      ],
      techStack: [
        "Node.js",
        "Express",
        "MySQL",
        "Groq API",
        "Machine Learning",
        "Prompt Engineering",
        "Agile / Scrum",
      ],
      category: "Full-Stack",
      githubUrl: "https://github.com/Rishuraj0610/stuttercare-ai",
      liveUrl: undefined,
      isFeatured: true,
      challenges:
        "Crafting prompt boundaries that deliver supportive, empathetic counseling without offering misleading medical diagnoses, and engineering real-time ML progression scores.",
      whatILearned:
        "Agile team collaboration, prompt engineering for sensitive psychological domains, and designing relational schemas in MySQL for clinical metrics.",
      metricsOrHighlight: "+35% Session Completion • Groq LLM Agent • 4-Person Agile Team",
    },
    {
      id: "codsoft-python-ml-suite",
      name: "CodSoft ML Suite: Modular Python Applications",
      tagline: "Engineered 5 Machine Learning & Modular OOP Applications",
      period: "June 2024 – July 2024",
      roleOrTeam: "Python Developer Intern Project",
      description:
        "A suite of 5 Python applications developed during internship at CodSoft, implementing classical machine learning algorithms, modular object-oriented design patterns, and comprehensive unit tests.",
      problem:
        "Developing real-world machine learning prototypes often suffers from tightly-coupled code, fragile data pipelines, and high debugging overhead.",
      solution:
        "Engineered 5 distinct applications following SOLID principles and modular OOP design, implementing automated test suites that eliminated 25+ functional bugs.",
      architecture: {
        title: "CodSoft Modular Python Pipeline",
        steps: [
          {
            title: "1. Data Pipeline & Feature Engineering",
            description: "Automated preprocessing, normalization, and feature selection routines.",
            tech: "Python / Pandas / NumPy",
          },
          {
            title: "2. Algorithm Implementation",
            description: "Applied classification and regression algorithms tailored to application specs.",
            tech: "Scikit-Learn / Machine Learning",
          },
          {
            title: "3. Modular OOP Architecture",
            description: "Encapsulated business logic into testable classes and decoupled service layers.",
            tech: "Object-Oriented Programming (OOP)",
          },
          {
            title: "4. Systematic Unit & Bug Resolution",
            description: "Comprehensive test coverage resolving 25+ bugs and slashing debugging time by 30%.",
            tech: "PyTest / Git / Agile",
          },
        ],
      },
      features: [
        "5 production-grade Python applications built with modular OOP architecture",
        "Implementation of core machine learning algorithms with data validation",
        "25+ functional bugs systematically identified and resolved",
        "Reduced debugging time by 30% through robust unit testing",
        "100% of assigned milestones delivered on schedule in a remote Agile setup",
      ],
      techStack: [
        "Python",
        "Machine Learning",
        "OOP",
        "Scikit-Learn",
        "Pandas",
        "NumPy",
        "Git",
      ],
      category: "Backend",
      githubUrl: "https://github.com/Rishuraj0610",
      liveUrl: undefined,
      isFeatured: false,
      challenges:
        "Refactoring spaghetti prototype scripts into decoupled, reusable object-oriented modules while maintaining tight milestone deadlines.",
      whatILearned:
        "Professional software engineering practices, remote Agile collaboration, and writing maintainable Python code for machine learning pipelines.",
      metricsOrHighlight: "5 ML Apps • 25+ Bugs Resolved • -30% Debugging Time",
    },
    {
      id: "cloudscale-gateway",
      name: "CloudScale Gateway: Distributed Task & Cache Service",
      tagline: "High-Throughput Node.js Rate Limiter, Redis Cache & Worker Queue",
      period: "2025",
      description:
        "A high-concurrency backend service prototype demonstrating token bucket rate limiting, Redis write-through caching, and asynchronous job queuing to prevent database exhaustion under peak load.",
      problem:
        "High-traffic API endpoints frequently degrade when subjected to sudden spikes in read/write traffic without distributed caching and background queue isolation.",
      solution:
        "Engineered a Node.js/Express gateway featuring token bucket rate limiting, Redis write-through caching, and asynchronous task execution.",
      architecture: {
        title: "Distributed Gateway Architecture",
        steps: [
          {
            title: "1. Token Bucket Rate Limiting",
            description: "Enforces IP and API-key rate limits before admitting incoming requests.",
            tech: "Node.js / Express / Redis",
          },
          {
            title: "2. Write-Through Query Caching",
            description: "Caches frequent query responses in Redis to offload PostgreSQL and MySQL.",
            tech: "Redis / In-Memory Store",
          },
          {
            title: "3. Asynchronous Worker Pool",
            description: "Dispatches heavy background tasks into isolated worker queues.",
            tech: "BullMQ / Worker Threads",
          },
        ],
      },
      features: [
        "Token bucket algorithm rate limiting at API gateway layer",
        "In-memory Redis caching reducing database read latency by up to 80%",
        "Stateless JWT authorization headers with validation middleware",
        "Asynchronous background worker queue for compute-heavy tasks",
      ],
      techStack: [
        "Node.js",
        "Express",
        "TypeScript",
        "PostgreSQL",
        "Redis",
        "Docker",
      ],
      category: "Backend",
      githubUrl: "https://github.com/Rishuraj0610",
      liveUrl: undefined,
      isFeatured: false,
      challenges:
        "Synchronizing cache invalidation strategies without introducing stale reads during concurrent writes.",
      whatILearned:
        "Distributed caching trade-offs, token bucket algorithm design, and connection pooling in high-load backends.",
      metricsOrHighlight: "Token Bucket Rate Limiter • Redis Cache • Asynchronous Workers",
    },
    {
      id: "codeguard-ai",
      name: "CodeGuard AI: AST Vulnerability & Pull Request Reviewer",
      tagline: "Static Analysis & LLM-Powered Security Microservice for Git CI/CD",
      period: "2025 – 2026",
      description:
        "An automated code quality and security microservice that intercepts Git pull requests, executes abstract syntax tree (AST) taint analysis to flag OWASP vulnerabilities (SQLi, XSS), and utilizes Google Gemini API for contextual refactoring suggestions.",
      problem:
        "Manual code reviews are time-consuming and frequently miss critical security misconfigurations and high cyclomatic complexity before staging deployment.",
      solution:
        "Engineered a Python/FastAPI microservice combining AST parser rules with Google Gemini API to analyze Git diffs, annotate security vulnerabilities, and generate pull request comments.",
      architecture: {
        title: "CodeGuard AST & Security Pipeline",
        steps: [
          {
            title: "1. Webhook Ingestion & Diff Parsing",
            description: "Captures Git push/PR events and isolates modified files and hunk ranges.",
            tech: "FastAPI / Git Hooks / Python",
          },
          {
            title: "2. AST Syntax & Taint Analysis",
            description: "Parses Python & JavaScript AST to identify unvalidated inputs and dangerous calls.",
            tech: "Python AST / Bandit Engine",
          },
          {
            title: "3. Gemini Security Reasoning",
            description: "Sends sanitized diff fragments with strict prompt boundaries to evaluate logic flaws and explain remediation.",
            tech: "Google Gemini API / Prompt Engineering",
          },
          {
            title: "4. Automated PR Annotation",
            description: "Posts line-by-line comments and an aggregate security score directly to GitHub PR.",
            tech: "GitHub REST API / Docker",
          },
        ],
      },
      features: [
        "Automated AST-based static analysis detecting OWASP Top 10 vulnerabilities",
        "Contextual LLM refactoring suggestions powered by Google Gemini API",
        "Cyclomatic complexity and maintainability index calculations",
        "Seamless GitHub PR webhook integration with automated review comments",
        "Containerized deployment with Docker and FastAPI async workers",
      ],
      techStack: [
        "Python",
        "FastAPI",
        "Google Gemini API",
        "AST Parser",
        "Docker",
        "GitHub API",
        "Bandit",
      ],
      category: "AI / GenAI",
      githubUrl: "https://github.com/Rishuraj0610",
      liveUrl: undefined,
      isFeatured: false,
      challenges:
        "Filtering out benign AST false positives while optimizing LLM token context size to fit large multi-file Git diffs.",
      whatILearned:
        "Abstract syntax tree representations, AST visitor patterns, secure code audit automation, and LLM prompt grounding.",
      metricsOrHighlight: "AST Taint Analysis • OWASP Security Scanner • Automated PR Reviews",
    },
    {
      id: "smartcampus-niet",
      name: "SmartCampus NIET: High-Throughput Resource & Notice Portal",
      tagline: "Full-Stack Academic Repository & WebSocket Alert Hub for 1,200+ Students",
      period: "2024 – 2025",
      roleOrTeam: "Lead Full-Stack Developer",
      description:
        "A full-stack campus portal designed and built for NIET Computer Science students (Batch 2023–2027) providing fast indexed lecture note retrieval, department notice feeds, and real-time attendance alerts with Redis caching.",
      problem:
        "College academic resources and urgent departmental announcements were scattered across fragmented WhatsApp groups and unstructured Google Drive folders, leading to missed deadlines.",
      solution:
        "Built a responsive React and Node.js portal backed by MongoDB and Redis cache with role-based access control for students and faculty representatives.",
      architecture: {
        title: "SmartCampus Distributed Academic Hub",
        steps: [
          {
            title: "1. Client & Role-Based Auth",
            description: "React 19 single-page client with JWT authentication and student/faculty role validation.",
            tech: "React 19 / Tailwind CSS / JWT",
          },
          {
            title: "2. Fast Notice Caching Layer",
            description: "Caches frequent exam schedules and circulars in Redis with TTL invalidation.",
            tech: "Redis / Node.js Express",
          },
          {
            title: "3. Document Metadata Indexing",
            description: "Stores subject-tagged study materials, question papers, and lab manuals.",
            tech: "MongoDB / Mongoose / GridFS",
          },
          {
            title: "4. Real-Time Broadcast Service",
            description: "Pushes emergency timetable and room change alerts via WebSockets.",
            tech: "Socket.io / Node.js",
          },
        ],
      },
      features: [
        "Engineered for 1,200+ NIET CSE batch students across academic semesters",
        "Sub-100ms response times for circulars via Redis write-through caching",
        "Subject-wise categorized study note repository with search and filter",
        "Instant WebSocket notifications for examination dates and schedule adjustments",
        "Secure stateless authentication with role-based permissions (Student/Admin)",
      ],
      techStack: [
        "React 19",
        "TypeScript",
        "Node.js",
        "Express",
        "MongoDB",
        "Redis",
        "Socket.io",
        "Tailwind CSS",
      ],
      category: "Full-Stack",
      githubUrl: "https://github.com/Rishuraj0610",
      liveUrl: undefined,
      isFeatured: false,
      challenges:
        "Structuring scalable MongoDB compound indexes across subject, year, and semester tags while maintaining sub-second file uploads.",
      whatILearned:
        "Full-stack state management, Redis caching patterns, WebSocket broadcast topologies, and user-centric frontend ergonomics.",
      metricsOrHighlight: "1,200+ Students Served • Sub-100ms Redis Cache • WebSocket Broadcasts",
    },
    {
      id: "alphaforecast-market",
      name: "AlphaForecast: Algorithmic Momentum & Sentiment Intelligence",
      tagline: "Hybrid Quantitative Modeling with Technical Indicators & FinBERT NLP",
      period: "2025",
      description:
        "A quantitative market intelligence tool that combines technical algorithmic momentum indicators (RSI, MACD, 50/200-day EMA crossover) with FinBERT financial news sentiment scoring to evaluate stock volatility.",
      problem:
        "Technical indicators lag during sudden macroeconomic news events, while raw sentiment models lack quantifiable price support/resistance metrics.",
      solution:
        "Synthesized quantitative technical analysis with HuggingFace FinBERT news sentiment scoring into an aggregated composite risk index with an interactive Streamlit dashboard.",
      architecture: {
        title: "AlphaForecast Quantitative Pipeline",
        steps: [
          {
            title: "1. Financial Data Ingestion",
            description: "Fetches historical adjusted close prices and live Yahoo Finance ticker streams.",
            tech: "Yahoo Finance API / Pandas / NumPy",
          },
          {
            title: "2. Technical Indicator Computation",
            description: "Calculates rolling 14-day RSI, MACD signal convergence, and EMA cross points.",
            tech: "Python / TA-Lib Algorithms",
          },
          {
            title: "3. FinBERT NLP Sentiment Scoring",
            description: "Extracts daily financial news headlines and computes polarity weights with FinBERT.",
            tech: "HuggingFace Transformers / FinBERT",
          },
          {
            title: "4. Composite Risk Synthesis",
            description: "Computes momentum-sentiment alignment index and visualizes alerts.",
            tech: "Streamlit / Plotly Interactive Charts",
          },
        ],
      },
      features: [
        "Hybrid quantitative model synthesizing technical momentum with NLP sentiment",
        "FinBERT transformer model fine-tuned for financial headline polarity",
        "Real-time technical indicators: RSI, MACD, EMA 50/200 Golden Cross",
        "Interactive risk distribution graphs with Streamlit and Plotly",
        "Historical backtesting simulator calculating hypothetical win rates",
      ],
      techStack: [
        "Python",
        "Streamlit",
        "Scikit-Learn",
        "FinBERT (HuggingFace)",
        "Pandas",
        "NumPy",
        "Plotly",
      ],
      category: "Backend",
      githubUrl: "https://github.com/Rishuraj0610",
      liveUrl: undefined,
      isFeatured: false,
      challenges:
        "Handling rate limits on financial news feeds and normalizing polarity scores alongside unbounded technical momentum oscillators.",
      whatILearned:
        "Time-series data manipulation, financial transformer NLP architectures, data visualization with Plotly, and quantitative risk modeling.",
      metricsOrHighlight: "FinBERT NLP Sentiment • Hybrid Technical Indicators • Real-Time Streamlit",
    },
  ] as Project[],

  journey: [
    {
      period: "2023 – 2024 (Year 1)",
      title: "C++ & Data Structures Mastery",
      focus: "Object-Oriented Programming, Algorithms, Problem Solving, STL",
      description:
        "Established core programming discipline in C++ and Python. Completed the Udacity C++ Nanodegree Program and solved 200+ problems on LeetCode and GeeksforGeeks across arrays, trees, graphs, and dynamic programming.",
      highlights: [
        "Completed Udacity C++ Nanodegree Program covering memory management & concurrency",
        "Solved 200+ DSA problems across LeetCode & GeeksforGeeks",
        "Mastered Object-Oriented Programming (OOP) and software design fundamentals",
      ],
      badge: "Foundations",
    },
    {
      period: "2024 (Year 2)",
      title: "Python Developer Internship & Backend Engineering",
      focus: "CodSoft Internship, ML Algorithms, Relational Databases, REST APIs",
      description:
        "Worked as Python Developer Intern at CodSoft, engineering 5 machine learning applications and resolving 25+ functional bugs. Expanded into backend API development with Node.js, Express, MySQL, and PostgreSQL.",
      highlights: [
        "Engineered 5 Python applications at CodSoft; cut debugging effort by 30%",
        "Designed relational schemas and queries in MySQL and PostgreSQL",
        "Completed Deloitte via Forage Data Analytics Virtual Job Simulation",
      ],
      badge: "Internship & Backend",
    },
    {
      period: "2025 (Year 3)",
      title: "Google Cloud & Agentic AI Expansion",
      focus: "GCP Arcade Facilitator, ServiceNow Agentic AI, LangChain, Hybrid RAG",
      description:
        "Earned the Google Cloud Arcade Facilitator 2025 Certificate by completing 15+ hands-on labs across GCP compute, data, and AI services. Built StutterCare AI in a 4-person Agile team and earned the ServiceNow & SmartBridge Agentic AI credential.",
      highlights: [
        "Earned Google Cloud Arcade Facilitator 2025 Certificate across 15+ hands-on labs",
        "Co-built StutterCare AI (+35% session completion boost with Groq LLM agent)",
        "Completed ServiceNow University & SmartBridge (AICTE) Agentic AI & Flows credential",
      ],
      badge: "Cloud & Agentic AI",
    },
    {
      period: "2026 – 2027 (Year 4 & Final Year)",
      title: "Autonomous Multi-Agent Copilots & Enterprise Deployment",
      focus: "GrowthPilot AI, DocuMind Hybrid RAG, System Design, SDE Readiness",
      description:
        "Currently in B.Tech CSE (Batch 2023–2027) with CGPA 8.21/10. Designed GrowthPilot AI orchestrating 4 autonomous agents with LangGraph and DocuMind hybrid RAG (BM25 + Cosine). Actively preparing for Software Engineer & AI Engineer roles.",
      highlights: [
        "Architected GrowthPilot AI 4-agent autonomous system using LangGraph and Groq",
        "Engineered DocuMind full-stack hybrid RAG platform with 5 NLP micro-tools",
        "Maintaining academic excellence with CGPA 8.21/10 at NIET Greater Noida",
      ],
      badge: "SDE / AI Ready",
    },
  ] as JourneyMilestone[],

  education: {
    degree: "Bachelor of Technology (B.Tech)",
    major: "Computer Science and Engineering",
    institution: "Noida Institute of Engineering and Technology (NIET)",
    affiliation: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
    location: "Greater Noida, India",
    duration: "2023 – 2027",
    cgpa: "8.21 / 10",
    keyCourses: [
      "Data Structures & Algorithms",
      "Database Management Systems (DBMS)",
      "Operating Systems",
      "Object-Oriented Programming (OOP)",
      "Computer Networks",
      "Software Engineering",
    ],
    highlights: [
      "Maintained 8.21 / 10 CGPA throughout academic curriculum",
      "Hands-on project work in Generative AI, multi-agent systems, and cloud infrastructure",
      "2023–2027 Batch actively preparing for enterprise Software Engineering roles",
    ],
  },

  certifications: [
    {
      id: "servicenow-agentic-ai",
      title: "ServiceNow Administration, Agentic AI, Flows, ATF",
      issuer: "ServiceNow University & SmartBridge (AICTE)",
      year: "2026",
      credentialType: "Virtual Internship",
      details:
        "Comprehensive training in ServiceNow Administration, Agentic AI, Automated Test Framework (ATF), and enterprise workflow automation.",
    },
    {
      id: "gcp-arcade-facilitator",
      title: "Arcade Facilitator Program — Certificate of Achievement",
      issuer: "Google Cloud",
      year: "2025",
      credentialType: "Cloud Certificate",
      details:
        "Completed 15+ hands-on labs across Google Cloud Platform compute, data storage, IAM security, and AI services, building real cloud deployment proficiency.",
    },
    {
      id: "udacity-cpp",
      title: "C++ Nanodegree Program",
      issuer: "Udacity",
      year: "2025",
      credentialType: "Nanodegree",
      details:
        "Deep dive into advanced C++, object-oriented software architecture, memory management, pointers, and concurrent multithreading.",
    },
    {
      id: "deloitte-data-analytics",
      title: "Data Analytics Virtual Job Simulation",
      issuer: "Deloitte via Forage",
      year: "2025",
      credentialType: "Job Simulation",
      details:
        "Practical simulation addressing data quality analysis, business metric interpretation, and dashboard visualization for enterprise decision makers.",
    },
  ] as CertificationItem[],

  achievements: [
    {
      id: "dsa-200",
      title: "200+ DSA Problems Solved",
      issuer: "LeetCode & GeeksforGeeks",
      date: "Ongoing",
      category: "Coding",
      description:
        "Solved 200+ Data Structures and Algorithms problems across LeetCode and GeeksforGeeks, demonstrating strong analytical, algorithmic, and problem-solving capability.",
      credentialUrl: "https://leetcode.com/u/rajrishu0610",
    },
    {
      id: "agentic-genai-deployment",
      title: "End-to-End Agentic GenAI Product Architecture",
      issuer: "Independent Engineering",
      date: "2026",
      category: "Product",
      description:
        "Independently designed and built agent Generative AI products (GrowthPilot AI & DocuMind) from concept to deployment, taking full ownership of architecture across LangGraph, ChromaDB, and Groq.",
    },
    {
      id: "gcp-arcade-award",
      title: "Google Cloud Arcade Facilitator 2025",
      issuer: "Google Cloud Platform",
      date: "2025",
      category: "Cloud",
      description:
        "Earned the Google Cloud Arcade Facilitator 2025 Certificate by completing 15+ hands-on labs across GCP compute, data, and AI services, building practical cloud deployment exposure.",
      credentialUrl: "https://www.cloudskillsboost.google",
    },
  ] as Achievement[],

  codingProfiles: [
    {
      platform: "GitHub",
      handle: "@Rishuraj0610",
      stats: "GrowthPilot AI, DocuMind, StutterCare",
      description: "Clean code repositories, multi-agent LangGraph workflows, RAG pipelines, and full-stack applications with clear documentation.",
      url: "https://github.com/Rishuraj0610/",
      icon: "Github",
      color: "hover:border-[#111111] hover:text-[#111111]",
    },
    {
      platform: "LinkedIn",
      handle: "rishu-raj0610",
      stats: "Professional Network & Updates",
      description: "Connecting with software engineers, AI researchers, and tech recruiters for 2027 batch engineering roles.",
      url: "https://www.linkedin.com/in/rishu-raj0610/",
      icon: "Linkedin",
      color: "hover:border-[#111111] hover:text-[#111111]",
    },
    {
      platform: "LeetCode",
      handle: "@rajrishu0610",
      stats: "200+ Problems Solved",
      description: "Practicing algorithmic problem solving focusing on arrays, dynamic programming, trees, graphs, and two-pointer logic.",
      url: "https://leetcode.com/u/rajrishu0610",
      icon: "Code",
      color: "hover:border-[#111111] hover:text-[#111111]",
    },
    {
      platform: "GeeksforGeeks",
      handle: "rajrishu0610",
      stats: "Core CS & Algorithms Practice",
      description: "Reinforcing data structures, algorithmic complexities, and technical interview question patterns.",
      url: "https://geeksforgeeks.org/user/rajrishu0610",
      icon: "Terminal",
      color: "hover:border-[#111111] hover:text-[#111111]",
    },
  ] as CodingProfile[],

  blogPosts: [
    {
      id: "multi-agent-langgraph",
      title: "Orchestrating 4 Autonomous Agents with LangGraph & Groq LLaMA 3.3 70B",
      readTime: "6 min read",
      date: "2026",
      category: "Agentic AI",
      summary:
        "How to architect stateful cyclic graphs with LangGraph, manage dynamic agent handoffs between Discovery, Personalization, and Recovery agents, and leverage Groq LPU acceleration for sub-2s responses.",
      content: [
        "In traditional agent pipelines, single-prompt LLM execution breaks down when faced with complex multi-step reasoning. To automate an entire e-commerce journey in GrowthPilot AI, I decomposed the problem into four specialized autonomous agents: Discovery, Personalization, Cart Recovery, and Analytics.",
        "Using LangGraph's StateGraph, each agent acts as a specialized node that inspects shared state, invokes tools, and either transitions to the next specialized node or returns final structured output.",
        "By pairing LangGraph with Groq's LLaMA 3.3 70B inference engine, complex multi-node reasoning cycles complete in under two seconds, delivering true real-time copilot interactions without conversational latency.",
      ],
    },
    {
      id: "hybrid-rag-bm25",
      title: "Hybrid RAG: Why BM25 + Cosine Similarity Outperforms Naive Vector Search",
      readTime: "5 min read",
      date: "2026",
      category: "AI & Vector Search",
      summary:
        "Why pure dense embeddings fail on exact technical acronyms, part numbers, and code tokens, and how combining BM25 sparse matching with ChromaDB embeddings solves document hallucination.",
      content: [
        "Dense vector embeddings excel at capturing broad semantic context, but they notoriously struggle with exact keywords—such as part numbers, medical acronyms, or specific function names.",
        "In DocuMind AI, I implemented a hybrid retrieval strategy: pairing dense ChromaDB embeddings with sparse BM25 token matching, followed by reciprocal rank fusion (RRF).",
        "This dual-retrieval pipeline ensures that both semantic questions and hyper-specific keyword searches return top-accuracy chunks with verifiable page-level citation stamps.",
      ],
    },
    {
      id: "empathetic-agents-clinical",
      title: "Designing Empathetic Conversational LLM Agents for Speech Therapy",
      readTime: "5 min read",
      date: "2026",
      category: "Full-Stack AI",
      summary:
        "Lessons learned building StutterCare AI in an Agile team of 4: prompt engineering for psychological empathy, ML difficulty recommendations, and clinical compliance.",
      content: [
        "In clinical support software like StutterCare AI, an AI agent cannot merely be accurate—it must be empathetic and emotionally encouraging to prevent user abandonment during difficult speech exercises.",
        "We engineered prompt safeguards using Groq's high-speed inference to deliver conversational encouragement, paired with a machine learning engine that dynamically adapts exercise difficulty to user fluency metrics.",
        "The resulting system improved therapy session completion rates by 35% across user testing sessions.",
      ],
    },
  ] as BlogPost[],
};
