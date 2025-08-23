import PageHead from "@/components/commons/PageHead";

interface AuthLayoutProps {
  title?: string;
  children: React.ReactNode;
  description?: string;
}

const AuthLayout = ({ title, children, description }: AuthLayoutProps) => {
  return (
    <>
      <PageHead title={title} description={description} />
      <section className="max-w-screen-3xl 3xl:container p-6">
        {children}
      </section>
    </>
  );
};

export default AuthLayout;
