/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react';
import './App.css'
import tmdb from './tmdb';
import FeatureMovie from './components/featuremovie/FeatureMovie';
import MovieRow from './components/movierow/MovieRow'


export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);

  useEffect( ()=> {
    const loadAll = async () => {
      // Pegando a lista TOTAL
      let list = await tmdb.getHomeList();
      setMovieList(list);

      // pegando o feature
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');
      console.log(chosenInfo);
      setFeatureData(chosenInfo);
    }

    loadAll();
  }, []);


  return (
    <div className="page">

      {featureData &&
        <FeatureMovie item={featureData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  );
}