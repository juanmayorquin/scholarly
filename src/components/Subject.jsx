/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

const Subject = ({name, grades = [{ id: 0, value: 0, percent: 0 }] }) => {
  const [subjectGrades, setSubjectGrades] = useState(grades);
  const [neededGrade, setNeededGrade] = useState(0);
  const [missingPercent, setMissingPercent] = useState(1);
  const [desiredGrade] = useState(3);

  console.log(grades)
  console.log(subjectGrades)

  const handleGradeChange = (e, id) => {
    setSubjectGrades((prevSubjectGrades) => {
      const modifiedGradeIndex = prevSubjectGrades.findIndex(
        (note) => note.id == id
      );

      const newSubjectGrades = [...prevSubjectGrades];
      newSubjectGrades[modifiedGradeIndex].value = Number(e.target.value);
      return newSubjectGrades;
    });
  };

  const handlePercentChange = (e, id) => {
    setSubjectGrades((prevSubjectGrades) => {
      const modifiedGradeIndex = prevSubjectGrades.findIndex(
        (note) => note.id == id
      );

      const newSubjectGrades = [...prevSubjectGrades];
      newSubjectGrades[modifiedGradeIndex].percent = Number(e.target.value);
      return newSubjectGrades;
    });
  };

  const handleAddGrade = (e) => {
    e.preventDefault();
    const newGrade = {
      id: nanoid(),
      value: 0,
      percent: 0,
    };
    setSubjectGrades((prevSubjectGrades) => [...prevSubjectGrades, newGrade]);
  };

  const handleDeleteGrade = (id) => {
    setSubjectGrades((prevSubjectGrades) => {
      const deleteGrade = prevSubjectGrades.find((note) => note.id === id);
      return prevSubjectGrades.filter((note) => note.id != deleteGrade.id);
    });
  };

  const calcNeededGrade = () => {
    const { totalGrade, totalPercent } = subjectGrades.reduce(
      (acc, grade) => {
        acc.totalGrade += grade.value * (grade.percent / 100);
        acc.totalPercent += grade.percent / 100;
        return acc;
      },
      { totalGrade: 0, totalPercent: 0 }
    );

    const remainingPercent = 1 - totalPercent;

    // Ya tiene más del 100%
    if (remainingPercent >= 1) {
      setNeededGrade(0);
      setMissingPercent(0);
      return;
    }

    const needed = (desiredGrade - totalGrade) / remainingPercent;
    setNeededGrade(Math.max(needed, 0));
    setMissingPercent(remainingPercent * 100);
  };
  useEffect(() => {
    calcNeededGrade();
  }, [subjectGrades]);

  return (
    <>
      <h2>{name}</h2>
      <form onSubmit={handleAddGrade}>
        {subjectGrades.map((grade) => (
          <div key={grade.id}>
            <input
              onChange={(e) => handleGradeChange(e, grade.id)}
              type="number"
              placeholder="Calificación"
            />
            <input
              onChange={(e) => handlePercentChange(e, grade.id)}
              type="number"
              placeholder="Porcentaje"
            />
            <button
              onClick={() => {
                handleDeleteGrade(grade.id);
              }}
            >
              Eliminar
            </button>
          </div>
        ))}
        <p>{`Necesitas un ${neededGrade} en el ${missingPercent}% restante`}</p>
        <button>Añadir nota</button>
      </form>
    </>
  );
};

export default Subject;