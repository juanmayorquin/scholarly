import Subject from "./components/Subject";
import { fetchSubjects } from "./utils/fetchSubjects";
import { useEffect, useState } from "react";
function App() {
  const [grades, setGrades] = useState([{ id: 0, value: 0, percent: 0 }]);
  useEffect(() => {
    fetchSubjects().then((res) => {
      setGrades(res.data);
    });
  }, []);
  return (
    <>
      <h1 className="text-xl">Scholarly</h1>
      <Subject name={grades[0].name} grades={grades[0].grades} />
    </>
  );
}

export default App;
