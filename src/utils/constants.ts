import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

const fullTwConfig = resolveConfig(tailwindConfig);

const EMAIL = "hello@looskie.com";
const GITHUB = "https://github.com/looskie";
const TWITTER = "https://twitter.com/devlooskie";
const LINKEDIN = "https://linkedin.com/in/devlooskie/";
const INSTAGRAM = "https://instagram.com/devlooskie";

const DISCORD_ID = "207204046115831809";

type Work = {
  company: string;
  subtitle?: string;
  position: string;
  link?: string;
  description: string;
  dates?: string;
};

const WORK: Work[] = [
  {
    company: "c/side",
    position: "Fullstack Engineer",
    link: "https://cside.com/",
    description:
      "Client-side security platform that helps you monitor and secure your web applications.",
    dates: "Jan 2024 - Feb 2026",
  },
  {
    company: "Bloom",
    position: "Fullstack & Android Engineer",
    link: "https://bloomapp.com",
    description:
      "Bloom is an app that helps you learn to invest for building wealth long-term.",
    dates: "Jan 2024 - Apr 2024",
  },
  {
    company: "Hop, Inc.",
    subtitle: "Formerly Giggl",
    position: "Design & Fullstack Engineer",
    link: "https://hop.io",
    description:
      "Hop is a cloud provider that enables you to deploy any service to the cloud. Giggl was a co-browsing platform that let you watch movies and browse the web with friends in real-time.",
    dates: "Oct 2021 - Feb 2024",
  },
  {
    company: "Gumroad Inc.",
    position: "Frontend Engineer",
    link: "https://gumroad.com",
    description:
      "Gumroad is a platform for creators to sell directly to their audience.",
    dates: "Aug 2021",
  },
];

type OSS = {
  name: string;
  role: string;
  link: string;
  description: string;
};

const OSS: OSS[] = [
  {
    name: "clickhouse-js",
    role: "Contributor",
    link: "https://github.com/ClickHouse/clickhouse-js",
    description: "A ClickHouse client for JavaScript environments.",
  },
  {
    name: "worker-lb",
    role: "Creator",
    link: "https://github.com/lawgdev/worker-lb",
    description: "A load balancer for Cloudflare Workers.",
  },
  {
    name: "IMPERIAL",
    role: "Creator",
    link: "https://imperialb.in",
    description:
      "A code/text storing site where you can share, edit, or encrypt documents.",
  },
  {
    name: "Capybara API",
    role: "Creator",
    link: "https://capy.lol/",
    description:
      "A free, open-source API that allows you to generate random images of capybaras.",
  },
  {
    name: "Kaito",
    role: "Core Contributor",
    link: "https://github.com/kaito-http/kaito",
    description: "A small and lightweight HTTP server framework.",
  },
  {
    name: "trunkate",
    role: "Creator",
    link: "https://github.com/looskie/trunkate",
    description: "A React package to help truncate React elements.",
  },
  {
    name: "dahliaOS",
    role: "Core Contributor",
    link: "https://dahliaos.io",
    description:
      "An intuitive operating system with a modern user interface, powered by Flutter.",
  },
];

export {
  EMAIL,
  TWITTER,
  GITHUB,
  LINKEDIN,
  INSTAGRAM,
  DISCORD_ID,
  WORK,
  OSS,
  fullTwConfig,
};
