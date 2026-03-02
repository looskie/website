export type WorkItem = {
  company: string;
  slug: string;
  role: string;
  date: string;
  about: string;
  url: string;
  image?: string;
};

export type Project = {
  name: string;
  slug: string;
  role: string;
  about: string;
  url: string;
  image?: string;
};

export const DISCORD_SNOWFLAKE = "207204046115831809";

export const WORK_ITEMS: readonly WorkItem[] = [
  // {
  //   company: "Meter",
  //   slug: "meter",
  //   role: "fullstack engineer",
  //   date: "mar 2026 - present",
  //   about: "enterprise networking built from the ground up.",
  //   url: "https://meter.com",
  // },
  {
    company: "cside",
    slug: "cside",
    role: "fullstack engineer",
    date: "jan 2024 — feb 2026",
    about: "client-side security platform for monitoring and securing web apps",
    url: "https://cside.com",
  },
  {
    company: "Bloom",
    slug: "bloom",
    role: "fullstack & android engineer",
    date: "jan 2024 — apr 2024",
    about:
      "platform helping users learn investment strategies for long-term wealth",
    url: "https://bloomapp.com",
  },
  {
    company: "Hop (fmr. Giggl)",
    slug: "hop",
    role: "design & fullstack engineer",
    date: "oct 2021 — feb 2024",
    about:
      "cloud provider for deploying services, previously a co-browsing platform",
    url: "https://x.com/joinhop",
    image: "hop_lander.png",
  },
  {
    company: "Gumroad",
    slug: "gumroad",
    role: "frontend engineer",
    date: "aug 2021",
    about: "platform for creators to sell directly to their audience",
    url: "https://gumroad.com",
  },
];

export const PROJECTS: readonly Project[] = [
  {
    name: "clickhouse-js",
    slug: "clickhouse-js",
    role: "contributor",
    about: "a ClickHouse client for JavaScript environments",
    url: "https://github.com/ClickHouse/clickhouse-js",
  },
  {
    name: "worker-lb",
    slug: "worker-lb",
    role: "creator",
    about: "a load balancer for Cloudflare Workers",
    url: "https://github.com/lawgdev/worker-lb",
  },
  {
    name: "Capybara API",
    slug: "capybara-api",
    role: "creator",
    about: "a free, open-source API for generating random capybara images",
    url: "https://capy.lol",
  },
  {
    name: "Kaito",
    slug: "kaito",
    role: "core contributor",
    about: "a small and lightweight HTTP server framework",
    url: "https://github.com/kaito-http/kaito",
  },
  {
    name: "trunkate",
    slug: "trunkate",
    role: "creator",
    about: "a React package to help truncate React elements",
    url: "https://github.com/looskie/trunkate",
  },
  {
    name: "IMPERIAL",
    slug: "imperial",
    role: "creator",
    about:
      "a code/text storing site where you can share, edit, or encrypt documents",
    url: "https://imperialb.in",
  },
  {
    name: "dahliaOS",
    slug: "dahliaos",
    role: "core contributor",
    about: "an intuitive operating system with a modern UI, powered by Flutter",
    url: "https://dahliaos.io",
  },
];
