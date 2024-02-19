import { useEffect, useState } from "react";
import Card from "../component/Card";
import Spinner from "../component/Spinner";

function Home() {
  const [task, setTask] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch("http://localhost:5000");
      const data = await res.json();

      if(!res.ok) {
        setIsLoading(false)
      }
      if(res.ok) {
        setIsLoading(false)
      }

      setTask(data);
    };

    fetchData();
  }, []);
  return (
    <>
      {isLoading ? <Spinner /> : task.map((e) => <Card key={e._id} {...e} />)}
    </>
  );
}

export default Home;
