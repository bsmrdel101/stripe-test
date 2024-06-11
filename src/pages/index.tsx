import { Layout } from "@/components/Layout";
import { userAtom } from "@/scripts/atoms/state";
import { isObjectNull } from "@/scripts/tools/utils";
import { useAtom } from "jotai";
import { useEffect } from "react";


export default function Home() {
  const [user] = useAtom<User>(userAtom);

  useEffect(() => {
    const fetchData = async () => {
      if (!user || isObjectNull(user)) return;
    };
    fetchData();
  }, [user]);


  return (
    <Layout title="Home">
      <main>
        <h1>Hello World</h1>
      </main>
    </Layout>
  );
}
