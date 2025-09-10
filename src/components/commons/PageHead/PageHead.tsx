import Head from "next/head";

interface PageHeadProps {
  title?: string;
  description?: string;
}

const PageHead = (props: PageHeadProps) => {
  const { title = "Zyvent", description = "Default description" } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta charSet="UTF-8" />
      <meta name="description" content={description} />
      <link rel="icon" href="/general/logo.svg" type="image/x-icon" />
    </Head>
  );
};

export default PageHead;
