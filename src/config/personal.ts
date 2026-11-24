export interface Experience {
  company: string
  role: string
  period: string
  responsibilities: string[]
  technologies: string[]
}

export interface CaseStudy {
  number: string
  title: string
  subtitle: string
  problem: string
  contribution: string
  approach: string
  technologies: string[]
  challenges: string[]
  decisions: string[]
}

export interface PersonalProject {
  title: string
  award?: string
  screenshot?: string
  description: string
  features: string[]
  technologies: string[]
  approach: string
  metrics?: { label: string; value: string; detail?: string }[]
  github?: string
  demo?: string
}

export interface SkillCategory {
  name: string
  skills: string[]
}

export interface Certification {
  title: string
  issuer: string
  date?: string
  id?: string
  url?: string
}

export interface AcademicRecord {
  label: string
  value: string
}

export interface Achievement {
  highlight: string
  description: string
}

export interface LeadershipRole {
  role: string
  organization: string
  description: string
}

export const personal = {
  name: {
    first: 'Mahi',
    last: 'Gupta',
    full: 'Mahi Gupta',
  },
  initials: 'MG',
  title: 'Software Engineer',
  portrait: '',

  institution: 'SGSITS Indore',
  institutionFull:
    'Shri G. S. Institute of Technology and Science, Indore',
  degree: 'B.Tech Information Technology',
  year: 'Expected 2027',

  academics: [
    { label: 'CGPA', value: '8.01' },
    { label: 'Class XII', value: '92%' },
    { label: 'Class X', value: '91.40%' },
  ] satisfies AcademicRecord[],

  heroHeadline: 'Curiosity meets engineering.',

  heroDescriptor:
    'I build software that connects systems, simplifies complexity, and solves meaningful problems.',

  introduction:
    "I study Information Technology at SGSITS Indore and have interned at Renaissance/Puissant, EY, and CareMate — building backend services, designing event-driven pipelines, automating tests, and learning how production systems actually work. I’m curious about how distributed systems communicate, how infrastructure scales, and how software can be designed to stay reliable under real conditions. Right now, I’m expanding into cloud engineering, system design, and the intersection of AI with backend systems.",

  experience: [
    {
      company: 'Renaissance Technologies / Puissant',
      role: 'Technical Intern',
      period: 'May 2026 – Present',
      responsibilities: [
        'Developed backend services and REST APIs for an enterprise physical security platform.',
        'Designed event-driven notification workflows using RabbitMQ, decoupling delivery from core application logic.',
        'Built multilingual email and SMS notification processing across multiple delivery channels.',
        'Developed a WebSocket service for real-time in-app notification delivery with connection lifecycle management.',
        'Implemented a configurable multi-stage access approval engine using state machine patterns.',
        'Created reusable test automation with Playwright and Playwright MCP across API, UI, and integrated workflows.',
        'Validated AI-driven Text-to-SQL feature outputs and built analytical dashboards with Apache Superset.',
      ],
      technologies: [
        'Node.js',
        'Express.js',
        'PostgreSQL',
        'RabbitMQ',
        'Redis',
        'WebSocket',
        'Docker',
        'Playwright',
        'Jira',
        'Apache Superset',
      ],
    },
    {
      company: 'EY × MP Jal Nigam, Bhopal',
      role: 'Data Analysis & Automation Intern',
      period: 'May 2025 – June 2025',
      responsibilities: [
        'Designed Power BI dashboards with DAX KPIs for project progress, fund utilization, and expenditure analysis.',
        'Automated data extraction from 50+ URLs using Excel Power Query to centralize contractor and project reporting data.',
        'Supported government water infrastructure project monitoring and analytical reporting.',
        'Built Selenium-based automation scripts for internal workflows.',
      ],
      technologies: ['Power BI', 'DAX', 'Excel Power Query', 'Selenium', 'Python'],
    },
    {
      company: 'CareMate',
      role: 'API Development Intern',
      period: '',
      responsibilities: [
        'Developed and validated REST API endpoints for the platform backend.',
        'Contributed to backend services through Git-based collaborative development and code reviews.',
      ],
      technologies: ['REST APIs', 'Git', 'Node.js'],
    },
  ] satisfies Experience[],

  caseStudies: [
    {
      number: '01',
      title: 'Event-Driven Notification Workflows',
      subtitle: 'Decoupling delivery from business logic with message queues',
      problem:
        'Synchronous notification delivery blocks API responses, creates tight coupling between services, and fails ungracefully under load. When a business event triggers notifications across multiple channels, the originating service should not wait for each delivery to complete.',
      contribution:
        'Designed and implemented an asynchronous notification pipeline using RabbitMQ to decouple notification delivery from core application workflows. Built independent consumer services for each notification channel.',
      approach:
        'Publisher-subscriber pattern with dedicated queues for different notification channels — email, SMS, and in-app. Business events publish notification messages to RabbitMQ, which are consumed by independent processor services. Each processor handles its own delivery logic, retry strategy, and failure tracking.',
      technologies: ['RabbitMQ', 'Node.js', 'Express.js', 'PostgreSQL', 'Docker'],
      challenges: [
        'Ensuring at-least-once delivery without duplicate notifications reaching end users.',
        'Handling consumer failures and implementing dead-letter queues for messages that repeatedly fail processing.',
        'Supporting multilingual notification content across email and SMS channels.',
      ],
      decisions: [
        'Chose RabbitMQ over Redis Pub/Sub for durability guarantees — messages persist through broker restarts.',
        'Used separate queues per notification channel to allow independent scaling and failure isolation.',
        'Implemented idempotency keys to prevent duplicate deliveries on message reprocessing.',
      ],
    },
    {
      number: '02',
      title: 'Real-Time In-App Notifications',
      subtitle: 'WebSocket communication for instant event delivery',
      problem:
        'Users need instant awareness of system events — access approvals, security alerts, status changes — without polling. The notification system must maintain stable connections across varying network conditions and support multiple concurrent users.',
      contribution:
        'Built a WebSocket service that pushes real-time notifications to connected clients. Implemented connection lifecycle management, session-based routing, and graceful degradation when connections drop.',
      approach:
        'A dedicated WebSocket server subscribes to relevant RabbitMQ queues and routes incoming notifications to connected users by session identifier. Redis stores active connection state to support horizontal scaling across multiple service instances.',
      technologies: ['WebSocket', 'Redis', 'RabbitMQ', 'Node.js', 'Docker'],
      challenges: [
        'Managing connection state across service restarts without losing track of active sessions.',
        'Handling reconnection logic on the client side with exponential backoff.',
        'Scaling WebSocket connections horizontally when a single server instance reaches connection limits.',
      ],
      decisions: [
        'Used Redis for connection state rather than in-memory tracking — this supports multiple service instances behind a load balancer.',
        'Implemented exponential backoff with jitter for client reconnection to prevent thundering herd on server recovery.',
        'Separated the WebSocket service from the notification processor to allow independent scaling.',
      ],
    },
    {
      number: '03',
      title: 'Multi-Stage Access Approval',
      subtitle: 'Configurable workflow engine for sequential authorization',
      problem:
        'Access requests in a physical security system require multiple sequential approvals from different authorities. Each approval stage has distinct validation rules, authorized approvers, and timeout constraints. The workflow must enforce order and handle edge cases like approver unavailability.',
      contribution:
        'Implemented a configurable multi-stage approval workflow engine that manages request state transitions, enforces approval sequences, and triggers notifications at each stage change.',
      approach:
        'State machine pattern where each access request moves through defined approval stages. Each transition validates prerequisites — correct approver, valid time window, no conflicting requests — before advancing. Stage changes publish events that trigger notifications to the next approver in the chain.',
      technologies: ['Node.js', 'PostgreSQL', 'Sequelize', 'RabbitMQ', 'Express.js'],
      challenges: [
        'Preventing race conditions when multiple approvers act on the same request concurrently.',
        'Managing state consistency when approval actions arrive out of order across distributed components.',
        'Implementing timeout-based escalation when an approver does not respond within the allowed window.',
      ],
      decisions: [
        'Used database-level row locking for state transitions to prevent concurrent modification of the same request.',
        'Event-driven notifications for each stage change rather than polling — approvers receive immediate alerts.',
        'Made approval stage definitions configurable rather than hardcoded, supporting different workflows for different request types.',
      ],
    },
    {
      number: '04',
      title: 'API & UI Test Automation',
      subtitle: 'Cross-environment validation with Playwright',
      problem:
        'Manual testing across multiple deployment environments is slow, error-prone, and does not catch regressions early enough in the development cycle. Both API endpoints and UI workflows need automated validation that runs consistently.',
      contribution:
        'Built automated test suites for API endpoints and UI workflows using Playwright. Configured environment-specific test execution so the same test suite validates development, staging, and production environments.',
      approach:
        'Playwright handles both API testing and end-to-end browser automation. Environment-specific configuration files control base URLs, authentication credentials, and test data. Test suites are organized by feature area and can run independently or as a full regression suite.',
      technologies: ['Playwright', 'Node.js', 'REST APIs', 'TypeScript'],
      challenges: [
        'Managing test data consistency across environments where data sets differ significantly.',
        'Handling asynchronous UI state — waiting for WebSocket-delivered notifications to appear before asserting.',
        'Maintaining test reliability when dealing with dynamic content and timing-dependent interactions.',
      ],
      decisions: [
        'Chose Playwright over Selenium for better async handling, auto-waiting capabilities, and built-in API testing support.',
        'Implemented fixture-based test data management to avoid cross-test contamination and ensure repeatable results.',
        'Used page object pattern to isolate UI structure changes from test logic, reducing maintenance burden.',
      ],
    },
  ] satisfies CaseStudy[],

  projects: [
    {
      title: 'Multi-Domain ML Platform',
      award: '2nd Place — College AI/ML Expo (55 teams)',
      description:
        'A full-stack machine learning platform integrating five models through REST APIs to address practical prediction, classification, security, and sentiment analysis use cases.',
      features: [
        'CNN-based audio classification.',
        'CNN-based traffic sign classification.',
        'Video-based shoplifting detection using MobileNetV2 and BiLSTM.',
        'LightGBM-based loan repayment prediction.',
        'Fine-tuned BERT for airline sentiment analysis.',
      ],
      technologies: ['Python', 'REST APIs', 'CNN', 'BiLSTM', 'MobileNetV2', 'BERT', 'LightGBM'],
      approach:
        'Five independent ML models integrated behind a unified REST API layer. Each model handles its own preprocessing, inference, and response formatting. The API orchestrates routing and serves predictions through a single interface.',
      metrics: [
        { label: 'Audio Classification', value: '94.26%', detail: 'CNN' },
        { label: 'Shoplifting Detection', value: '94.3%', detail: 'MobileNetV2 + BiLSTM' },
        { label: 'Loan Prediction AUC', value: '0.903', detail: 'LightGBM' },
        { label: 'Sentiment Analysis', value: '84.02%', detail: 'BERT' },
      ],
      github: '',
      demo: '',
    },
    {
      title: 'AI-Based Yoga Pose Detection',
      description:
        'A computer vision-based web platform supporting yoga instructors with real-time posture assessment, alignment feedback, and session analytics.',
      features: [
        'Real-time pose detection and posture assessment.',
        'Alignment feedback during live sessions.',
        'Instructor dashboards with session-wise analytics.',
        'Correction feeds and posture trends.',
      ],
      technologies: ['Node.js', 'Express.js', 'Computer Vision', 'Machine Learning'],
      approach:
        'Computer vision models detect human body joint positions in real-time video frames. Detected poses are compared against reference poses to generate alignment scores and correction suggestions. Session data flows to instructor dashboards for trend analysis.',
      metrics: [
        { label: 'Classification Accuracy', value: '89%', detail: 'Reported project metric' },
      ],
      github: '',
      demo: '',
    },
  ] as PersonalProject[],

  skills: [
    { name: 'Programming', skills: ['Java', 'Python', 'JavaScript', 'SQL'] },
    { name: 'Backend & APIs', skills: ['Node.js', 'Express.js', 'REST APIs', 'Sequelize', 'Swagger/OpenAPI'] },
    { name: 'Databases & Caching', skills: ['PostgreSQL', 'Redis', 'SQLite'] },
    { name: 'Distributed Systems', skills: ['RabbitMQ', 'WebSocket', 'gRPC', 'Microservices'] },
    { name: 'Cloud & Infrastructure', skills: ['Docker', 'Kubernetes', 'Knative', 'Linux'] },
    { name: 'Testing & Automation', skills: ['Playwright', 'Playwright MCP', 'Selenium', 'API Testing', 'Git', 'Jira'] },
    { name: 'Data & Analytics', skills: ['Power BI', 'DAX', 'Excel Power Query', 'Apache Superset'] },
    { name: 'AI & Machine Learning', skills: ['LightGBM', 'XGBoost', 'OpenCV', 'MediaPipe', 'ML Fundamentals', 'NLP Fundamentals'] },
  ] satisfies SkillCategory[],

  certifications: [
    { title: 'Oracle Cloud Infrastructure — 2025 Certified AI Foundations Associate', issuer: 'Oracle' },
    { title: 'Introduction to Machine Learning', issuer: 'NPTEL' },
    { title: 'Natural Language Processing', issuer: 'NPTEL' },
    { title: 'Deep Learning', issuer: 'NPTEL' },
    { title: 'The Joy of Computing using Python', issuer: 'NPTEL' },
  ] as Certification[],

  achievements: [
    { highlight: '2nd Place', description: 'AI/ML Expo — among 55 competing teams' },
    { highlight: 'Topper', description: 'NPTEL Introduction to Machine Learning' },
    { highlight: 'AIR 49,553', description: 'JEE' },
  ] as Achievement[],

  leadership: [
    { role: 'Student Coordinator', organization: 'E-Cell, SGSITS', description: 'Organized Startup Expo activities and supported networking sessions involving entrepreneurs and investors.' },
    { role: 'Student Coordinator', organization: 'Club Ojaswa, SGSITS', description: 'Contributed to sponsorship acquisition and event coordination for SPIRE and MYSTIQUE.' },
    { role: 'Cultural Secretary', organization: 'SGSITS', description: 'Leadership, team coordination, and event execution.' },
  ] as LeadershipRole[],

  domains: [
    'Backend Development',
    'Microservices',
    'REST APIs',
    'Event-Driven Architecture',
    'Real-time Systems',
    'Cloud-Native Technologies',
    'Machine Learning',
    'Test Automation',
  ],

  navLinks: [
    { label: 'Experience', href: '#experience' },
    { label: 'Engineering', href: '#engineering-work' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ],

  contact: {
    email: 'guptatiya07@gmail.com',
    linkedin: 'https://www.linkedin.com/in/mahi-gupta-816673305/',
    github: 'https://github.com/gmahi7478-debug',
    resume: '',
  },
} as const