// Mock API for development - simulates backend responses
import { User, AuthResponse, FullAnalysisResponse, InterviewItem, UserInterviewsResponse } from './types'

// Simulated delay to mimic network requests
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms))

// Mock user database
const mockUsers = new Map<string, { user: User; password: string; token: string }>()

// Pre-populate with demo user
mockUsers.set('demo@example.com', {
  user: { id: 1, name: 'Demo User', email: 'demo@example.com' },
  password: 'demo123',
  token: 'mock-token-demo-user',
})

// Mock interview data
const mockInterviews: InterviewItem[] = [
  {
    id: 1,
    job_title: 'Senior Frontend Developer',
    interview_score: 8.5,
    conclusion: 'Strong technical skills and good communication. Shows great understanding of React ecosystem.',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    job_title: 'Full Stack Engineer',
    interview_score: 7.2,
    conclusion: 'Good backend knowledge. Could improve on system design concepts.',
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    job_title: 'Software Development Manager',
    interview_score: 6.8,
    conclusion: 'Demonstrated leadership experience. Needs more practice with behavioral questions.',
    created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    job_title: 'DevOps Engineer',
    interview_score: 9.1,
    conclusion: 'Excellent knowledge of CI/CD pipelines and cloud infrastructure. Very confident responses.',
    created_at: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 5,
    job_title: 'React Developer',
    interview_score: 7.8,
    conclusion: 'Strong component architecture understanding. Good attention to performance optimization.',
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

// Mock CV Analysis Response
const mockCVAnalysis = {
  summary: 'Your CV has been successfully analyzed. We found strong technical skills and relevant experience.',
  status: 'success' as const,
  structured_cv: {
    name: 'John Doe',
    title: 'Senior Software Engineer',
    summary: 'Experienced software engineer with 5+ years in full-stack development, specializing in React and Node.js.',
    skills: [
      'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 
      'Docker', 'AWS', 'MongoDB', 'PostgreSQL', 'Git'
    ],
    experience: [
      {
        role: 'Senior Software Engineer',
        company: 'Tech Solutions Inc.',
        start_date: '2020',
        end_date: 'Present',
        responsibilities: [
          'Led development of microservices architecture serving 1M+ users',
          'Mentored junior developers and conducted code reviews',
          'Improved application performance by 40% through optimization',
        ],
      },
      {
        role: 'Software Engineer',
        company: 'StartUp Co.',
        start_date: '2018',
        end_date: '2020',
        responsibilities: [
          'Built responsive web applications using React and Redux',
          'Implemented RESTful APIs with Node.js and Express',
          'Collaborated with design team on UX improvements',
        ],
      },
    ],
    education: [
      {
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of Technology',
        start: '2014',
        end: '2018',
      },
    ],
    projects: [
      {
        name: 'E-commerce Platform',
        description: 'Full-stack e-commerce solution with payment integration',
        technologies: ['React', 'Node.js', 'Stripe', 'MongoDB'],
      },
    ],
  },
  gemini_analysis: {
    ats_score: 85,
    overall_score: 82,
    suggestions: [
      {
        targetField: 'summary',
        improvedValue: 'Results-driven Senior Software Engineer with 5+ years of experience building scalable web applications. Proven track record of leading teams and delivering high-quality solutions using React, Node.js, and cloud technologies.',
        text: 'Make your summary more results-oriented and include specific technologies',
      },
      {
        targetField: 'experience.responsibilities',
        improvedValue: 'Architected and implemented microservices infrastructure serving 1M+ daily active users, reducing response time by 40% and improving system reliability to 99.9% uptime',
        text: 'Quantify achievements with specific metrics and impact',
      },
      {
        targetField: 'skills',
        improvedValue: 'Add trending skills: Kubernetes, GraphQL, Next.js, CI/CD',
        text: 'Include modern frameworks and DevOps tools to improve ATS matching',
      },
    ],
  },
}

// Mock Skills Gap Analysis Response
const mockSkillsGapAnalysis: FullAnalysisResponse = {
  job_skill_profile: [
    { skill: 'React', proficiency_you: 90, proficiency_req: 85, gap: -5, is_must_have: true },
    { skill: 'TypeScript', proficiency_you: 85, proficiency_req: 80, gap: -5, is_must_have: true },
    { skill: 'Node.js', proficiency_you: 80, proficiency_req: 75, gap: -5, is_must_have: true },
    { skill: 'Python', proficiency_you: 70, proficiency_req: 70, gap: 0, is_must_have: false },
    { skill: 'Kubernetes', proficiency_you: 40, proficiency_req: 70, gap: 30, is_must_have: true },
    { skill: 'GraphQL', proficiency_you: 50, proficiency_req: 75, gap: 25, is_must_have: false },
    { skill: 'System Design', proficiency_you: 60, proficiency_req: 85, gap: 25, is_must_have: true },
    { skill: 'AWS', proficiency_you: 75, proficiency_req: 80, gap: 5, is_must_have: true },
  ],
  ai_summary: 'You have a strong foundation in frontend development with React and TypeScript. Your main gaps are in Kubernetes orchestration and advanced system design. Focus on cloud-native architecture and container orchestration to meet the job requirements.',
  ai_scores: {
    coverage: 75,
    depth: 68,
    alignment: 72,
  },
  quantitative_summary: {
    overall_score: 72,
    skills_matched: 5,
    skills_missing: 3,
    total_required: 8,
  },
  priority_actions: [
    {
      action: 'Complete Kubernetes certification course',
      time_estimate: '2-3 weeks',
      why: 'Kubernetes is a must-have skill for this role. Getting certified will demonstrate practical knowledge.',
    },
    {
      action: 'Build a microservices project with GraphQL',
      time_estimate: '1-2 weeks',
      why: 'Hands-on experience will strengthen both GraphQL and system design skills.',
    },
    {
      action: 'Study system design patterns and practice mock interviews',
      time_estimate: '2-4 weeks',
      why: 'System design is critical for senior roles. Practice will improve your architectural thinking.',
    },
  ],
  learning_paths: [
    {
      skill: 'Kubernetes',
      path_title: 'Kubernetes for Developers',
      platform: 'Udemy / Coursera',
    },
    {
      skill: 'GraphQL',
      path_title: 'GraphQL with React & Node.js',
      platform: 'freeCodeCamp',
    },
    {
      skill: 'System Design',
      path_title: 'System Design Interview Course',
      platform: 'Educative.io',
    },
  ],
  resume_edits: [
    {
      before: 'Worked on microservices',
      after: 'Designed and implemented 12+ microservices handling 10M requests/day using Docker and Kubernetes',
      reason: 'Quantify your impact and mention relevant technologies',
    },
    {
      before: 'Experience with APIs',
      after: 'Built scalable GraphQL and REST APIs serving 500K+ active users with 99.9% uptime',
      reason: 'Add specific metrics and technologies to demonstrate expertise',
    },
  ],
}

// Mock API implementation
export const mockAPI = {
  // Authentication endpoints
  auth: {
    async login(email: string, password: string): Promise<AuthResponse> {
      await delay()
      
      const userData = mockUsers.get(email)
      if (!userData || userData.password !== password) {
        throw new Error('Invalid email or password')
      }

      return {
        user: userData.user,
        token: userData.token,
        refreshToken: `refresh-${userData.token}`,
      }
    },

    async register(name: string, email: string, password: string): Promise<{ message: string }> {
      await delay()
      
      if (mockUsers.has(email)) {
        throw new Error('Email already registered')
      }

      const newUser: User = {
        id: mockUsers.size + 1,
        name,
        email,
      }

      mockUsers.set(email, {
        user: newUser,
        password,
        token: `mock-token-${Date.now()}`,
      })

      return {
        message: 'Registration successful! You can now log in.',
      }
    },

    async me(token: string): Promise<{ user: User }> {
      await delay()
      
      // Find user by token
      for (const [, userData] of mockUsers) {
        if (userData.token === token) {
          return { user: userData.user }
        }
      }
      
      throw new Error('Invalid token')
    },

    async verifyEmail(token: string): Promise<{ message: string }> {
      await delay()
      return { message: 'Email verified successfully!' }
    },
  },

  // Interview endpoints
  interviews: {
    async getByEmail(email: string): Promise<UserInterviewsResponse> {
      await delay()
      
      const userData = Array.from(mockUsers.values()).find(u => u.user.email === email)
      if (!userData) {
        throw new Error('User not found')
      }

      return {
        success: true,
        user_id: userData.user.id,
        user_name: userData.user.name,
        user_email: userData.user.email,
        total_interviews: mockInterviews.length,
        interviews: mockInterviews,
      }
    },

    async startSession(data: any): Promise<{ token: string; url: string }> {
      await delay()
      
      // Return mock LiveKit connection data
      return {
        token: 'mock-livekit-token',
        url: 'wss://mock-livekit-server',
      }
    },
  },

  // CV Analysis endpoints
  cv: {
    async analyzeStructured(formData: FormData): Promise<typeof mockCVAnalysis> {
      await delay(1500) // Longer delay to simulate processing
      
      return mockCVAnalysis
    },

    async applySuggestion(data: { structured_cv: any; suggestion: any }): Promise<any> {
      await delay()
      
      // Simulate applying a suggestion
      return {
        status: 'success',
        updated_cv: data.structured_cv,
      }
    },
  },

  // Skills Gap Analysis endpoints
  skillsGap: {
    async analyze(formData: FormData): Promise<FullAnalysisResponse> {
      await delay(2000) // Longer delay to simulate AI processing
      
      return mockSkillsGapAnalysis
    },
  },
}

// Helper to check if we should use mock API
export const useMockAPI = () => {
  // Always use mock API in this configuration
  return true
}
