const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp } = require('firebase-admin/firestore');
const serviceAccount = require('../serviceAccountKey.json');

// Initialize Firebase Admin
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

interface ChatMessage {
  sender: 'mentor' | 'mentee';
  message: string;
  timestamp: any;
}

interface Interaction {
  mentorEmail: string;
  menteeEmail: string;
  mentorProfile: {
    name: string;
    tagline: string;
    profilePicture?: string;
    company: string;
    role: string;
    experience: string;
  };
  menteeProfile: {
    name: string;
    tagline: string;
    profilePicture?: string;
    company: string;
    role: string;
    experience: string;
  };
  chatHistory: ChatMessage[];
  chatSummary: string;
  isVerifiedMatch: boolean;
  createdAt: any;
  availability: {
    timeSlots: string[];
    timezone: string;
    preferredDays: string[];
  };
}

const interactions: Interaction[] = [
  {
    mentorEmail: "aishwaryaa.udeshi@gmail.com",
    menteeEmail: "chris.gonzalez9388@gmail.com",
    mentorProfile: {
      name: "Aishwarya Udeshi",
      tagline: "Senior Software Engineer at Google | AI/ML Specialist | Mentor",
      company: "Google",
      role: "Senior Software Engineer",
      experience: "8+ years in AI/ML, Computer Vision, and Software Engineering"
    },
    menteeProfile: {
      name: "Chris Gonzalez",
      tagline: "Software Engineer at Microsoft | Looking to transition to AI/ML",
      company: "Microsoft",
      role: "Software Engineer",
      experience: "3 years in full-stack development, interested in AI/ML"
    },
    chatHistory: [
      {
        sender: "mentee",
        message: "Hi Aishwarya! I'm Chris, a software engineer at Microsoft. I've been working on full-stack development for about 3 years, but I'm really interested in transitioning into AI/ML. I've taken some online courses and built a few small projects, but I'm not sure how to make the leap professionally. Any advice?",
        timestamp: Timestamp.fromDate(new Date('2025-06-15T10:00:00Z'))
      },
      {
        sender: "mentor",
        message: "Hi Chris! That's a great goal. The transition from software engineering to AI/ML is definitely doable. What specific areas of AI/ML are you most interested in? Also, what kind of projects have you built so far?",
        timestamp: Timestamp.fromDate(new Date('2025-06-15T10:05:00Z'))
      },
      {
        sender: "mentee",
        message: "I'm particularly interested in computer vision and natural language processing. I've built a simple image classification model using TensorFlow and a basic sentiment analysis tool. I'm also learning PyTorch. What would you recommend as the next steps?",
        timestamp: Timestamp.fromDate(new Date('2025-06-15T10:10:00Z'))
      },
      {
        sender: "mentor",
        message: "Excellent! You're on the right track. For computer vision, I'd recommend diving deeper into CNN architectures and transfer learning. For NLP, start with transformers and BERT. Also, consider contributing to open-source projects - it's a great way to build your portfolio and network. Would you be interested in working on a real-world project together?",
        timestamp: Timestamp.fromDate(new Date('2025-06-15T10:15:00Z'))
      }
    ],
    chatSummary: "Chris is a software engineer at Microsoft with 3 years of experience looking to transition into AI/ML. He has basic knowledge of TensorFlow and PyTorch, with projects in image classification and sentiment analysis. He's interested in computer vision and NLP. Aishwarya offered to help with advanced concepts and suggested working on a real-world project together. Chris shows strong potential and genuine interest in the field.",
    isVerifiedMatch: true,
    createdAt: Timestamp.fromDate(new Date('2025-06-15T10:00:00Z')),
    availability: {
      timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      timezone: 'PST',
      preferredDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday']
    }
  },
  {
    mentorEmail: "aishwaryaa.udeshi@gmail.com",
    menteeEmail: "chris.gonzalez9388@gmail.com",
    mentorProfile: {
      name: "Aishwarya Udeshi",
      tagline: "Senior Software Engineer at Google | AI/ML Specialist | Mentor",
      company: "Google",
      role: "Senior Software Engineer",
      experience: "8+ years in AI/ML, Computer Vision, and Software Engineering"
    },
    menteeProfile: {
      name: "Sarah Johnson",
      tagline: "Data Scientist at Netflix | Python Expert | Analytics Mentor",
      company: "Netflix",
      role: "Data Scientist",
      experience: "5 years in data science and analytics"
    },
    chatHistory: [
      {
        sender: "mentee",
        message: "Hi Aishwarya! I'm Sarah, a data scientist at Netflix. I work primarily with Python and have experience in analytics, but I want to move into more advanced ML and deep learning. I've been working with scikit-learn and pandas, but I'm struggling with the transition to deep learning frameworks. Any tips?",
        timestamp: Timestamp.fromDate(new Date('2025-06-14T14:00:00Z'))
      },
      {
        sender: "mentor",
        message: "Hi Sarah! That's a great foundation you have. The transition from traditional ML to deep learning can be challenging. What specific problems are you trying to solve at Netflix? Understanding your use case will help me recommend the best approach.",
        timestamp: Timestamp.fromDate(new Date('2025-06-14T14:05:00Z'))
      },
      {
        sender: "mentee",
        message: "I'm working on recommendation systems and user behavior prediction. We're currently using collaborative filtering, but I want to explore neural network approaches. I've started learning TensorFlow, but it's quite overwhelming.",
        timestamp: Timestamp.fromDate(new Date('2025-06-14T14:10:00Z'))
      },
      {
        sender: "mentor",
        message: "Perfect! Recommendation systems are a great entry point into deep learning. Start with simple neural collaborative filtering models. I'd recommend PyTorch over TensorFlow for beginners - it's more intuitive. Let's work on a small project together to get you comfortable with the concepts.",
        timestamp: Timestamp.fromDate(new Date('2025-06-14T14:15:00Z'))
      }
    ],
    chatSummary: "Sarah is a data scientist at Netflix with 5 years of experience in analytics and traditional ML. She wants to transition to deep learning, specifically for recommendation systems. She's familiar with Python, scikit-learn, and pandas, but finds TensorFlow overwhelming. Aishwarya recommended PyTorch for beginners and offered to work on a collaborative filtering project together. Sarah shows strong analytical skills and clear goals.",
    isVerifiedMatch: true,
    createdAt: Timestamp.fromDate(new Date('2025-06-14T14:00:00Z')),
    availability: {
      timeSlots: ['10:00', '11:00', '13:00', '14:00', '15:00'],
      timezone: 'PST',
      preferredDays: ['Tuesday', 'Wednesday', 'Friday']
    }
  },
  {
    mentorEmail: "aishwaryaa.udeshi@gmail.com",
    menteeEmail: "chris.gonzalez9388@gmail.com",
    mentorProfile: {
      name: "Aishwarya Udeshi",
      tagline: "Senior Software Engineer at Google | AI/ML Specialist | Mentor",
      company: "Google",
      role: "Senior Software Engineer",
      experience: "8+ years in AI/ML, Computer Vision, and Software Engineering"
    },
    menteeProfile: {
      name: "Michael Chen",
      tagline: "Product Manager at Microsoft | Startup Experience | Leadership Coach",
      company: "Microsoft",
      role: "Product Manager",
      experience: "7 years in product management and startup leadership"
    },
    chatHistory: [
      {
        sender: "mentee",
        message: "Hi Aishwarya! I'm Michael, a product manager at Microsoft. I have a technical background but moved into product management. I'm interested in understanding AI/ML from a product perspective - how to evaluate AI products, work with ML teams, and make data-driven decisions. Can you help me bridge this gap?",
        timestamp: Timestamp.fromDate(new Date('2025-06-13T16:00:00Z'))
      },
      {
        sender: "mentor",
        message: "Hi Michael! That's a fantastic perspective. Product managers who understand AI/ML are incredibly valuable. What specific AI products or features are you working on? Understanding your current challenges will help me provide more targeted guidance.",
        timestamp: Timestamp.fromDate(new Date('2025-06-13T16:05:00Z'))
      },
      {
        sender: "mentee",
        message: "I'm working on a new AI-powered feature for our productivity suite. I need to understand model performance metrics, how to evaluate user feedback vs. technical metrics, and how to communicate with our ML engineers effectively. I also want to learn about ethical AI considerations.",
        timestamp: Timestamp.fromDate(new Date('2025-06-13T16:10:00Z'))
      },
      {
        sender: "mentor",
        message: "Excellent questions! Let's start with the fundamentals of ML metrics and how they translate to user experience. We should also discuss AI ethics and bias detection. I'd love to help you develop a framework for evaluating AI products. This could be a great learning opportunity for both of us.",
        timestamp: Timestamp.fromDate(new Date('2025-06-13T16:15:00Z'))
      }
    ],
    chatSummary: "Michael is a product manager at Microsoft with 7 years of experience and a technical background. He wants to understand AI/ML from a product perspective, including model evaluation, working with ML teams, and ethical considerations. He's working on an AI-powered productivity feature and needs guidance on metrics, user feedback, and effective communication with ML engineers. Aishwarya offered to help develop an AI product evaluation framework. Michael shows strong leadership potential and clear strategic thinking.",
    isVerifiedMatch: true,
    createdAt: Timestamp.fromDate(new Date('2025-06-13T16:00:00Z')),
    availability: {
      timeSlots: ['09:00', '10:00', '11:00', '12:00', '13:00'],
      timezone: 'PST',
      preferredDays: ['Monday', 'Wednesday', 'Friday']
    }
  },
  {
    mentorEmail: "aishwaryaa.udeshi@gmail.com",
    menteeEmail: "chris.gonzalez9388@gmail.com",
    mentorProfile: {
      name: "Aishwarya Udeshi",
      tagline: "Senior Software Engineer at Google | AI/ML Specialist | Mentor",
      company: "Google",
      role: "Senior Software Engineer",
      experience: "8+ years in AI/ML, Computer Vision, and Software Engineering"
    },
    menteeProfile: {
      name: "Emily Rodriguez",
      tagline: "UX Designer at Apple | Creative Problem Solver | Design Mentor",
      company: "Apple",
      role: "UX Designer",
      experience: "6 years in UX design and user research"
    },
    chatHistory: [
      {
        sender: "mentee",
        message: "Hi Aishwarya! I'm Emily, a UX designer at Apple. I'm fascinated by how AI is changing user interfaces and experiences. I want to understand the technical capabilities and limitations of AI so I can design better AI-powered products. Can you help me understand what's possible?",
        timestamp: Timestamp.fromDate(new Date('2025-06-12T11:00:00Z'))
      },
      {
        sender: "mentor",
        message: "Hi Emily! That's a brilliant intersection of skills. AI is indeed transforming UX design. What specific AI features are you working on at Apple? Understanding your current projects will help me explain the technical possibilities and constraints.",
        timestamp: Timestamp.fromDate(new Date('2025-06-12T11:05:00Z'))
      },
      {
        sender: "mentee",
        message: "I'm working on voice interfaces and predictive text features. I want to understand how these systems work, their accuracy limitations, and how to design for uncertainty. I also want to learn about AI bias and how it affects user experience.",
        timestamp: Timestamp.fromDate(new Date('2025-06-12T11:10:00Z'))
      },
      {
        sender: "mentor",
        message: "Perfect! Voice interfaces and NLP are fascinating areas. Let's discuss how to design for AI uncertainty, handle edge cases, and create transparent user experiences. We should also explore how to detect and mitigate AI bias in your designs. This could be a great collaboration!",
        timestamp: Timestamp.fromDate(new Date('2025-06-12T11:15:00Z'))
      }
    ],
    chatSummary: "Emily is a UX designer at Apple with 6 years of experience in user research and interface design. She wants to understand AI capabilities and limitations to design better AI-powered products, specifically voice interfaces and predictive text features. She's interested in designing for AI uncertainty, handling edge cases, and addressing AI bias in user experience. Aishwarya offered to help with technical constraints and bias mitigation strategies. Emily shows strong creative thinking and user-centered approach.",
    isVerifiedMatch: true,
    createdAt: Timestamp.fromDate(new Date('2025-06-12T11:00:00Z')),
    availability: {
      timeSlots: ['10:00', '11:00', '12:00', '13:00', '14:00'],
      timezone: 'PST',
      preferredDays: ['Tuesday', 'Thursday', 'Friday']
    }
  },
  {
    mentorEmail: "aishwaryaa.udeshi@gmail.com",
    menteeEmail: "chris.gonzalez9388@gmail.com",
    mentorProfile: {
      name: "Aishwarya Udeshi",
      tagline: "Senior Software Engineer at Google | AI/ML Specialist | Mentor",
      company: "Google",
      role: "Senior Software Engineer",
      experience: "8+ years in AI/ML, Computer Vision, and Software Engineering"
    },
    menteeProfile: {
      name: "David Kim",
      tagline: "Frontend Developer at Facebook | React Expert | UI/UX Enthusiast",
      company: "Facebook",
      role: "Frontend Developer",
      experience: "4 years in frontend development and React"
    },
    chatHistory: [
      {
        sender: "mentee",
        message: "Hi Aishwarya! I'm David, a frontend developer at Facebook. I've been working with React for 4 years and I'm interested in integrating AI features into web applications. I want to learn about AI APIs, real-time processing, and how to build AI-powered user interfaces. Where should I start?",
        timestamp: Timestamp.fromDate(new Date('2025-06-11T15:00:00Z'))
      },
      {
        sender: "mentor",
        message: "Hi David! That's a great combination of skills. AI integration in web apps is becoming increasingly important. What kind of AI features are you thinking about? Are you looking at computer vision, NLP, or something else? This will help me recommend the best approach.",
        timestamp: Timestamp.fromDate(new Date('2025-06-11T15:05:00Z'))
      },
      {
        sender: "mentee",
        message: "I'm interested in image recognition for user uploads, smart form validation, and personalized content recommendations. I want to understand how to call AI APIs from React, handle real-time responses, and manage the user experience during AI processing.",
        timestamp: Timestamp.fromDate(new Date('2025-06-11T15:10:00Z'))
      },
      {
        sender: "mentor",
        message: "Excellent choices! Let's start with API integration patterns and then move to real-time processing. We should also discuss error handling, loading states, and fallback strategies. I can help you build a small project that demonstrates these concepts. This will be a great learning experience!",
        timestamp: Timestamp.fromDate(new Date('2025-06-11T15:15:00Z'))
      }
    ],
    chatSummary: "David is a frontend developer at Facebook with 4 years of React experience. He wants to integrate AI features into web applications, specifically image recognition, smart form validation, and personalized recommendations. He needs guidance on API integration, real-time processing, and managing user experience during AI operations. Aishwarya offered to help with integration patterns and build a demonstration project. David shows strong technical skills and clear practical goals.",
    isVerifiedMatch: false,
    createdAt: Timestamp.fromDate(new Date('2025-06-11T15:00:00Z')),
    availability: {
      timeSlots: ['14:00', '15:00', '16:00', '17:00'],
      timezone: 'PST',
      preferredDays: ['Tuesday', 'Thursday']
    }
  },
  {
    mentorEmail: "aishwaryaa.udeshi@gmail.com",
    menteeEmail: "chris.gonzalez9388@gmail.com",
    mentorProfile: {
      name: "Aishwarya Udeshi",
      tagline: "Senior Software Engineer at Google | AI/ML Specialist | Mentor",
      company: "Google",
      role: "Senior Software Engineer",
      experience: "8+ years in AI/ML, Computer Vision, and Software Engineering"
    },
    menteeProfile: {
      name: "Lisa Wang",
      tagline: "DevOps Engineer at Amazon | Cloud Infrastructure Specialist",
      company: "Amazon",
      role: "DevOps Engineer",
      experience: "5 years in cloud infrastructure and automation"
    },
    chatHistory: [
      {
        sender: "mentee",
        message: "Hi Aishwarya! I'm Lisa, a DevOps engineer at Amazon. I work with cloud infrastructure and automation, but I'm interested in understanding how to deploy and scale AI/ML models in production. What are the key considerations for ML infrastructure?",
        timestamp: Timestamp.fromDate(new Date('2025-06-10T13:00:00Z'))
      },
      {
        sender: "mentor",
        message: "Hi Lisa! That's a crucial area - ML infrastructure is becoming increasingly important. What kind of models are you looking to deploy? Understanding your use case will help me explain the specific infrastructure requirements and best practices.",
        timestamp: Timestamp.fromDate(new Date('2025-06-10T13:05:00Z'))
      },
      {
        sender: "mentee",
        message: "I'm working on deploying recommendation models and natural language processing services. I need to understand model versioning, A/B testing, monitoring, and scaling strategies. I'm also interested in cost optimization for ML workloads.",
        timestamp: Timestamp.fromDate(new Date('2025-06-10T13:10:00Z'))
      },
      {
        sender: "mentor",
        message: "Perfect! Those are exactly the right areas to focus on. Let's discuss ML pipelines, model serving architectures, and monitoring strategies. We should also explore cost optimization techniques and best practices for production ML systems. This could be a great learning opportunity!",
        timestamp: Timestamp.fromDate(new Date('2025-06-10T13:15:00Z'))
      }
    ],
    chatSummary: "Lisa is a DevOps engineer at Amazon with 5 years of cloud infrastructure experience. She wants to understand ML infrastructure for deploying recommendation models and NLP services. She needs guidance on model versioning, A/B testing, monitoring, scaling, and cost optimization. Aishwarya offered to help with ML pipelines and production best practices. Lisa shows strong infrastructure knowledge and clear operational goals.",
    isVerifiedMatch: false,
    createdAt: Timestamp.fromDate(new Date('2025-06-10T13:00:00Z')),
    availability: {
      timeSlots: ['09:00', '10:00', '11:00', '12:00'],
      timezone: 'PST',
      preferredDays: ['Monday', 'Wednesday', 'Friday']
    }
  },
  {
    mentorEmail: "aishwaryaa.udeshi@gmail.com",
    menteeEmail: "chris.gonzalez9388@gmail.com",
    mentorProfile: {
      name: "Aishwarya Udeshi",
      tagline: "Senior Software Engineer at Google | AI/ML Specialist | Mentor",
      company: "Google",
      role: "Senior Software Engineer",
      experience: "8+ years in AI/ML, Computer Vision, and Software Engineering"
    },
    menteeProfile: {
      name: "Alex Thompson",
      tagline: "Research Scientist at Stanford | PhD in Computer Science",
      company: "Stanford University",
      role: "Research Scientist",
      experience: "PhD in Computer Science, 3 years post-doc experience"
    },
    chatHistory: [
      {
        sender: "mentee",
        message: "Hi Aishwarya! I'm Alex, a research scientist at Stanford. I have a PhD in computer science and I'm working on theoretical ML research. I'd love to discuss recent advances in computer vision and get your perspective on industry applications. What are the most exciting developments you're seeing?",
        timestamp: Timestamp.fromDate(new Date('2025-06-09T10:00:00Z'))
      },
      {
        sender: "mentor",
        message: "Hi Alex! That's fascinating - I'd love to hear about your research. What specific areas of computer vision are you working on? Understanding your theoretical focus will help me share relevant industry applications and challenges.",
        timestamp: Timestamp.fromDate(new Date('2025-06-09T10:05:00Z'))
      },
      {
        sender: "mentee",
        message: "I'm working on self-supervised learning and few-shot learning for computer vision. I'm particularly interested in how these techniques are being applied in industry, especially for limited data scenarios. What practical challenges are you encountering?",
        timestamp: Timestamp.fromDate(new Date('2025-06-09T10:10:00Z'))
      },
      {
        sender: "mentor",
        message: "Excellent! Self-supervised and few-shot learning are incredibly relevant for industry applications. We're facing exactly those challenges with limited labeled data. I'd love to discuss potential collaborations and how your research could address real-world problems. This could be a great partnership!",
        timestamp: Timestamp.fromDate(new Date('2025-06-09T10:15:00Z'))
      }
    ],
    chatSummary: "Alex is a research scientist at Stanford with a PhD in Computer Science and 3 years of post-doc experience. He's working on theoretical ML research in self-supervised learning and few-shot learning for computer vision. He wants to understand industry applications and practical challenges. Aishwarya expressed interest in potential collaborations and how his research could address real-world problems. Alex shows strong academic background and research expertise.",
    isVerifiedMatch: true,
    createdAt: Timestamp.fromDate(new Date('2025-06-09T10:00:00Z')),
    availability: {
      timeSlots: ['10:00', '11:00', '12:00', '13:00', '14:00'],
      timezone: 'PST',
      preferredDays: ['Monday', 'Tuesday', 'Thursday']
    }
  },
  {
    mentorEmail: "aishwaryaa.udeshi@gmail.com",
    menteeEmail: "chris.gonzalez9388@gmail.com",
    mentorProfile: {
      name: "Aishwarya Udeshi",
      tagline: "Senior Software Engineer at Google | AI/ML Specialist | Mentor",
      company: "Google",
      role: "Senior Software Engineer",
      experience: "8+ years in AI/ML, Computer Vision, and Software Engineering"
    },
    menteeProfile: {
      name: "Maria Garcia",
      tagline: "Data Analyst at Uber | SQL Expert | Business Intelligence",
      company: "Uber",
      role: "Data Analyst",
      experience: "4 years in data analysis and business intelligence"
    },
    chatHistory: [
      {
        sender: "mentee",
        message: "Hi Aishwarya! I'm Maria, a data analyst at Uber. I work with SQL and business intelligence tools, but I want to learn more about predictive analytics and machine learning. I'm interested in how to move from descriptive to predictive analytics. Any advice?",
        timestamp: Timestamp.fromDate(new Date('2025-06-08T14:00:00Z'))
      },
      {
        sender: "mentor",
        message: "Hi Maria! That's a great progression. Moving from descriptive to predictive analytics is a natural next step. What kind of data are you working with at Uber? Understanding your current data landscape will help me recommend the best approach.",
        timestamp: Timestamp.fromDate(new Date('2025-06-08T14:05:00Z'))
      },
      {
        sender: "mentee",
        message: "I work with ride data, user behavior, and operational metrics. I want to build models to predict demand, user churn, and driver availability. I'm comfortable with Python and have started learning scikit-learn, but I need guidance on model selection and evaluation.",
        timestamp: Timestamp.fromDate(new Date('2025-06-08T14:10:00Z'))
      },
      {
        sender: "mentor",
        message: "Perfect! Those are excellent use cases for predictive analytics. Let's start with demand forecasting and user churn prediction. I can help you with feature engineering, model selection, and evaluation metrics. We should also discuss how to integrate these models into your existing BI workflow.",
        timestamp: Timestamp.fromDate(new Date('2025-06-08T14:15:00Z'))
      }
    ],
    chatSummary: "Maria is a data analyst at Uber with 4 years of experience in SQL and business intelligence. She wants to transition from descriptive to predictive analytics, specifically for demand forecasting, user churn prediction, and driver availability. She's comfortable with Python and has started learning scikit-learn. Aishwarya offered to help with feature engineering, model selection, and integrating ML models into BI workflows. Maria shows strong analytical skills and clear business understanding.",
    isVerifiedMatch: false,
    createdAt: Timestamp.fromDate(new Date('2025-06-08T14:00:00Z')),
    availability: {
      timeSlots: ['11:00', '12:00', '13:00', '14:00', '15:00'],
      timezone: 'PST',
      preferredDays: ['Tuesday', 'Wednesday', 'Thursday']
    }
  },
  {
    mentorEmail: "aishwaryaa.udeshi@gmail.com",
    menteeEmail: "chris.gonzalez9388@gmail.com",
    mentorProfile: {
      name: "Aishwarya Udeshi",
      tagline: "Senior Software Engineer at Google | AI/ML Specialist | Mentor",
      company: "Google",
      role: "Senior Software Engineer",
      experience: "8+ years in AI/ML, Computer Vision, and Software Engineering"
    },
    menteeProfile: {
      name: "James Wilson",
      tagline: "Security Engineer at Cisco | Cybersecurity Expert | ML Enthusiast",
      company: "Cisco",
      role: "Security Engineer",
      experience: "6 years in cybersecurity and network security"
    },
    chatHistory: [
      {
        sender: "mentee",
        message: "Hi Aishwarya! I'm James, a security engineer at Cisco. I'm interested in how AI/ML can be applied to cybersecurity - threat detection, anomaly detection, and automated response systems. What are the most promising applications you've seen?",
        timestamp: Timestamp.fromDate(new Date('2025-06-07T16:00:00Z'))
      },
      {
        sender: "mentor",
        message: "Hi James! AI in cybersecurity is a fascinating and critical area. What specific security challenges are you facing at Cisco? Understanding your current threats and infrastructure will help me recommend the most relevant AI applications.",
        timestamp: Timestamp.fromDate(new Date('2025-06-07T16:05:00Z'))
      },
      {
        sender: "mentee",
        message: "We're dealing with network intrusion detection, malware analysis, and user behavior analytics. I want to understand how to build ML models for these use cases, handle adversarial attacks, and ensure the security of the ML systems themselves.",
        timestamp: Timestamp.fromDate(new Date('2025-06-07T16:10:00Z'))
      },
      {
        sender: "mentor",
        message: "Excellent! Those are all critical areas. Let's discuss anomaly detection algorithms, adversarial ML, and secure ML pipelines. We should also explore how to handle the unique challenges of security data - high-dimensional, imbalanced, and constantly evolving. This could be a great collaboration!",
        timestamp: Timestamp.fromDate(new Date('2025-06-07T16:15:00Z'))
      }
    ],
    chatSummary: "James is a security engineer at Cisco with 6 years of cybersecurity experience. He wants to apply AI/ML to network intrusion detection, malware analysis, and user behavior analytics. He needs guidance on building ML models for security use cases, handling adversarial attacks, and ensuring ML system security. Aishwarya offered to help with anomaly detection algorithms and secure ML pipelines. James shows strong security expertise and clear technical goals.",
    isVerifiedMatch: true,
    createdAt: Timestamp.fromDate(new Date('2025-06-07T16:00:00Z')),
    availability: {
      timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00'],
      timezone: 'PST',
      preferredDays: ['Monday', 'Wednesday', 'Friday']
    }
  },
  {
    mentorEmail: "aishwaryaa.udeshi@gmail.com",
    menteeEmail: "chris.gonzalez9388@gmail.com",
    mentorProfile: {
      name: "Aishwarya Udeshi",
      tagline: "Senior Software Engineer at Google | AI/ML Specialist | Mentor",
      company: "Google",
      role: "Senior Software Engineer",
      experience: "8+ years in AI/ML, Computer Vision, and Software Engineering"
    },
    menteeProfile: {
      name: "Rachel Brown",
      tagline: "Product Designer at Airbnb | User Experience Specialist",
      company: "Airbnb",
      role: "Product Designer",
      experience: "5 years in product design and user experience"
    },
    chatHistory: [
      {
        sender: "mentee",
        message: "Hi Aishwarya! I'm Rachel, a product designer at Airbnb. I'm interested in how AI can enhance user experiences and create more personalized interactions. I want to understand the possibilities and limitations of AI in design. Can you help me explore this?",
        timestamp: Timestamp.fromDate(new Date('2025-06-06T12:00:00Z'))
      },
      {
        sender: "mentor",
        message: "Hi Rachel! That's a great area to explore. AI is indeed transforming product design. What specific user experiences are you working on at Airbnb? Understanding your current projects will help me explain the relevant AI capabilities and design considerations.",
        timestamp: Timestamp.fromDate(new Date('2025-06-06T12:05:00Z'))
      },
      {
        sender: "mentee",
        message: "I'm working on personalized recommendations, smart search, and dynamic pricing interfaces. I want to understand how to design for AI-powered features, handle uncertainty, and create transparent user experiences. I'm also interested in ethical design for AI.",
        timestamp: Timestamp.fromDate(new Date('2025-06-06T12:10:00Z'))
      },
      {
        sender: "mentor",
        message: "Perfect! Those are all excellent applications. Let's discuss how to design for AI uncertainty, create explainable interfaces, and build trust with users. We should also explore ethical considerations and bias mitigation in design. This could be a great learning opportunity for both of us!",
        timestamp: Timestamp.fromDate(new Date('2025-06-06T12:15:00Z'))
      }
    ],
    chatSummary: "Rachel is a product designer at Airbnb with 5 years of experience in user experience design. She wants to understand how AI can enhance user experiences through personalized recommendations, smart search, and dynamic pricing interfaces. She needs guidance on designing for AI uncertainty, creating transparent experiences, and ethical AI design. Aishwarya offered to help with explainable interfaces and bias mitigation strategies. Rachel shows strong design thinking and user-centered approach.",
    isVerifiedMatch: false,
    createdAt: Timestamp.fromDate(new Date('2025-06-06T12:00:00Z')),
    availability: {
      timeSlots: ['10:00', '11:00', '12:00', '13:00'],
      timezone: 'PST',
      preferredDays: ['Tuesday', 'Thursday', 'Friday']
    }
  }
];

async function populateDatabase() {
  try {
    console.log('Starting database population...');
    
    for (const interaction of interactions) {
      const docRef = await db.collection('interactions').add(interaction);
      console.log(`Added interaction with ID: ${docRef.id}`);
    }
    
    console.log('Database population completed successfully!');
  } catch (error) {
    console.error('Error populating database:', error);
  }
}

// Run the population script
populateDatabase(); 