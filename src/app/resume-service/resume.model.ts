export interface Resume {
    intro: Intro;
    work_experience: WorkExperience[];
    education: Education[];
    contacts: Contacts;
}

export interface Intro {
    full_name?: string;
    profession?: string;
    languages?: string;
    summary: string;
    photos_intro?: string;
    photos?: string[];
}

export interface WorkExperience {
    job_title: string;
    company: string;
    company_description?: string;
    role?: string | null;
    location?: string;
    start_date: string;
    end_date?: string | null;
    responsibilities?: string[];
    tech_stack?: string[];
}

export interface Education {
    degree: string;
    institution: string;
    location?: string;
    graduation_year: number;
    thesis?: string;
    publications?: string[] | null;
}

export interface Contacts {
    email: string;
    phone: string;
    linkedin?: string;
    github?: string;
}

