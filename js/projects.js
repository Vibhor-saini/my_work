// =============================================
// PROJECTS DATA — Edit this to add/update projects
// =============================================

const PROJECTS_DATA = [
  {
    id: 0,
    title: "Real-Time Chat Application",

    category: ["chat", "webapp", "laravel"],

    tech: ["Laravel", "Livewire", "Reverb", "MySQL", "Bootstrap 5", "Real-Time Messaging"],

    description: "A modern real-time chat web application built for seamless communication between users and admins. Includes live messaging, typing indicators, conversation management, authentication security, and responsive UI for smooth user experience.",

    features: [
      "Real-time messaging and conversation updates",
      "Typing indicators and live chat synchronization",
      "Secure authentication and session handling",
      "Responsive chat interface for desktop and mobile",
      "Conversation and message management system",
      "Optimized UI/UX with smooth user interactions"
    ],

    github: "#",

    live: "#",

    bgColor: "linear-gradient(135deg, #1a1a2e, #16213e)",

    icon: "fa-comments"
  },
  {
    id: 1,
    title: "Secure Asset Access Portal",
    category: ["nodejs", "webapp", "security"],

    tech: ["Node.js", "Authentication", "Session Management", "Cloud Integration", "Security"],

    description: "A secure Node.js-based asset management portal integrated with client cloud storage access. Users can securely log in using authorized credentials to access shared project assets and resources.",

    features: [
      "Secure authentication and session management",
      "Account lock functionality after multiple failed login attempts",
      "Cloud storage and asset access integration",
      "User login/logout activity handling",
      "Role-based secure asset access system",
      "Responsive and optimized web interface"
    ],

    github: "#",
    live: "https://team.subminimal.com/login",
    bgColor: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    icon: "fa-node-js"
  },
  {
    id: 2,
    title: "Meta Pixel & Conversions API",
    category: ["api", "laravel"],
    tech: ["Meta CAPI", "Laravel", "JavaScript", "Facebook PHP SDK"],
    description: "Complete server-side Meta Pixel + Conversions API implementation for a D2C brand. Tracks ViewContent, AddToCart, InitiateCheckout, and Purchase events with high-fidelity user data matching to improve ROAS.",
    features: [
      "Server-side Conversions API to bypass iOS 14 ad blockers",
      "Events: PageView, ViewContent, AddToCart, Purchase",
      "User data hashing for privacy compliance",
      "Event deduplication between browser pixel and server",
      "Custom event testing via Meta Events Manager",
      "Real-time conversion tracking dashboard in admin"
    ],
    github: "#",
    live: "#",
    bgColor: "linear-gradient(135deg, #1a0533, #4a0e8f40)",
    icon: "fa-plug-circle-bolt"
  },
  {
    id: 3,
    title: "Twilio SMS Notification System",
    category: ["laravel", "api"],
    tech: ["Twilio", "Laravel Queues", "MySQL", "Redis"],
    description: "An automated SMS notification system integrated with a Laravel booking platform. Sends booking confirmations, appointment reminders, and follow-up messages to customers. Built with queued jobs to handle high volume reliably.",
    features: [
      "Booking confirmation SMS on successful payment",
      "Automatic 24-hour and 1-hour appointment reminders",
      "Post-visit follow-up messages with review links",
      "SMS log tracking with delivery status",
      "Admin dashboard to view, schedule, and manage SMS campaigns",
      "Queue-based sending with retry on failure"
    ],
    github: "#",
    // live: "#",
    bgColor: "linear-gradient(135deg, #003049, #d62828)",
    icon: "fa-comments"
  },
  {
    id: 4,
    title: "Job Portal Platform",
    category: ["webapp"],
    tech: ["Laravel", "Job Portal", "Responsive Design", "Recruitment System", "Admin Panel"],

    description: "A modern job portal platform built for managing job listings, candidate applications, and recruitment workflows. Includes responsive design, user-friendly application management, and optimized hiring processes for employers and applicants.",

    features: [
      "Dynamic job posting and management system",
      "Candidate application and recruitment workflow",
      "Responsive mobile-friendly user interface",
      "Advanced admin dashboard for job management",
      "Optimized performance and clean UI/UX",
      "Secure and scalable web application structure"
    ],

    github: "#",
    live: "https://jobs.baselineitdevelopment.com/",

    bgColor: "linear-gradient(135deg, #0d0d0d, #1d3557)",

    icon: "fa-briefcase"
  },
  {
    id: 5,

    title: "Clinic Management System",

    category: ["laravel", "healthcare", "realtime"],

    tech: ["Laravel", "Pusher", "MySQL", "Bootstrap 5", "Real-Time Notifications"],

    description: "A complete clinic management system developed with Laravel to streamline patient management, appointment scheduling, staff workflows, and medical records with real-time notification support using Pusher.",

    features: [
      "Patient registration and appointment scheduling system",
      "Real-time notifications and alerts using Pusher",
      "Doctor, staff, and role-based access management",
      "Medical records and treatment tracking",
      "Responsive admin dashboard for clinic operations",
      "Secure authentication and workflow management"
    ],

    github: "#",

    live: "http://defenders.topscripts.in/Clinic_Management_System",

    bgColor: "linear-gradient(135deg, #16222A, #3A6073)",

    icon: "fa-user-doctor"
  }
];
