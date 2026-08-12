export interface TimelineItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
}

export const experienceItems: TimelineItem[] = [
  {
    id: "digital-clouds-iot",
    role: "Graphic Designer & Video Editor",
    company: "Digital Clouds IoT Pvt Ltd",
    duration: "Jan 2026 - Jun 2026",
    location: "Bangalore, India",
    description: [
      "Designed social media creatives and branding visuals for digital campaigns.",
      "Created healthcare marketing creatives for Northwest Hospital.",
      "Edited promotional videos and collaborated with marketing and SEO teams.",
    ],
  },
  {
    id: "siva-academy-job",
    role: "Visual Content Creator & Trainer",
    company: "Siva Academy",
    duration: "Nov 2024 - Oct 2025",
    location: "Bangalore, India",
    description: [
      "Designed marketing creatives and social media creatives.",
      "Trained students in video editing and content creation.",
    ],
  },
  {
    id: "arts-film-academy-job",
    role: "Graphic Designer & Video Editor",
    company: "Arts Film Academy",
    duration: "Oct 2022 - Nov 2024",
    location: "Bangalore, India",
    description: [
      "Produced graphics for educational and promotional campaigns.",
      "Edited short films and promotional videos.",
      "Served as Visiting Faculty conducting design workshops.",
    ],
  },
];
