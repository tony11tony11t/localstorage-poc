import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRef } from "react";

import "./Form.css";

const Form = () => {
  const [title, setTitle] = useState("");
  const [attributesList, setAttributesList] = useState([]);
  const [suggestion, setSuggestion] = useState("");
  const [description, setDescription] = useState("");

  const [db, setDb] = useState([]);

  const keyCode = useRef();

  const handleClick = (e) => {
    e.preventDefault();

    keyCode.current = uuidv4();

    window.open(
      `/attributes?tag=${JSON.stringify(attributesList)}&code=${
        keyCode.current
      }`,
      "_blank"
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !attributesList.length || !description || !suggestion) return;

    const newEntry = {
      title,
      attributes: attributesList,
      description,
      suggestion,
    };
    setDb([...db, newEntry]);

    setTitle("");
    setAttributesList([]);
    setSuggestion("");
    setDescription("");
  };

  useEffect(() => {
    const handleStorage = () => {
      const attributes = JSON.parse(localStorage.getItem("attributes"));
      const code = JSON.parse(localStorage.getItem("code"));

      if (attributes && code) {
        if (code === keyCode.current) {
          setAttributesList(attributes);
          localStorage.removeItem("code");
          localStorage.removeItem("attributes");
        }
      }
    };

    window.addEventListener("storage", handleStorage);

    window.addEventListener("beforeunload", () => {
      if (keyCode.current) {
        localStorage.setItem("cancelCode", keyCode.current);
      }
    });

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          <div className="attributes-list">
            {attributesList.map((a) => (
              <div key={a} className="attributes">
                {a}
              </div>
            ))}
          </div>
          <a onClick={handleClick} target="_blank">
            Choose Attributes
          </a>
        </div>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <textarea
          placeholder="Suggestion"
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
        />
        <button type="submit" className="submit">
          Submit
        </button>
      </form>
      <hr />
      <div className="table">
        <h2>List</h2>
        <div className="tbody">
          <h3>title</h3>
          <h3>description</h3>
          <h3>suggestion</h3>
          <h3>tag</h3>
        </div>
        {db.map((data) => (
          <div key={data.title} className="tbody">
            <h3>{data.title}</h3>
            <p>{data.description}</p>
            <p>{data.suggestion}</p>
            <div className="table-tag-list">
              {data.attributes.map((a) => (
                <div key={a} className="table-tag">
                  {a}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Form;
