import Head from "next/head";
import AnimatedText from "../components/AnimatedText";
import AnimatedPage from "../components/PageWrapper";
import Link from "next/link";

export default function About() {
  return (
    <AnimatedPage>
      <Head>
        <title>cody — about</title>
        <meta
          name="description"
          content="hey, i'm cody, an 20 year old software engineer and designer based in the
        united states. i strive to build unique and polished web
        interfaces for both consumer and business ends. i love lacrosse,
        capybaras, and writing open source software! i'm currently working on Bloom & Hop"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="title__wrapper">
        <AnimatedText element="h1" text="About" />
      </div>
      <p>
        hey, i'm cody, a 20 year old software engineer and designer based in
        the united states. i strive to build unique and polished web interfaces
        for both consumer and business ends. i love lacrosse, capybaras, and
        writing open source software!
      </p>

      <br />
      <p>
        I'm currently working at{" "}
        <Link href="https://cside.dev/" target="_blank">
          c/side
        </Link>
      </p>
    </AnimatedPage>
  );
}
