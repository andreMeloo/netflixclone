/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react';
import './App.css'
import tmdb from './tmdb';
import MovieRow from './components/movierow/MovieRow'


export default () => {

  const [movieList, setMovieList] = useState([]);

  useEffect( ()=> {
    const loadAll = async () => {
      // Pegando a lista TOTAL
      let list = await tmdb.getHomeList();
      setMovieList(list);
    }

    loadAll();
  }, []);


  return (
    <div className="page">
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  );
}