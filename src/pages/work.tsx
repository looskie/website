import Head from "next/head";
import AnimatedText from "../components/AnimatedText";
import AnimatedPage from "../components/PageWrapper";
import { OSS, WORK } from "../utils/constants";

export default function Work() {
  return (
    <AnimatedPage>
      <Head>
        <title>cody — work</title>
        <meta
          name="description"
          content="here are a few hand picked projects i've worked on recently."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="title__wrapper">
        <AnimatedText element="h1" text="Work" />
      </div>
      <div className="flex flex-col gap-[100px]">
        {WORK.map((work, index) => (
          <div
            key={work.company}
            className="relative flex flex-col max-w-[700px]"
          >
            <span className="absolute -left-[45px] -top-[30px] text-5xl text-primary-100 opacity-10">
              {index.toString().padStart(2, "0")}
            </span>
            <h2 className="text-5xl font-bold text-primary-100 mb-3">
              {work.company}
              {work.dates ? (
                <span className="text-lg font-normal text-primary-400 ml-3">
                  {work.dates}
                </span>
              ) : null}
            </h2>
            <p className="text-xl font-light text-primary-200 mb-3">
              <span className="font-semibold text-primary-400">
                {work.position} —{" "}
              </span>
              {work.description}
            </p>
            <a href={work.link} target="_blank" rel="noreferrer">
              visit website
            </a>
          </div>
        ))}
      </div>

      <div className="title__wrapper mt-[100px]">
        <AnimatedText element="h1" text="OSS" />
      </div>
      <div className="flex flex-col gap-[100px]">
        {OSS.map((project, index) => (
          <div
            key={project.name}
            className="relative flex flex-col max-w-[700px]"
          >
            <span className="absolute -left-[45px] -top-[30px] text-5xl text-primary-100 opacity-10">
              {index.toString().padStart(2, "0")}
            </span>
            <h2 className="text-5xl font-bold text-primary-100 mb-3">
              {project.name}
            </h2>
            <p className="text-xl font-light text-primary-200 mb-3">
              <span className="font-semibold text-primary-400">
                {project.role} —{" "}
              </span>
              {project.description}
            </p>
            <a href={project.link} target="_blank" rel="noreferrer">
              view project
            </a>
          </div>
        ))}
      </div>
    </AnimatedPage>
  );
}
