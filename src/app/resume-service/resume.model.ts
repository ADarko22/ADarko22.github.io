export interface Language {
    name: string;
    proficiency: "Native" | "Full Professional" | "Professional Working" | "Limited Working" | "Elementary";
  }
  
  export interface Intro {
    full_name?: string;
    profession?: string;
    languages?: Language[];
    summary: string;
    photos_intro?: string;
    photos?: string[];
  }
  
  export interface WorkExperience {
    job_title: string;
    company: string;
    company_description?: string;
    role?: string | null;
    location: string;
    start_date: string;
    end_date?: string | null;
    responsibilities?: string[];
    tech_stack: string[];
  }
  
  export interface Publication {
    title: string,
    link: string
  }

  export interface Education {
    degree: string;
    institution: string;
    location?: string;
    graduation_year: number;
    thesis?: string;
    publications?: Publication[] | null;
  }
  
  export interface Achievement {
    title: string;
    description?: string | null;
    images?: string[] | null;
    links?: string[] | null;
  }
  
  export interface AchievementCategory {
    category: string;
    achievements: Achievement[];
  }
  
  export interface Contacts {
    email: string;
    phone: string;
    linkedin?: string;
    github?: string;
  }
  
  export interface Resume {
    intro: Intro;
    work_experience: WorkExperience[];
    education: Education[];
    hall_of_fame?: AchievementCategory[];
    contacts: Contacts;
  }