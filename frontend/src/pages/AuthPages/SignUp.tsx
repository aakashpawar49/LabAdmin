import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title=" labAdmin@2025-26"
        description=" LabAdmin is laboratory management system "
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
