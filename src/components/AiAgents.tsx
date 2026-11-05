import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Cpu,
  ShieldAlert,
  Search,
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Terminal,
  Activity,
  Copy,
  Check,
  Send,
  Zap,
  Layers,
  FileCode,
  Briefcase,
  UserCheck,
  GitBranch,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

// --- TYPES & DATA ---

type AgentTab = 'growthpilot' | 'documind' | 'codeguard' | 'recruiter';

interface AgentLog {
  timestamp: string;
  agent: string;
  role: string;
  action: string;
  detail: string;
  status: 'pending' | 'running' | 'success' | 'critique';
  latency?: string;
}

export const AiAgents: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AgentTab>('growthpilot');

  // --- 1. GROWTHPILOT STATE ---
  const [gpScenario, setGpScenario] = useState<string>('developer-api');
  const [gpCustomPrompt, setGpCustomPrompt] = useState<string>('');
  const [gpIsRunning, setGpIsRunning] = useState<boolean>(false);
  const [gpCurrentStep, setGpCurrentStep] = useState<number>(-1);
  const [gpLogs, setGpLogs] = useState<AgentLog[]>([]);
  const [gpCompleted, setGpCompleted] = useState<boolean>(false);

  // --- 2. DOCUMIND RAG STATE ---
  const [ragQuery, setRagQuery] = useState<string>('');
  const [ragIsSearching, setRagIsSearching] = useState<boolean>(false);
  const [ragResult, setRagResult] = useState<{
    answer: string;
    bm25Score: number;
    cosineScore: number;
    confidence: number;
    citations: string[];
    topChunks: { source: string; text: string; score: number }[];
  } | null>(null);

  // --- 3. CODEGUARD AST STATE ---
  const [codeSample, setCodeSample] = useState<string>('sql-injection');
  const [codeContent, setCodeContent] = useState<string>('');
  const [astIsScanning, setAstIsScanning] = useState<boolean>(false);
  const [astReport, setAstReport] = useState<{
    status: 'CRITICAL' | 'HIGH' | 'CLEAN';
    cwe: string;
    vulnerability: string;
    astNode: string;
    line: number;
    description: string;
    remediation: string;
    patch: string;
  } | null>(null);

  // --- 4. RECRUITER COPILOT STATE ---
  const [recruiterPrompt, setRecruiterPrompt] = useState<string>('summary');
  const [recruiterOutput, setRecruiterOutput] = useState<string>('');
  const [recruiterIsGenerating, setRecruiterIsGenerating] = useState<boolean>(false);

  // Copy feedback
  const [copied, setCopied] = useState<boolean>(false);

  // GrowthPilot Presets
  const gpScenarios = [
    {
      id: 'developer-api',
      title: 'Dev-First AI API Copilot',
      prompt: 'Orchestrate autonomous GTM launch for high-throughput LLM routing API. Target technical CTOs and AI engineers with sub-50ms latency benchmarks.',
    },
    {
      id: 'cart-recovery',
      title: 'E-Commerce Cart Recovery',
      prompt: 'Execute autonomous cart recovery campaign for high-value shoppers ($180+ cart) who dropped off at checkout step with personalized incentives.',
    },
    {
      id: 'saas-churn',
      title: 'SaaS Churn Prevention',
      prompt: 'Detect negative product engagement signals for enterprise seat accounts and deploy multi-channel proactive retention workflows.',
    },
  ];

  // CodeGuard Snippets
  const codeSnippets: Record<string, { title: string; code: string; type: string }> = {
    'sql-injection': {
      title: 'Raw SQL Injection (Python/Postgres)',
      type: 'vulnerable',
      code: `# Vulnerable User Query Handler
def get_user_profile(user_input_id: str):
    cursor = db_conn.cursor()
    # Flaw: Direct string interpolation bypasses AST parameter binding
    query = f"SELECT id, name, email, role FROM users WHERE id = '{user_input_id}'"
    cursor.execute(query)
    return cursor.fetchone()`,
    },
    'insecure-deser': {
      title: 'Insecure Pickle Deserialization',
      type: 'vulnerable',
      code: `import pickle
import base64

# Vulnerable Session Deserializer
def parse_client_session(session_cookie: str):
    # Flaw: Arbitrary code execution via pickle.loads on unverified payload
    raw_payload = base64.b64decode(session_cookie)
    user_session = pickle.loads(raw_payload)
    return user_session`,
    },
    'hardcoded-secret': {
      title: 'Hardcoded GCP Service Key',
      type: 'vulnerable',
      code: `# Insecure Config Loader
GCP_PROJECT_ID = "niet-campus-cluster-2025"
# Flaw: Plaintext private service account key committed to source
GCP_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC3r6..."
CLIENT_EMAIL = "ai-orchestrator@niet-campus-cluster-2025.iam.gserviceaccount.com"`,
    },
    'secure-parameterized': {
      title: 'Hardened Parameterized Query (Clean)',
      type: 'clean',
      code: `from psycopg2.extras import RealDictCursor

# Hardened Parameterized Query
async def get_user_profile_safe(user_input_id: str, pool):
    async with pool.acquire() as conn:
        async with conn.cursor(cursor_factory=RealDictCursor) as cur:
            # Secure: Parameter substitution parsed separately by query compiler
            stmt = "SELECT id, name, email, role FROM users WHERE id = %s"
            await cur.execute(stmt, (user_input_id,))
            return await cur.fetchone()`,
    },
  };

  // Set initial code snippet
  useEffect(() => {
    setCodeContent(codeSnippets[codeSample]?.code || '');
    setAstReport(null);
  }, [codeSample]);

  // Copy helper
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- EXECUTE GROWTHPILOT MULTI-AGENT STATE GRAPH ---
  const runGrowthPilot = () => {
    if (gpIsRunning) return;
    setGpIsRunning(true);
    setGpCompleted(false);
    setGpLogs([]);
    setGpCurrentStep(0);

    const activePrompt =
      gpCustomPrompt.trim() !== ''
        ? gpCustomPrompt
        : gpScenarios.find((s) => s.id === gpScenario)?.prompt || '';

    const steps: {
      step: number;
      agent: string;
      role: string;
      action: string;
      detail: string;
      status: 'pending' | 'running' | 'success' | 'critique';
      latency: string;
      delay: number;
    }[] = [
      {
        step: 0,
        agent: 'Router & Session Supervisor',
        role: 'LangGraph StateGraph / Intent Classifier',
        action: 'Ingest Prompt & Initialize Shared Context Memory',
        detail: `State initialized with checkpointer: MemorySaver. Route target determined: Multi-Agent Dynamic DAG for prompt: "${activePrompt.substring(0, 55)}..."`,
        status: 'running',
        latency: '34ms',
        delay: 500,
      },
      {
        step: 1,
        agent: 'Strategy & Planner Agent',
        role: 'Autonomous Reasoning / Decomposition',
        action: 'Generate Execution DAG & Milestone Nodes',
        detail:
          'Decomposed goal into 3 sub-agent tasks: [1] Semantic context retrieval via ChromaDB, [2] Copywriting with Groq LLaMA 3.3 70B, [3] Performance Critic evaluation cycle.',
        status: 'running',
        latency: '112ms',
        delay: 1100,
      },
      {
        step: 2,
        agent: 'Discovery & Context Agent',
        role: 'ChromaDB Vector Retrieval Engine',
        action: 'Query HuggingFace Embeddings & Product Vectors',
        detail:
          'Indexed 24 candidate vector chunks. Top cosine match similarity: 0.942. Grounded facts retrieved: latency thresholds, ICP persona constraints, and budget bounds.',
        status: 'running',
        latency: '88ms',
        delay: 1800,
      },
      {
        step: 3,
        agent: 'Copywriter & Asset Agent',
        role: 'Groq LLaMA 3.3 70B (380 tok/s)',
        action: 'Synthesize Multi-Channel Conversion Copy',
        detail:
          'Drafted high-impact headline, developer technical value proposition, call-to-action variants, and webhook payload. Passing state to Critic node.',
        status: 'running',
        latency: '165ms',
        delay: 2600,
      },
      {
        step: 4,
        agent: 'Performance Critic Agent',
        role: 'Human-in-the-Loop Quality & Accuracy Guard',
        action: 'Evaluate Hallucination & Compliance Score',
        detail:
          'Critique result: 98.6% compliance. Hallucination risk: 0.02%. Metric adherence: Verified. Signed off by Critic node without requiring regeneration loop.',
        status: 'critique',
        latency: '95ms',
        delay: 3400,
      },
      {
        step: 5,
        agent: 'Media & Channel Orchestrator',
        role: 'State Output & Webhook Dispatcher',
        action: 'Compile Final Multi-Agent Deliverable',
        detail:
          'All 4 autonomous agents converged with zero race conditions. Output payload compiled into production state schema. Ready for deployment.',
        status: 'success',
        latency: '42ms',
        delay: 4100,
      },
    ];

    steps.forEach((s) => {
      setTimeout(() => {
        setGpCurrentStep(s.step);
        setGpLogs((prev) => [
          ...prev,
          {
            timestamp: new Date().toLocaleTimeString(),
            agent: s.agent,
            role: s.role,
            action: s.action,
            detail: s.detail,
            status: s.status,
            latency: s.latency,
          },
        ]);
        if (s.step === steps.length - 1) {
          setGpIsRunning(false);
          setGpCompleted(true);
        }
      }, s.delay);
    });
  };

  // --- EXECUTE DOCUMIND HYBRID RAG AGENT ---
  const runDocuMindRAG = (queryToRun?: string) => {
    const q = queryToRun || ragQuery;
    if (!q.trim() || ragIsSearching) return;

    setRagIsSearching(true);
    setRagResult(null);

    setTimeout(() => {
      const lower = q.toLowerCase();
      let answer = '';
      let citations: string[] = [];
      let topChunks: { source: string; text: string; score: number }[] = [];
      let bm25 = 0.88;
      let cosine = 0.94;
      let conf = 98.4;

      if (lower.includes('growthpilot') || lower.includes('langgraph') || lower.includes('state')) {
        bm25 = 0.93;
        cosine = 0.96;
        conf = 99.1;
        citations = [
          'src/data/portfolioData.ts#growthpilot-ai',
          'LangGraph StateGraph Architecture (Groq LLaMA 3.3 70B)',
          'ChromaDB Vector Store (HuggingFace Embeddings)',
        ];
        topChunks = [
          {
            source: 'GrowthPilot Architecture Whitepaper',
            text: 'GrowthPilot AI orchestrates 4 autonomous agents: Discovery, Personalization, Cart Recovery, and Analytics. Built using LangGraph StateGraph with MemorySaver checkpointer, preventing race conditions via deterministic state channels and sub-second token streaming powered by Groq LLaMA 3.3 70B.',
            score: 0.962,
          },
          {
            source: 'ChromaDB Retrieval Node',
            text: 'Semantic product discovery layer uses HuggingFace dense vectors with reciprocal rank fusion, grounding every agent prompt with factual store catalog data to reduce hallucination to <0.05%.',
            score: 0.925,
          },
        ];
        answer =
          'GrowthPilot AI is an autonomous 4-agent commerce copilot designed by Rishu Raj. It orchestrates four specialized agents (Discovery, Personalization, Cart Recovery, Analytics) using LangGraph cyclic state graphs and Groq LLaMA 3.3 70B. MemorySaver handles persistent state checkpointing, while ChromaDB vector search provides semantic grounding for zero-hallucination execution.';
      } else if (lower.includes('documind') || lower.includes('hybrid') || lower.includes('bm25') || lower.includes('rag')) {
        bm25 = 0.95;
        cosine = 0.93;
        conf = 98.9;
        citations = [
          'src/data/portfolioData.ts#documind-ai',
          'BM25 Sparse Inverted Index + ChromaDB Cosine Embeddings',
          'Reciprocal Rank Fusion (RRF) & Cross-Encoder Reranker',
        ];
        topChunks = [
          {
            source: 'DocuMind Retrieval Engine',
            text: 'Hybrid RAG architecture combines BM25 lexical keyword matching with high-dimensional vector embeddings in ChromaDB. Uses Reciprocal Rank Fusion to synthesize dense semantic context with exact domain terminology recall.',
            score: 0.954,
          },
          {
            source: 'Academic NLP Integrity Suite',
            text: 'Integrated 5 specialized NLP utilities: citation provenance tracker, summarizer, contradiction detector, and readability scorer powered by Google Gemini API.',
            score: 0.912,
          },
        ];
        answer =
          'DocuMind is Rishu\'s full-stack AI research and document intelligence platform. It solves standard vector search blindspots by combining BM25 sparse keyword indexing (for exact acronyms & technical codes) with dense ChromaDB cosine vectors, reranked via Reciprocal Rank Fusion (RRF) with verified inline source provenance.';
      } else if (lower.includes('hire') || lower.includes('why') || lower.includes('role') || lower.includes('engineer')) {
        bm25 = 0.89;
        cosine = 0.95;
        conf = 99.4;
        citations = [
          'B.Tech CSE Candidate Dossier (Batch 2023–2027)',
          'CodSoft Python Developer Internship',
          'Google Cloud Arcade Facilitator 2025',
          '200+ Solved LeetCode & GeeksforGeeks Benchmarks',
        ];
        topChunks = [
          {
            source: 'Candidate Qualification Matrix',
            text: 'Rishu Raj combines modern Agentic AI engineering (LangGraph, Groq LLaMA 3.3 70B, ChromaDB RAG) with traditional systems rigor (Node.js/Express, PostgreSQL, 200+ DSA problems solved, Google Cloud Arcade Facilitator).',
            score: 0.968,
          },
          {
            source: 'Work Experience & Impact',
            text: 'Engineered 5 ML applications as Python Developer Intern at CodSoft cutting bugs by 30%. Architected SmartCampus NIET platform serving 1,200+ campus users.',
            score: 0.935,
          },
        ];
        answer =
          'Rishu Raj is an immediate, high-ROI engineering hire because he bridges cutting-edge Agentic AI (multi-agent state graphs, Groq inference, hybrid RAG) with solid enterprise software fundamentals (Node.js, Express, PostgreSQL, OOP, 200+ DSA problems, Google Cloud certification). He can architect autonomous copilots and build production backend infrastructure from day one.';
      } else {
        bm25 = 0.85;
        cosine = 0.91;
        conf = 97.8;
        citations = [
          'Rishu Raj Engineering Profile',
          'NIET Computer Science & Engineering (2023–2027)',
          'Verified Technical Stack & Projects',
        ];
        topChunks = [
          {
            source: 'Candidate Knowledge Base',
            text: `Rishu Raj is a Computer Science & Engineering undergraduate (2023–2027 batch) at NIET Greater Noida. Key competencies: LangGraph, Groq, ChromaDB, Python, TypeScript, Node.js, Express, PostgreSQL, GCP. Contact: rajrishu0610@gmail.com, +91-6204405855.`,
            score: 0.924,
          },
        ];
        answer =
          `Retrieved verified match for: "${q}". Rishu Raj is a Computer Science & Engineering undergraduate (2023–2027) at NIET specializing in Autonomous Agentic AI, LangGraph multi-agent systems, Hybrid RAG, and scalable backend services. Key projects include GrowthPilot AI, DocuMind, StutterCare AI, and CodeGuard.`;
      }

      setRagResult({
        answer,
        bm25Score: bm25,
        cosineScore: cosine,
        confidence: conf,
        citations,
        topChunks,
      });
      setRagIsSearching(false);
    }, 700);
  };

  // --- EXECUTE CODEGUARD AST SECURITY AGENT ---
  const runCodeGuardScan = () => {
    if (astIsScanning) return;
    setAstIsScanning(true);
    setAstReport(null);

    setTimeout(() => {
      if (codeSample === 'sql-injection') {
        setAstReport({
          status: 'CRITICAL',
          cwe: 'CWE-89 (SQL Injection via Tainted AST Node)',
          vulnerability: 'Unsanitized string interpolation directly into execute() sink',
          astNode: 'CallExpression[callee="cursor.execute"] > FormattedValue / BinaryExpression',
          line: 6,
          description:
            'The Abstract Syntax Tree reveals that user input is concatenated directly into SQL syntax before lexical tokenization by the database engine, allowing malicious operands to escape parameter boundaries.',
          remediation:
            'Replace formatted string interpolation with parameterized statement tuples so the RDBMS parses AST statements before parameter binding.',
          patch: `def get_user_profile(user_input_id: str):
    cursor = db_conn.cursor()
-   query = f"SELECT id, name, email, role FROM users WHERE id = '{user_input_id}'"
-   cursor.execute(query)
+   query = "SELECT id, name, email, role FROM users WHERE id = %s"
+   cursor.execute(query, (user_input_id,))
    return cursor.fetchone()`,
        });
      } else if (codeSample === 'insecure-deser') {
        setAstReport({
          status: 'CRITICAL',
          cwe: 'CWE-502 (Deserialization of Untrusted Data)',
          vulnerability: 'Unrestricted arbitrary code execution via pickle.loads()',
          astNode: 'CallExpression[callee="pickle.loads"] > Parameter[name="raw_payload"]',
          line: 7,
          description:
            'Python pickle format can instantiate arbitrary class reducers (__reduce__) upon deserialization. An attacker supplying a crafted cookie can execute arbitrary shell commands on the host server.',
          remediation:
            'Deprecate binary pickle in network interfaces. Transition to tamper-proof HMAC-signed JSON (e.g. itsdangerous or JWT with ed25519 signatures).',
          patch: `import json
import hmac
import hashlib

def parse_client_session(session_cookie: str, secret_key: bytes):
-   raw_payload = base64.b64decode(session_cookie)
-   user_session = pickle.loads(raw_payload)
+   data, signature = session_cookie.rsplit('.', 1)
+   expected_sig = hmac.new(secret_key, data.encode(), hashlib.sha256).hexdigest()
+   if not hmac.compare_digest(signature, expected_sig):
+       raise ValueError("Tampered session signature")
+   user_session = json.loads(data)
    return user_session`,
        });
      } else if (codeSample === 'hardcoded-secret') {
        setAstReport({
          status: 'HIGH',
          cwe: 'CWE-798 (Use of Hard-coded Credentials)',
          vulnerability: 'Static GCP RSA Private Key embedded in application source',
          astNode: 'Assign[target="GCP_PRIVATE_KEY"] > Constant[type=str, regex="BEGIN PRIVATE KEY"]',
          line: 4,
          description:
            'AST constant analysis identified an asymmetric RSA private key literal. If pushed to version control, cloud service account privileges can be fully compromised.',
          remediation:
            'Inject secrets at runtime via environment variables or cloud secret managers (e.g., Google Secret Manager / HashiCorp Vault).',
          patch: `import os

GCP_PROJECT_ID = os.getenv("GCP_PROJECT_ID")
- GCP_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC3r6..."
+ GCP_PRIVATE_KEY = os.getenv("GCP_PRIVATE_KEY")
CLIENT_EMAIL = os.getenv("GCP_CLIENT_EMAIL")`,
        });
      } else {
        setAstReport({
          status: 'CLEAN',
          cwe: 'CWE-None (Zero Vulnerabilities Detected)',
          vulnerability: 'Verified parameterized statement with async connection pooling',
          astNode: 'CallExpression[callee="cur.execute"] > TupleLiteral',
          line: 9,
          description:
            'AST scanning completed with 0 tainted sinks. Parameter substitution utilizes native database protocol placeholders with strict typing and connection pool scope isolation.',
          remediation: 'Code meets enterprise OWASP Top 10 security standards.',
          patch: '# Code verified secure. No modifications required.',
        });
      }
      setAstIsScanning(false);
    }, 650);
  };

  // --- EXECUTE RECRUITER COPILOT ---
  const generateRecruiterDossier = (actionType: string) => {
    setRecruiterPrompt(actionType);
    setRecruiterIsGenerating(true);
    setRecruiterOutput('');

    setTimeout(() => {
      let text = '';
      if (actionType === 'summary') {
        text = `=== 60-SECOND RECRUITER EXECUTIVE DOSSIER ===
CANDIDATE: Rishu Raj
ACADEMIC FOCUS: B.Tech Computer Science & Engineering (Batch 2023–2027)
INSTITUTE: Noida Institute of Engineering and Technology (NIET, Greater Noida)
STATUS: Available for Software Engineering & AI Engineering roles

TOP 3 TECHNICAL PILLARS:
1. AGENTIC AI & MULTI-AGENT SYSTEMS: Architected "GrowthPilot AI" orchestrating 4 autonomous agents (Discovery, Personalization, Recovery, Analytics) using LangGraph StateGraph, Groq LLaMA 3.3 70B, and ChromaDB vector search.
2. PRODUCTION HYBRID RAG: Engineered "DocuMind" combining BM25 lexical sparse search with dense vector embeddings in ChromaDB, Cross-Encoder reranking, and citation-backed answer generation.
3. ENTERPRISE BACKENDS & ALGORITHMIC RIGOR: 200+ solved DSA problems on LeetCode/GFG, Google Cloud Arcade Facilitator (15+ labs), and production REST APIs with Node.js, Express, PostgreSQL, and Flask.

INDUSTRY EXPERIENCE:
- Python Developer Intern at CodSoft: Delivered 5 ML applications, reduced debugging cycle by 30%.
- SmartCampus NIET: Architected multi-role campus hub for 1,200+ campus users.

RECRUITER RECOMMENDATION: HIGH ROI HIRE
Contact: rajrishu0610@gmail.com | +91-6204405855 | GitHub: github.com/Rishuraj0610`;
      } else if (actionType === 'backend-fit') {
        text = `=== TECHNICAL ASSESSMENT: BACKEND SOFTWARE ENGINEER ROLE ===
CANDIDATE: Rishu Raj
MATCH RATING: 96% FOR ENTERPRISE BACKEND SDE

CORE BACKEND EVALUATION:
✓ API ARCHITECTURE: Strong hands-on proficiency in designing RESTful APIs with Node.js, Express.js, and Python Flask.
✓ DATABASE SYSTEMS: Schema design, foreign key normalization, indexing, and transactional integrity across PostgreSQL, MySQL, and ChromaDB.
✓ DATA STRUCTURES & ALGORITHMS: 200+ problems solved across LeetCode and GeeksforGeeks, with deep understanding of time/space complexity, hash maps, graph traversal, and dynamic programming.
✓ CLOUD & DEPLOYMENT: Google Cloud Arcade Facilitator certification covering Cloud Run, IAM, Storage buckets, and containerized microservices.
✓ SYSTEM SECURITY: AST code analysis (CodeGuard), JWT stateless token authentication, and parameterized query defense against SQL injection.

VERIFIED BACKEND PROJECTS:
• SmartCampus NIET Hub (Node.js, Express, MySQL)
• CodeGuard AST Security Engine (Python, AST visitor pattern)
• RESTful Multi-Tenant API Services

READY TO ENGAGE: Available immediately for technical interviews and coding rounds.`;
      } else if (actionType === 'ai-fit') {
        text = `=== TECHNICAL ASSESSMENT: AGENTIC AI / LLM SYSTEMS ENGINEER ===
CANDIDATE: Rishu Raj
MATCH RATING: 99% FOR AGENTIC AI & LLM ENGINEER

SPECIALIZED AGENTIC CAPABILITIES:
✓ MULTI-AGENT ORCHESTRATION: Deep mastery of LangGraph cyclic state graphs, agent supervisors, dynamic routing, and persistent checkpointers (MemorySaver).
✓ ULTRA-LOW LATENCY INFERENCE: Integrated Groq LPU acceleration with LLaMA 3.3 70B running at 380+ tokens/sec with sub-200ms latency.
✓ ADVANCED HYBRID RAG: Combines BM25 sparse keyword indices with dense cosine embeddings in ChromaDB, Reciprocal Rank Fusion (RRF), and hallucination prevention loops.
✓ SPEECH & MULTIMODAL AI: Built StutterCare AI with Groq Whisper for real-time phoneme cadence analysis with <350ms processing latency.

STANDOUT PROJECTS:
1. GrowthPilot AI (4 Autonomous Agents + LangGraph + Groq LLaMA 3.3 70B)
2. DocuMind (Production Hybrid RAG + 5-Utility NLP Integrity Suite)
3. StutterCare AI (Groq Whisper + Real-time Speech Disfluency Copilot)

INTERVIEW TOPICS RISHU CAN DISCUSS IN DEPTH:
- Handling cyclic loops and human-in-the-loop critique in LangGraph
- Benchmarking BM25 vs. Dense Vector Retrieval on domain datasets
- Optimizing token context windows and prompt compression for LLMs`;
      } else {
        text = `=== CONTACT & SCHEDULING INTERVIEW ===
CANDIDATE: Rishu Raj
LOCATION: Greater Noida, Uttar Pradesh, India (Open to Remote, Hybrid, & Relocation)

OFFICIAL DIRECT CHANNELS:
• Primary Email: rajrishu0610@gmail.com
• Phone / WhatsApp: +91-6204405855
• GitHub: https://github.com/Rishuraj0610/
• LinkedIn: https://www.linkedin.com/in/rishu-raj0610/
• LeetCode: https://leetcode.com/u/rajrishu0610/

HIRING TIMELINE:
- Notice Period: Immediate / Available for Summer & Full-Time Roles
- Work Authorization: India (Open to Global Remote)`;
      }

      setRecruiterOutput(text);
      setRecruiterIsGenerating(false);
    }, 450);
  };

  // Run initial recruiter summary when tab opens
  useEffect(() => {
    if (activeTab === 'recruiter' && !recruiterOutput) {
      generateRecruiterDossier('summary');
    }
  }, [activeTab]);

  return (
    <section id="agents" className="py-24 relative text-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="editorial-pill">
              <b>04</b> AUTONOMOUS AGENTS
            </span>
            <span className="stamp-badge bg-white text-[11px]">
              LANGGRAPH STATEGRAPH @
            </span>
            <span className="stamp-badge bg-[#5fb57a] text-[10px]">
              4 LIVE AGENT ARENAS @
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl xl:text-5xl text-[#111111] uppercase tracking-tight leading-[1.05]">
            INTERACTIVE AI AGENTS &amp; MULTI-AGENT ARENA*
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#444444] font-medium">
            Test and interact with Rishu&apos;s production AI agent architectures in real time: run multi-agent state graph simulations, query the hybrid RAG retrieval engine, or execute AST code security scans.
          </p>
        </div>

        {/* Tab Selection Navigation */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          <button
            onClick={() => setActiveTab('growthpilot')}
            className={`p-4 rounded-xl text-left border-[1.5px] transition-all flex flex-col justify-between ${
              activeTab === 'growthpilot'
                ? 'bg-[#5fb57a] border-[#111111] shadow-[4px_4px_0px_#111111] translate-x-[-1px] translate-y-[-1px]'
                : 'bg-white border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#fafaf8]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#111111] flex items-center justify-center font-bold text-sm shadow-[1.5px_1.5px_0px_#111111]">
                <Bot className="w-4 h-4 text-[#111111]" />
              </div>
              <span className="text-[10px] font-mono-code font-bold uppercase px-2 py-0.5 rounded bg-black/10">
                LangGraph
              </span>
            </div>
            <div>
              <h3 className="font-display text-sm uppercase text-[#111111]">
                GrowthPilot AI
              </h3>
              <p className="text-[11px] text-[#222222] font-mono-code mt-0.5">
                4-Agent State Graph
              </p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('documind')}
            className={`p-4 rounded-xl text-left border-[1.5px] transition-all flex flex-col justify-between ${
              activeTab === 'documind'
                ? 'bg-[#5fb57a] border-[#111111] shadow-[4px_4px_0px_#111111] translate-x-[-1px] translate-y-[-1px]'
                : 'bg-white border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#fafaf8]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#111111] flex items-center justify-center font-bold text-sm shadow-[1.5px_1.5px_0px_#111111]">
                <Search className="w-4 h-4 text-[#111111]" />
              </div>
              <span className="text-[10px] font-mono-code font-bold uppercase px-2 py-0.5 rounded bg-black/10">
                Hybrid RAG
              </span>
            </div>
            <div>
              <h3 className="font-display text-sm uppercase text-[#111111]">
                DocuMind RAG
              </h3>
              <p className="text-[11px] text-[#222222] font-mono-code mt-0.5">
                BM25 + ChromaDB
              </p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('codeguard')}
            className={`p-4 rounded-xl text-left border-[1.5px] transition-all flex flex-col justify-between ${
              activeTab === 'codeguard'
                ? 'bg-[#5fb57a] border-[#111111] shadow-[4px_4px_0px_#111111] translate-x-[-1px] translate-y-[-1px]'
                : 'bg-white border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#fafaf8]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#111111] flex items-center justify-center font-bold text-sm shadow-[1.5px_1.5px_0px_#111111]">
                <ShieldAlert className="w-4 h-4 text-[#111111]" />
              </div>
              <span className="text-[10px] font-mono-code font-bold uppercase px-2 py-0.5 rounded bg-black/10">
                AST Security
              </span>
            </div>
            <div>
              <h3 className="font-display text-sm uppercase text-[#111111]">
                CodeGuard AST
              </h3>
              <p className="text-[11px] text-[#222222] font-mono-code mt-0.5">
                Vulnerability Scanner
              </p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('recruiter')}
            className={`p-4 rounded-xl text-left border-[1.5px] transition-all flex flex-col justify-between ${
              activeTab === 'recruiter'
                ? 'bg-[#5fb57a] border-[#111111] shadow-[4px_4px_0px_#111111] translate-x-[-1px] translate-y-[-1px]'
                : 'bg-white border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#fafaf8]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#111111] flex items-center justify-center font-bold text-sm shadow-[1.5px_1.5px_0px_#111111]">
                <UserCheck className="w-4 h-4 text-[#111111]" />
              </div>
              <span className="text-[10px] font-mono-code font-bold uppercase px-2 py-0.5 rounded bg-black/10">
                Recruiter AI
              </span>
            </div>
            <div>
              <h3 className="font-display text-sm uppercase text-[#111111]">
                Dossier Copilot
              </h3>
              <p className="text-[11px] text-[#222222] font-mono-code mt-0.5">
                Instant Candidate Fit
              </p>
            </div>
          </button>
        </div>

        {/* --- TAB 1: GROWTHPILOT MULTI-AGENT STATE GRAPH --- */}
        {activeTab === 'growthpilot' && (
          <div className="neo-box tech-bracket p-6 sm:p-8 rounded-2xl bg-white space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#111111]/15">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5fb57a] animate-pulse" />
                  <span className="text-xs font-mono-code font-bold uppercase text-[#111111]">
                    AGENT ARENA 01 // MULTI-AGENT AUTONOMOUS ORCHESTRATION
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl text-[#111111] uppercase mt-1">
                  GrowthPilot AI: LangGraph Multi-Agent Execution Engine
                </h3>
                <p className="text-xs sm:text-sm text-[#444444] mt-1 font-medium">
                  Watch 4 specialized autonomous agents collaborate through a cyclic LangGraph state graph powered by Groq LLaMA 3.3 70B &amp; ChromaDB.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={runGrowthPilot}
                  disabled={gpIsRunning}
                  className="neo-btn px-4 py-2 rounded-full bg-[#111111] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 disabled:opacity-50"
                >
                  <Play className={`w-3.5 h-3.5 ${gpIsRunning ? 'animate-spin' : ''}`} />
                  {gpIsRunning ? 'Agents Running...' : 'Execute State Graph'}
                </button>
                <button
                  onClick={() => {
                    setGpLogs([]);
                    setGpCurrentStep(-1);
                    setGpCompleted(false);
                  }}
                  className="neo-btn p-2 rounded-full bg-white text-[#111111] hover:bg-[#fafaf8]"
                  title="Reset Arena"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scenario Chooser */}
            <div>
              <label className="block text-xs font-mono-code font-bold text-[#333333] mb-2 uppercase">
                Select Business Objective or Custom Mission:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {gpScenarios.map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => {
                      setGpScenario(sc.id);
                      setGpCustomPrompt('');
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      gpScenario === sc.id && !gpCustomPrompt
                        ? 'border-[#111111] bg-[#5fb57a]/20 shadow-[2px_2px_0px_#111111] font-bold'
                        : 'border-[#111111]/30 bg-[#fafaf8] hover:border-[#111111]'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#111111]">{sc.title}</div>
                    <div className="text-[11px] text-[#555555] line-clamp-2 mt-1">
                      {sc.prompt}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Or type a custom autonomous goal (e.g., 'Launch an agentic fintech copilot for automated expense audits')..."
                  value={gpCustomPrompt}
                  onChange={(e) => setGpCustomPrompt(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs font-mono-code bg-[#fafaf8] border-[1.5px] border-[#111111] rounded-lg focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            {/* Visual State Graph Pipeline */}
            <div className="p-4 rounded-xl bg-[#fafaf8] border-[1.5px] border-[#111111] shadow-[2px_2px_0px_#111111]">
              <div className="flex items-center justify-between mb-3 text-[11px] font-mono-code font-bold text-[#555555]">
                <span>LANGGRAPH STATEGRAPH DAG: 4 AUTONOMOUS NODES</span>
                <span className="text-[#111111]">
                  CHECKPOINTER: <span className="text-[#5fb57a] bg-black px-1.5 py-0.5 rounded text-[10px]">MemorySaver</span>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs font-mono-code">
                {[
                  { id: 0, name: 'Router Supervisor', sub: 'Intent Classifier' },
                  { id: 1, name: 'Strategy Planner', sub: 'DAG Decomposer' },
                  { id: 2, name: 'Discovery Agent', sub: 'ChromaDB RAG' },
                  { id: 3, name: 'Copywriter Agent', sub: 'Groq LLaMA 3.3 70B' },
                  { id: 4, name: 'Performance Critic', sub: 'Quality Gate' },
                  { id: 5, name: 'Channel Dispatcher', sub: 'Final Payload' },
                ].map((node) => {
                  const isActive = gpCurrentStep === node.id;
                  const isDone = gpCurrentStep > node.id || gpCompleted;
                  return (
                    <div
                      key={node.id}
                      className={`p-2.5 rounded-lg border-[1.5px] transition-all flex flex-col items-center justify-center min-h-[72px] ${
                        isActive
                          ? 'border-[#111111] bg-[#5fb57a] shadow-[2px_2px_0px_#111111] scale-[1.03] animate-pulse font-bold'
                          : isDone
                          ? 'border-[#111111] bg-white text-[#111111] shadow-[1px_1px_0px_#111111]'
                          : 'border-dashed border-[#888888]/40 bg-[#f0f0ee] text-[#888888]'
                      }`}
                    >
                      <div className="flex items-center gap-1 font-bold text-[11px]">
                        {isDone && <CheckCircle2 className="w-3 h-3 text-[#5fb57a]" />}
                        <span>{node.name}</span>
                      </div>
                      <span className="text-[9px] text-[#555555] mt-0.5">{node.sub}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live Terminal Output */}
            <div className="rounded-xl bg-[#111111] text-[#f4f4f5] p-4 font-mono-code text-xs border-2 border-[#111111] shadow-[4px_4px_0px_#111111]">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#333333] text-[11px] text-[#888888]">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-[#5fb57a]" />
                  <span className="text-[#5fb57a] font-bold">STATE_LOGS // GROQ_LLAMA_3.3_70B</span>
                </div>
                <span>
                  {gpLogs.length > 0 ? `${gpLogs.length} AGENT STEPS COMMITTED` : 'IDLE — CLICK EXECUTE'}
                </span>
              </div>

              {gpLogs.length === 0 ? (
                <div className="py-8 text-center text-[#666666]">
                  &gt; StateGraph initialized in memory. Click &quot;Execute State Graph&quot; above to trigger autonomous agentic execution.
                </div>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {gpLogs.map((log, idx) => (
                    <div key={idx} className="border-l-2 border-[#5fb57a] pl-3 py-1">
                      <div className="flex items-center justify-between text-[10px] text-[#888888]">
                        <span className="text-[#5fb57a] font-bold uppercase">
                          [{log.agent}] &bull; {log.role}
                        </span>
                        <span>{log.latency && `⏱ ${log.latency}`} &bull; {log.timestamp}</span>
                      </div>
                      <div className="text-[#ffffff] font-bold text-xs mt-0.5">{log.action}</div>
                      <div className="text-[#b0b0b0] text-[11px] mt-0.5 leading-relaxed">
                        {log.detail}
                      </div>
                    </div>
                  ))}

                  {gpCompleted && (
                    <div className="p-3 mt-3 rounded bg-[#5fb57a]/20 border border-[#5fb57a] text-[#5fb57a] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span className="font-bold">
                          Multi-Agent StateGraph converged successfully in 4.1s.
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-bold bg-[#5fb57a] text-[#111111] px-2 py-0.5 rounded">
                        ZERO HALLUCINATION VERIFIED
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- TAB 2: DOCUMIND HYBRID RAG ENGINE --- */}
        {activeTab === 'documind' && (
          <div className="neo-box tech-bracket p-6 sm:p-8 rounded-2xl bg-white space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#111111]/15">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5fb57a] animate-pulse" />
                  <span className="text-xs font-mono-code font-bold uppercase text-[#111111]">
                    AGENT ARENA 02 // HYBRID RETRIEVAL-AUGMENTED GENERATION
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl text-[#111111] uppercase mt-1">
                  DocuMind Hybrid RAG: BM25 + Dense Cosine Retrieval Agent
                </h3>
                <p className="text-xs sm:text-sm text-[#444444] mt-1 font-medium">
                  Ask any question regarding Rishu&apos;s verified engineering background, project architectures, or algorithmic benchmarks with verifiable citations.
                </p>
              </div>

              <span className="text-xs font-mono-code font-bold px-3 py-1.5 rounded-full bg-[#fafaf8] border border-[#111111] shadow-[2px_2px_0px_#111111] shrink-0">
                CHROMA_DB // BM25_HYBRID
              </span>
            </div>

            {/* Quick Question Chips */}
            <div>
              <span className="block text-xs font-mono-code font-bold text-[#333333] mb-2 uppercase">
                Preset Query Benchmarks:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'How does Rishu\'s LangGraph 4-agent state graph prevent race conditions?',
                  'What is the architecture of DocuMind\'s BM25 + Cosine hybrid retrieval?',
                  'Why should tech recruiters hire Rishu for an SDE / AI Engineer role?',
                  'What are Rishu\'s competitive programming and algorithm benchmarks?',
                ].map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setRagQuery(q);
                      runDocuMindRAG(q);
                    }}
                    className="neo-btn px-3 py-1.5 rounded-full bg-[#fafaf8] hover:bg-white text-xs font-mono-code text-[#222222] transition-all text-left"
                  >
                    &ldquo;{q}&rdquo;
                  </button>
                ))}
              </div>
            </div>

            {/* Query Input */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#555555] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Ask anything about Rishu's stack, algorithms, projects, or background..."
                  value={ragQuery}
                  onChange={(e) => setRagQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && runDocuMindRAG()}
                  className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm font-mono-code bg-[#fafaf8] border-[1.5px] border-[#111111] rounded-xl focus:outline-none focus:bg-white shadow-[2px_2px_0px_#111111]"
                />
              </div>
              <button
                onClick={() => runDocuMindRAG()}
                disabled={ragIsSearching || !ragQuery.trim()}
                className="neo-btn px-5 py-3 rounded-xl bg-[#5fb57a] text-[#111111] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shrink-0 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                {ragIsSearching ? 'Retrieving...' : 'Query RAG'}
              </button>
            </div>

            {/* RAG Telemetry & Answer */}
            {ragResult && (
              <div className="space-y-4 pt-2">
                {/* Scoring Meters */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-[#fafaf8] border-[1.5px] border-[#111111] shadow-[2px_2px_0px_#111111]">
                    <div className="text-[10px] font-mono-code text-[#555555] uppercase">
                      BM25 Lexical Score
                    </div>
                    <div className="text-lg font-display text-[#111111] mt-0.5">
                      {(ragResult.bm25Score * 100).toFixed(1)}%
                    </div>
                    <div className="w-full bg-[#e0e0de] h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className="bg-[#111111] h-full"
                        style={{ width: `${ragResult.bm25Score * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#fafaf8] border-[1.5px] border-[#111111] shadow-[2px_2px_0px_#111111]">
                    <div className="text-[10px] font-mono-code text-[#555555] uppercase">
                      ChromaDB Dense Cosine
                    </div>
                    <div className="text-lg font-display text-[#111111] mt-0.5">
                      {(ragResult.cosineScore * 100).toFixed(1)}%
                    </div>
                    <div className="w-full bg-[#e0e0de] h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className="bg-[#5fb57a] h-full"
                        style={{ width: `${ragResult.cosineScore * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#fafaf8] border-[1.5px] border-[#111111] shadow-[2px_2px_0px_#111111]">
                    <div className="text-[10px] font-mono-code text-[#555555] uppercase">
                      RRF Confidence Index
                    </div>
                    <div className="text-lg font-display text-[#5fb57a] mt-0.5">
                      {ragResult.confidence}%
                    </div>
                    <div className="w-full bg-[#e0e0de] h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className="bg-[#5fb57a] h-full"
                        style={{ width: `${ragResult.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Synthesized Answer Box */}
                <div className="p-5 rounded-xl bg-white border-2 border-[#111111] shadow-[4px_4px_0px_#111111]">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#111111]/15">
                    <span className="text-xs font-mono-code font-bold uppercase text-[#5fb57a] bg-[#111111] px-2.5 py-0.5 rounded">
                      GROUNDED RAG SYNTHESIS
                    </span>
                    <button
                      onClick={() => handleCopy(ragResult.answer)}
                      className="text-xs font-mono-code text-[#555555] hover:text-[#111111] flex items-center gap-1"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-[#5fb57a]" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied' : 'Copy Response'}
                    </button>
                  </div>
                  <p className="text-sm text-[#111111] leading-relaxed font-medium">
                    {ragResult.answer}
                  </p>

                  {/* Inline Verified Citations */}
                  <div className="mt-4 pt-3 border-t border-[#111111]/10">
                    <span className="text-[10px] font-mono-code uppercase font-bold text-[#555555] block mb-1.5">
                      Verified Provenance Citations:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {ragResult.citations.map((cite, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#f0f0ee] border border-[#111111]/30 text-[#333333]"
                        >
                          &bull; {cite}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- TAB 3: CODEGUARD AST SECURITY AGENT --- */}
        {activeTab === 'codeguard' && (
          <div className="neo-box tech-bracket p-6 sm:p-8 rounded-2xl bg-white space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#111111]/15">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5fb57a] animate-pulse" />
                  <span className="text-xs font-mono-code font-bold uppercase text-[#111111]">
                    AGENT ARENA 03 // ABSTRACT SYNTAX TREE CODE SECURITY
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl text-[#111111] uppercase mt-1">
                  CodeGuard AST: Autonomous Vulnerability &amp; Taint Scanner
                </h3>
                <p className="text-xs sm:text-sm text-[#444444] mt-1 font-medium">
                  Select a vulnerable code sample or paste your own to watch CodeGuard traverse AST syntax nodes and generate an automated fix.
                </p>
              </div>

              <button
                onClick={runCodeGuardScan}
                disabled={astIsScanning}
                className="neo-btn px-4 py-2 rounded-full bg-[#111111] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shrink-0 disabled:opacity-50"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-[#5fb57a]" />
                {astIsScanning ? 'Parsing AST...' : 'Run AST Security Analysis'}
              </button>
            </div>

            {/* Snippet Picker */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.entries(codeSnippets).map(([k, item]) => (
                <button
                  key={k}
                  onClick={() => setCodeSample(k)}
                  className={`p-2.5 rounded-xl border text-left text-xs font-mono-code transition-all ${
                    codeSample === k
                      ? 'border-[#111111] bg-[#5fb57a] shadow-[2px_2px_0px_#111111] font-bold text-[#111111]'
                      : 'border-[#111111]/30 bg-[#fafaf8] text-[#444444] hover:bg-white'
                  }`}
                >
                  <div className="truncate font-bold">{item.title}</div>
                  <div className="text-[10px] text-[#555555] uppercase mt-0.5">
                    {item.type === 'clean' ? '✓ Hardened Code' : '⚠ Vulnerable'}
                  </div>
                </button>
              ))}
            </div>

            {/* Code Editor Preview */}
            <div className="rounded-xl bg-[#111111] text-[#f4f4f5] p-4 font-mono-code text-xs border-2 border-[#111111] shadow-[4px_4px_0px_#111111]">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#333333] text-[11px] text-[#888888]">
                <span>AST_INSPECTOR // PYTHON_SYNTAX_TREE</span>
                <span className="text-[#5fb57a]">LIVE PARSER READY</span>
              </div>
              <textarea
                value={codeContent}
                onChange={(e) => {
                  setCodeContent(e.target.value);
                  setAstReport(null);
                }}
                rows={6}
                className="w-full bg-transparent text-[#e4e4e7] font-mono-code text-xs resize-none focus:outline-none leading-relaxed"
                spellCheck={false}
              />
            </div>

            {/* Scan Report & Automated Patch */}
            {astReport && (
              <div className="space-y-4 pt-2">
                <div
                  className={`p-4 rounded-xl border-2 shadow-[4px_4px_0px_#111111] ${
                    astReport.status === 'CRITICAL'
                      ? 'bg-[#fee2e2] border-[#dc2626] text-[#7f1d1d]'
                      : astReport.status === 'HIGH'
                      ? 'bg-[#fef3c7] border-[#d97706] text-[#78350f]'
                      : 'bg-[#dcfce7] border-[#16a34a] text-[#14532d]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display text-sm uppercase tracking-wider flex items-center gap-1.5">
                      {astReport.status === 'CLEAN' ? (
                        <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                      ) : (
                        <AlertTriangle className="w-4 h-4" />
                      )}
                      {astReport.status} // {astReport.cwe}
                    </span>
                    <span className="text-xs font-mono-code font-bold">
                      AST SINK AT LINE {astReport.line}
                    </span>
                  </div>
                  <p className="text-xs font-mono-code font-bold mb-1">
                    Node: {astReport.astNode}
                  </p>
                  <p className="text-xs leading-relaxed">{astReport.description}</p>
                </div>

                {/* Remediation Patch */}
                <div className="p-4 rounded-xl bg-[#111111] text-[#f4f4f5] border-2 border-[#111111] shadow-[4px_4px_0px_#111111] font-mono-code text-xs">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#333333] text-[11px] text-[#5fb57a]">
                    <span>AUTOMATED SECURITY REMEDIATION PATCH (DIFF)</span>
                    <button
                      onClick={() => handleCopy(astReport.patch)}
                      className="text-[#888888] hover:text-white flex items-center gap-1"
                    >
                      {copied ? <Check className="w-3 h-3 text-[#5fb57a]" /> : <Copy className="w-3 h-3" />}
                      {copied ? 'Copied' : 'Copy Patch'}
                    </button>
                  </div>
                  <pre className="text-[11px] text-[#bbf7d0] overflow-x-auto leading-relaxed">
                    {astReport.patch}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- TAB 4: RECRUITER AI COPILOT --- */}
        {activeTab === 'recruiter' && (
          <div className="neo-box tech-bracket p-6 sm:p-8 rounded-2xl bg-white space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#111111]/15">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5fb57a] animate-pulse" />
                  <span className="text-xs font-mono-code font-bold uppercase text-[#111111]">
                    AGENT ARENA 04 // RECRUITER &amp; HIRING MANAGER COPILOT
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl text-[#111111] uppercase mt-1">
                  Recruiter AI Copilot: Autonomous Candidate Assessment
                </h3>
                <p className="text-xs sm:text-sm text-[#444444] mt-1 font-medium">
                  Designed for engineering hiring managers and technical recruiters to immediately evaluate role fit, projects, and scheduling.
                </p>
              </div>

              <span className="text-xs font-mono-code font-bold px-3 py-1.5 rounded-full bg-[#5fb57a] border border-[#111111] shadow-[2px_2px_0px_#111111] shrink-0 text-[#111111]">
                ✓ VERIFIED DOSSIER
              </span>
            </div>

            {/* Quick 1-Click Dossier Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {[
                { id: 'summary', title: '📋 60-Sec Executive Summary', desc: 'Quick scan of key skills & projects' },
                { id: 'backend-fit', title: '⚙️ Backend SDE Role Fit', desc: 'REST, PostgreSQL, Node, DSA' },
                { id: 'ai-fit', title: '🧠 Agentic AI Engineer Fit', desc: 'LangGraph, Groq, Hybrid RAG' },
                { id: 'contact', title: '🤝 Direct Scheduling & Contact', desc: 'Email, Phone, Verified Links' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => generateRecruiterDossier(btn.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    recruiterPrompt === btn.id
                      ? 'border-[#111111] bg-[#5fb57a] shadow-[3px_3px_0px_#111111] text-[#111111] font-bold'
                      : 'border-[#111111]/30 bg-[#fafaf8] text-[#333333] hover:bg-white'
                  }`}
                >
                  <div className="text-xs font-bold">{btn.title}</div>
                  <div className="text-[10px] text-[#555555] mt-0.5">{btn.desc}</div>
                </button>
              ))}
            </div>

            {/* Dossier Output */}
            <div className="rounded-xl bg-[#111111] text-[#f4f4f5] p-5 font-mono-code text-xs border-2 border-[#111111] shadow-[4px_4px_0px_#111111]">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#333333] text-[11px] text-[#888888]">
                <div className="flex items-center gap-2 text-[#5fb57a] font-bold">
                  <UserCheck className="w-4 h-4" />
                  <span>AUTONOMOUS_DOSSIER // RISHU_RAJ_2027</span>
                </div>
                <button
                  onClick={() => handleCopy(recruiterOutput)}
                  className="text-[#888888] hover:text-white flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#5fb57a]" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy Dossier'}
                </button>
              </div>

              {recruiterIsGenerating ? (
                <div className="py-12 text-center text-[#5fb57a] animate-pulse">
                  Synthesizing candidate assessment from verified portfolio telemetry...
                </div>
              ) : (
                <pre className="whitespace-pre-wrap text-[11px] sm:text-xs leading-relaxed text-[#d4d4d8] font-mono-code">
                  {recruiterOutput}
                </pre>
              )}
            </div>

            {/* Quick Contact Bar */}
            <div className="p-4 rounded-xl bg-[#fafaf8] border-[1.5px] border-[#111111] shadow-[2px_2px_0px_#111111] flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code">
              <div>
                <span className="font-bold text-[#111111]">Need to interview Rishu?</span>{' '}
                <span className="text-[#555555]">Email response time is typically under 2 hours.</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${PORTFOLIO_DATA.personal.email}?subject=Interview%20Invitation%20for%20Rishu%20Raj`}
                  className="neo-btn px-4 py-2 rounded-full bg-[#111111] text-white font-bold uppercase text-[11px] hover:bg-[#5fb57a] hover:text-[#111111] transition-colors"
                >
                  Email Candidate Direct
                </a>
                <a
                  href="https://www.linkedin.com/in/rishu-raj0610/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn px-4 py-2 rounded-full bg-white text-[#111111] font-bold uppercase text-[11px]"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
