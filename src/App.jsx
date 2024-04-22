import { useEffect, useState } from "react";

import "./App.css";

const fakePeopleNames = [];

for (let i = 0; i < 100; i++) {
  fakePeopleNames.push(`Person ${i}`);
}

function App() {
  const [unselectedNames, setUnselectedNames] = useState(
    new Set(fakePeopleNames)
  );
  const [selectedNames, setSelectedNames] = useState(new Set([]));

  const handleClick = () => {
    const cancelCode = JSON.stringify(localStorage.getItem("cancelCode"));
    const keyCode = JSON.stringify(
      new URL(document.location).searchParams.get("code")
    );

    if (cancelCode === keyCode) {
      localStorage.removeItem("cancelCode");
      window.close();
      return;
    }

    localStorage.setItem(
      "attributes",
      JSON.stringify(Array.from(selectedNames))
    );

    localStorage.setItem("code", keyCode);

    window.close();
  };

  useEffect(() => {
    const attributesList = new URL(document.location).searchParams.get("tag");
    setSelectedNames(JSON.parse(attributesList) || new Set([]));
    setUnselectedNames((prev) => {
      const newSet = new Set(prev);
      JSON.parse(attributesList).forEach((name) => newSet.delete(name));
      return newSet;
    });
  }, []);

  return (
    <>
      <div className="container">
        <div className="unselected">
          {Array.from(unselectedNames).map((name) => (
            <button
              key={name}
              onClick={() => {
                setSelectedNames((prev) => {
                  const newSet = new Set(prev);
                  newSet.add(name);
                  return newSet;
                });
                setUnselectedNames((prev) => {
                  const newSet = new Set(prev);
                  newSet.delete(name);
                  return newSet;
                });
              }}
            >
              + {name}
            </button>
          ))}
        </div>
        <div className="selected">
          {Array.from(selectedNames).map((name) => (
            <button
              key={name}
              onClick={() => {
                setSelectedNames((prev) => {
                  const newSet = new Set(prev);
                  newSet.delete(name);
                  return newSet;
                });
                setUnselectedNames((prev) => {
                  const newSet = new Set(prev);
                  newSet.add(name);
                  return newSet;
                });
              }}
            >
              - {name}
            </button>
          ))}
        </div>
      </div>
      <div className="continue" onClick={handleClick}>
        continue
      </div>
    </>
  );
}

export default App;
