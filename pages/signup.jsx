import DisableZoom from "../components/DisableZoom/DisableZoom";
import Layout from "../components/Layout/layout";
import RegisterScreen from "./Screens/Register/RegisterScreen";

export default function SignupPage() {
  return (
    <>
      <DisableZoom />
      <Layout>
        <RegisterScreen />
      </Layout>
    </>
  );
}
