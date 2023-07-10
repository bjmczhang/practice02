import { FilmDetail, FilmDetailEmpty } from "./FilmDetail";
import FilmRow from "./FilmRow";
import TMDB from "./TMDB";
import { useState } from "react";

import "./FilmLibrary.css";

function FilmLibrary() {
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [selectedList, setSelectedList] = useState("all");
  const [faves, setFaves] = useState([]);

  const { films } = TMDB;
  const sectionCount = films.length;
  const favesCount = faves.length;

  const handleShowDetail = (film) => {
    setSelectedFilm(film);
  };

  const handleAddToFaves = (film) => {
    faves.includes(film) ? setFaves(faves) : setFaves([...faves, film]);
  };

  const handleRemoveFaves = (film) => {
    setFaves(faves.filter((fave) => fave.id !== film.id));
    setSelectedFilm(selectedFilm.id === film.id ? null : selectedFilm);
  };

  return (
    <div className="FilmLibrary">
      <div className="film-list">
        <h1 className="section-title">FILMS</h1>
        <div className="film-list-filters">
          <button
            className={`film-list-filter ${
              selectedList === "all" ? "is-active" : null
            }`}
            onClick={() => {
              setSelectedList("all");
              setSelectedFilm(null);
            }}
          >
            ALL
            <span className="section-count">{sectionCount}</span>
          </button>
          <button
            className={`film-list-filter ${
              selectedList === "faves" ? "is-active" : null
            }`}
            onClick={() => {
              setSelectedList("faves");
              setSelectedFilm(null);
            }}
          >
            FAVES
            <span className="section-count">{favesCount}</span>
          </button>
        </div>
        {(selectedList === "faves" ? faves : films).map((film, index) => (
          <FilmRow
            film={film}
            key={index}
            showDetail={handleShowDetail}
            addToFaves={handleAddToFaves}
            selectedList={selectedList}
            removeFromFaves={handleRemoveFaves}
          />
        ))}
      </div>

      <div className="film-details">
        <h1 className="section-title">DETAILS</h1>
        {selectedFilm !== null ? (
          <FilmDetail selectedFilm={selectedFilm} />
        ) : (
          <FilmDetailEmpty />
        )}
      </div>
    </div>
  );
}

export default FilmLibrary;
