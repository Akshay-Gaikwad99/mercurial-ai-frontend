import Layout from "../components/Layout/layout";
import { useRouter } from "next/router";
import Login from "./Screens/Login/LoginScreen";
import DisableZoom from "../components/DisableZoom/DisableZoom";

export default function LoginPage() {
  const router = useRouter();
  const { msg } = router.query;
  return (
    <Layout>
      <DisableZoom />
      <Login />
    </Layout>
  );
}
