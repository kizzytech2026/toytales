import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const API_URL = "http://localhost:3001/toys";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // Show/hide the form
  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // GET - Fetch all toys when the page loads
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setToys(data);
      })
      .catch((error) => {
        console.error("Error fetching toys:", error);
      });
  }, []);

  // POST - Create a new toy
  function handleAddToy(newToy) {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((response) => response.json())
      .then((createdToy) => {
        setToys((currentToys) => [
          ...currentToys,
          createdToy,
        ]);

        setShowForm(false);
      })
      .catch((error) => {
        console.error("Error creating toy:", error);
      });
  }

  // DELETE - Donate a toy
  function handleDeleteToy(id) {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete toy");
        }

        setToys((currentToys) =>
          currentToys.filter((toy) => toy.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting toy:", error);
      });
  }

  // PATCH - Like a toy
  function handleLikeToy(id) {
    const toyToUpdate = toys.find((toy) => toy.id === id);

    if (!toyToUpdate) {
      return;
    }

    const updatedLikes = toyToUpdate.likes + 1;

    fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: updatedLikes,
      }),
    })
      .then((response) => response.json())
      .then((updatedToy) => {
        setToys((currentToys) =>
          currentToys.map((toy) =>
            toy.id === id ? updatedToy : toy
          )
        );
      })
      .catch((error) => {
        console.error("Error liking toy:", error);
      });
  }

  return (
    <>
      <Header />

      {showForm ? (
        <ToyForm onAddToy={handleAddToy} />
      ) : null}

      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>

      <ToyContainer
        toys={toys}
        onLikeToy={handleLikeToy}
        onDeleteToy={handleDeleteToy}
      />
    </>
  );
}

export default App;