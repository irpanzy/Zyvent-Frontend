import AuthLayout from "@/components/layouts/AuthLayout";
import Activation from "@/components/views/Auth/Activation";
import authServices from "@/services/auth.service";

interface ActivationPageProps {
  status: "success" | "failed";
}

const ActivationPage = (props: ActivationPageProps) => {
  return (
    <AuthLayout title="Zyvent | Activation Account">
      <Activation {...props} />
    </AuthLayout>
  );
};

export async function getServerSideProps(context: { query: { code: string } }) {
  try {
    const result = await authServices.activation({ code: context.query.code });
    if (result.data.data) {
      return {
        props: {
          status: "success",
        },
      };
    } else {
      return {
        props: {
          status: "failed",
        },
      };
    }
  } catch (error) {
    console.error("Activation error:", error);
    return {
      props: {
        status: "failed",
      },
    };
  }
}

export default ActivationPage;
