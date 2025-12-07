import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Logo, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Chames",
  lastName: "Dhibi",
  name: "Chames Dhibi",
  role: "Full-Stack Developer",
  avatar: "/images/avatar.webp",
  email: "dhibichams@gmail.com",
  timeZone: "Africa/Tunisia",
  locationName: "Gafsa, Tunisia",
  languages: ["English", "French", "Arabic"], // TOEFL iBT: 84/120
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>Get updates about my latest projects and tech insights</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /resources/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Chams99",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/dhibi-chams-827146344/",
  },
  {
    name: "X",
    icon: "x",
    link: "https://x.com/ChamesDhibi",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Crafting exceptional digital experiences with modern technologies</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">15+ Projects Built</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          React • Next.js • Flutter
        </Text>
      </Row>
    ),
    href: "/work",
  },
  subline: (
    <>
      I'm Chames, a Full-Stack Developer from Tunisia who turns complex problems into elegant
      digital solutions.
      <br /> Specializing in React, Next.js, Node.js, and Flutter - I build web and mobile
      applications that are both powerful and elegant.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.locationName}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "/contact",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Chames is a Tunisian Full-Stack Developer with a passion for transforming complex problems
        into elegant digital solutions. From concept to deployment, he builds applications that
        deliver real value and exceptional user experiences. Currently pursuing a B.S. in Computer
        Science at the Faculty of Science in Gafsa, he has built 15+ production-ready web and mobile
        applications using React, Next.js, Node.js, and Flutter. He believes great software comes
        from clean code, thoughtful design, and user-centric thinking.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Go My Code",
        timeframe: "2022",
        role: "Full Stack Python Developer",
        achievements: [
          "Developed full-stack web applications using Python, Django, and modern JavaScript frameworks.",
          "Built scalable backend systems and RESTful APIs serving thousands of users.",
          "Collaborated with cross-functional teams to deliver high-quality software solutions.",
        ],
        images: [],
      },
      {
        company: "Freelance Developer",
        timeframe: "2022 - Present",
        role: "Full-Stack Developer",
        achievements: [
          "Built 15+ production-ready web and mobile applications using React, Next.js, and Flutter.",
          "Specialized in creating responsive, performant applications with modern UI/UX design.",
          "Delivered end-to-end solutions including e-commerce platforms, landing pages, and interactive web apps.",
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Education",
    institutions: [
      {
        name: "Faculty of Science Gafsa",
        description: (
          <>
            B.S. in Computer Science with focus on full-stack development and modern web
            technologies.
          </>
        ),
      },
      {
        name: "Lycée Houssen Bouzayen",
        description: <>Baccalaureate in Mathematics - 2023</>,
      },
      {
        name: "TOEFL iBT",
        description: <>Score: 84/120 - January 2025</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Frontend Development",
        description: (
          <>
            Building modern, responsive web applications with React, Next.js, and TypeScript. Expert
            in Tailwind CSS, HTML5, and CSS3 for stunning UI designs with excellent performance.
          </>
        ),
        tags: [
          {
            name: "React",
            icon: "react",
          },
          {
            name: "Next.js",
            icon: "nextjs",
          },
          {
            name: "TypeScript",
            icon: "typescript",
          },
          {
            name: "JavaScript",
            icon: "javascript",
          },
        ],
        images: [],
      },
      {
        title: "Backend Development",
        description: (
          <>
            Creating scalable server-side applications with Node.js, Express.js, PHP, and Laravel.
            Proficient in Python, C#, .NET, and building RESTful APIs with comprehensive database
            management.
          </>
        ),
        tags: [
          {
            name: "Node.js",
            icon: "nodejs",
          },
          {
            name: "Python",
            icon: "python",
          },
        ],
        images: [],
      },
      {
        title: "Mobile Development",
        description: (
          <>
            Developing cross-platform mobile applications with Flutter and Dart for iOS and Android.
            Creating responsive, performant mobile experiences with native-like feel.
          </>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Databases & Cloud",
        description: (
          <>
            Working with MySQL, PostgreSQL, MongoDB, and Firebase for data storage and cloud
            services. Experience with database design, optimization, and cloud deployment.
          </>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Tools & Technologies",
        description: (
          <>
            Proficient with Git for version control, VS Code for development, and Figma for design.
            Experience with modern development workflows and CI/CD pipelines.
          </>
        ),
        tags: [],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
