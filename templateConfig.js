export const templateConfigs = {
  modernProfessional: {
    id: 'modernProfessional',
    name: 'Modern Professional',
    description: 'For: Corporate jobs, fresher to mid-level professionals',
    focus: 'Clean design + essential job info',
    category: 'Professional',
    preview: '🎨',
    color: '#667eea',
    features: ['Clean Layout', 'Professional Typography', 'Modern Icons'],
    fields: {
      fullName: { required: true, label: 'Full Name', type: 'text' },
      professionalTitle: { required: true, label: 'Professional Title', type: 'text' },
      phoneNumber: { required: true, label: 'Phone Number', type: 'text' },
      address: { required: true, label: 'Address', type: 'textarea' },
      dateOfBirth: { required: true, label: 'Date of Birth', type: 'text' },
      linkedinUrl: { required: false, label: 'LinkedIn URL', type: 'text' },
      githubUrl: { required: false, label: 'GitHub URL', type: 'text' },
      profileSummary: { required: true, label: 'Profile Summary', type: 'textarea' },
      keySkills: { required: true, label: 'Key Skills (6–10)', type: 'textarea' },
      workExperience: { required: true, label: 'Work Experience (Title, Company, Duration, Description)', type: 'textarea' },
      education: { required: true, label: 'Education (Degree, Institution, Year)', type: 'textarea' },
      certifications: { required: false, label: 'Certifications (Optional)', type: 'textarea' },
      languages: { required: false, label: 'Languages (Optional)', type: 'textarea' }
    }
  },
  
  creativePortfolio: {
    id: 'creativePortfolio',
    name: 'Creative Portfolio',
    description: 'For: Designers, Artists, UI/UX, Creative roles',
    focus: 'Projects, style, and personal branding',
    category: 'Creative',
    preview: '🎭',
    color: '#f093fb',
    features: ['Bold Colors', 'Creative Layout', 'Portfolio Focus'],
    fields: {
      fullName: { required: true, label: 'Full Name', type: 'text' },
      creativeTitle: { required: true, label: 'Creative Title (e.g., UI/UX Designer)', type: 'text' },
      phoneNumber: { required: true, label: 'Phone Number', type: 'text' },
      address: { required: true, label: 'Address', type: 'textarea' },
      dateOfBirth: { required: true, label: 'Date of Birth', type: 'text' },
      linkedinUrl: { required: false, label: 'LinkedIn URL', type: 'text' },
      githubUrl: { required: false, label: 'GitHub URL', type: 'text' },
      portfolioUrl: { required: true, label: 'Portfolio URL / Behance / Dribbble', type: 'text' },
      personalBio: { required: true, label: 'Personal Bio / Creative Summary', type: 'textarea' },
      toolsSkills: { required: true, label: 'Tools & Skills (e.g., Figma, Photoshop, Illustration)', type: 'textarea' },
      topProjects: { required: true, label: 'Top Projects (Title, Role, Description, Links, Tools Used)', type: 'textarea' },
      awardsExhibitions: { required: false, label: 'Awards / Exhibitions (Optional)', type: 'textarea' },
      education: { required: true, label: 'Education', type: 'textarea' },
      socialMedia: { required: false, label: 'Social Media Handles (Instagram, LinkedIn etc.)', type: 'textarea' },
      hobbiesPassions: { required: false, label: 'Hobbies/Passions (Optional – for personality)', type: 'textarea' }
    }
  },
  
  minimalist: {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'For: General use, clean aesthetic, quick scan resumes',
    focus: 'Simple, to-the-point resume',
    category: 'Minimal',
    preview: '⚪',
    color: '#4facfe',
    features: ['Clean Lines', 'Minimal Colors', 'Focus on Content'],
    fields: {
      name: { required: true, label: 'Name', type: 'text' },
      title: { required: true, label: 'Title', type: 'text' },
      phoneNumber: { required: true, label: 'Phone Number', type: 'text' },
      address: { required: true, label: 'Address', type: 'textarea' },
      dateOfBirth: { required: true, label: 'Date of Birth', type: 'text' },
      linkedinUrl: { required: false, label: 'LinkedIn URL', type: 'text' },
      githubUrl: { required: false, label: 'GitHub URL', type: 'text' },
      summary: { required: true, label: 'One-line Summary', type: 'text' },
      skillsList: { required: true, label: 'Skills List', type: 'textarea' },
      workExperience: { required: true, label: 'Work Experience (basic, short)', type: 'textarea' },
      education: { required: true, label: 'Education', type: 'textarea' },
      projectsCertifications: { required: false, label: 'Projects or Certifications (only if relevant)', type: 'textarea' }
    }
  },
  
  executive: {
    id: 'executive',
    name: 'Executive',
    description: 'For: Senior-level, management, leadership roles',
    focus: 'Achievements, leadership, strategy',
    category: 'Executive',
    preview: '👔',
    color: '#43e97b',
    features: ['Executive Style', 'Premium Layout', 'Leadership Focus'],
    fields: {
      fullName: { required: true, label: 'Full Name', type: 'text' },
      designation: { required: true, label: 'Designation (e.g., Operations Director)', type: 'text' },
      phoneNumber: { required: true, label: 'Phone Number', type: 'text' },
      address: { required: true, label: 'Address', type: 'textarea' },
      dateOfBirth: { required: true, label: 'Date of Birth', type: 'text' },
      linkedinUrl: { required: false, label: 'LinkedIn URL', type: 'text' },
      githubUrl: { required: false, label: 'GitHub URL', type: 'text' },
      executiveSummary: { required: true, label: 'Executive Summary (Strategic, impactful)', type: 'textarea' },
      keyAchievements: { required: true, label: 'Key Achievements (Impact Metrics – revenue growth, team size, etc.)', type: 'textarea' },
      experience: { required: true, label: 'Experience (Focus on leadership, outcomes, big projects)', type: 'textarea' },
      education: { required: true, label: 'Education (Degrees, MBAs, etc.)', type: 'textarea' },
      certifications: { required: false, label: 'Certifications (Leadership, Strategy, Finance etc.)', type: 'textarea' },
      languages: { required: false, label: 'Languages', type: 'textarea' },
      boardsCommittees: { required: false, label: 'Boards / Committees / Publications (Optional)', type: 'textarea' }
    }
  },
  
  techSavvy: {
    id: 'techSavvy',
    name: 'Tech Savvy',
    description: 'For: Developers, engineers, tech professionals',
    focus: 'Skills, projects, and technologies',
    category: 'Technology',
    preview: '💻',
    color: '#fa709a',
    features: ['Tech Icons', 'Code-friendly', 'Modern Design'],
    fields: {
      fullName: { required: true, label: 'Full Name', type: 'text' },
      role: { required: true, label: 'Role (e.g., Full Stack Developer)', type: 'text' },
      phoneNumber: { required: true, label: 'Phone Number', type: 'text' },
      address: { required: true, label: 'Address', type: 'textarea' },
      dateOfBirth: { required: true, label: 'Date of Birth', type: 'text' },
      linkedinUrl: { required: false, label: 'LinkedIn URL', type: 'text' },
      githubUrl: { required: false, label: 'GitHub URL', type: 'text' },
      techStack: { required: true, label: 'Tech Stack (Languages, Frameworks, Tools)', type: 'textarea' },
      summary: { required: true, label: 'Summary (Tech-oriented)', type: 'textarea' },
      projects: { required: true, label: 'Projects (Title, Tech used, Description, GitHub links)', type: 'textarea' },
      workExperience: { required: true, label: 'Work Experience (highlight tech usage)', type: 'textarea' },
      education: { required: true, label: 'Education', type: 'textarea' },
      certifications: { required: false, label: 'Certifications (AWS, Azure, etc.)', type: 'textarea' },
      openSourceContributions: { required: false, label: 'Open Source Contributions (Optional)', type: 'textarea' },
      portfolioUrls: { required: false, label: 'LinkedIn / GitHub / Portfolio URLs', type: 'textarea' }
    }
  },
  
  academic: {
    id: 'academic',
    name: 'Academic',
    description: 'For: Research, PhD, academic, postdoc roles',
    focus: 'Publications, research, education',
    category: 'Academic',
    preview: '🎓',
    color: '#a8edea',
    features: ['Academic Style', 'Research Focus', 'Traditional Layout'],
    fields: {
      fullName: { required: true, label: 'Full Name', type: 'text' },
      academicTitle: { required: true, label: 'Academic Title (e.g., Research Scholar)', type: 'text' },
      phoneNumber: { required: true, label: 'Phone Number', type: 'text' },
      address: { required: true, label: 'Address', type: 'textarea' },
      dateOfBirth: { required: true, label: 'Date of Birth', type: 'text' },
      linkedinUrl: { required: false, label: 'LinkedIn URL', type: 'text' },
      githubUrl: { required: false, label: 'GitHub URL', type: 'text' },
      researchSummary: { required: true, label: 'Research Summary / Objective', type: 'textarea' },
      education: { required: true, label: 'Education (detailed: Thesis title, Supervisor, GPA)', type: 'textarea' },
      publications: { required: true, label: 'Publications (APA/MLA format)', type: 'textarea' },
      researchProjects: { required: true, label: 'Research Projects (with description)', type: 'textarea' },
      teachingExperience: { required: false, label: 'Teaching Experience (if any)', type: 'textarea' },
      conferencesAttended: { required: false, label: 'Conferences Attended / Presented', type: 'textarea' },
      certificationsAchievements: { required: false, label: 'Certifications / Academic Achievements', type: 'textarea' },
      skills: { required: false, label: 'Skills (SPSS, LaTeX, etc.)', type: 'textarea' },
      languages: { required: false, label: 'Languages', type: 'textarea' }
    }
  }
};

export const getTemplateConfig = (templateId) => {
  return templateConfigs[templateId] || templateConfigs.modernProfessional;
};

export const getAllTemplates = () => {
  return Object.values(templateConfigs);
}; 