import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="LabAdmin@2025-26"
        description=" LabAdmin is laboratory management system "
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
