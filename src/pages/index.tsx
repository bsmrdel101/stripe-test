import { Layout } from "@/components/Layout";
import { getTest } from "@/scripts/controllers/stripeController";
import { useEffect } from "react";


export default function Home() {
  useEffect(() => {
    const fetchData = async () => {
      await getTest();
    };
    fetchData();
  }, []);


  return (
    <Layout title="Home">
      <main>
        
      </main>
    </Layout>
  );
}
