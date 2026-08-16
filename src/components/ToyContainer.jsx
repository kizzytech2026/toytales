import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, onLikeToy, onDeleteToy }) {
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard
          key={toy.id}
          toy={toy}
          onLikeToy={onLikeToy}
          onDeleteToy={onDeleteToy}
        />
      ))}
    </div>
  );
}

export default ToyContainer;