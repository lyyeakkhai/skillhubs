interface SkillRecord {
    id: string;
    title: string; // custome agent
    slug: string; // custome-agent
    description: string;
    category: string;
    tags: string[];
    installCommand: string;
    createdAt: string | null;
    authorClerkId: string | null;
    authorEmail: string | null;
}
