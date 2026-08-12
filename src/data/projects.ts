export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  role: string;
  year: string;
  description: string;
  image: string;
  technologies: string[];
  tags: string[];
  cartridgeColor: string;
  gallery?: string[];
  videoUrl?: string;
  videoAspectRatio?: "portrait" | "landscape";
  videos?: string[];
}

export const projectsData: ProjectItem[] = [
  {
    id: "siva-academy-posters",
    title: "Posters",
    category: "Social & Marketing",
    role: "Graphic Designer",
    year: "2024 - 2025",
    description: "A collection of vibrant promotional, festival, and holiday posters designed for Siva Academy, including seasonal offer flyers and national holiday creatives.",
    image: "/assets/projects/siva-dasara.jpg",
    technologies: ["Photoshop", "Illustrator"],
    tags: ["Posters", "Flyer Design", "Branding Creatives"],
    cartridgeColor: "bg-[#FFDE47]",
    gallery: [
      "/assets/projects/siva-dasara.jpg",
      "/assets/projects/siva-christmas.jpg",
      "/assets/projects/siva-pooja.jpg",
      "/assets/projects/siva-gandhi.jpg",
      "/assets/projects/siva-valmiki.jpg",
      "/assets/projects/siva-deepavali.jpg",
      "/assets/projects/siva-eid-sale.jpg",
      "/assets/projects/siva-eid-mubarak.jpg"
    ]
  },
  {
    id: "vanguard-film",
    title: "Video Edits",
    category: "Video & Motion",
    role: "Video Editor",
    year: "2024",
    description: "A series of high-impact promotional video shorts edited for Siva Academy, showcasing courses and seasonal sales using dynamic transitions and beat syncing.",
    image: "/assets/projects/video.jpg",
    technologies: ["Premiere Pro", "After Effects"],
    tags: ["Video Editing", "Promo Sequence", "Sound Design"],
    cartridgeColor: "bg-[#FF5964]",
    videoUrl: "https://www.youtube.com/embed/g15r6axzdbg",
    videoAspectRatio: "portrait",
    videos: [
      "https://www.youtube.com/embed/g15r6axzdbg",
      "https://www.youtube.com/embed/AyeqBjiWTR0",
      "https://www.youtube.com/embed/7vE-HvKTaFU",
      "https://www.youtube.com/embed/UmsAznZbbw8",
      "https://www.youtube.com/embed/DlxjamNCxsc",
      "https://www.youtube.com/embed/DDCtLS0y0vo",
      "https://www.youtube.com/embed/3keJ6ud7O78",
      "https://www.youtube.com/embed/WV2ldvUyBEw",
      "https://www.youtube.com/embed/D7Ni6Agt51Y"
    ],
    gallery: ["/assets/projects/video.jpg"]
  },
  {
    id: "illustrations",
    title: "Illustrations",
    category: "Social & Marketing",
    role: "Vector Illustrator",
    year: "2024 - 2025",
    description: "A collection of vibrant vector art, cartoon character layouts, scenic landscape illustrations, and minimalist geometric flat designs.",
    image: "/assets/projects/ill-desert.png",
    technologies: ["Illustrator", "Photoshop"],
    tags: ["Vector Art", "Character Design", "Flat Illustration"],
    cartridgeColor: "bg-[#3A86C8]",
    gallery: [
      "/assets/projects/ill-desert.png",
      "/assets/projects/ill-car.png",
      "/assets/projects/ill-monk.png",
      "/assets/projects/ill-rain.png",
      "/assets/projects/ill-abstract.png",
      "/assets/projects/ill-mountain.png",
      "/assets/projects/ill-girl.png",
      "/assets/projects/ill-moon.png",
      "/assets/projects/ill-shelf.png"
    ]
  }
];
