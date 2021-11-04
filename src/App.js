/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react';
import './App.css'
import tmdb from './tmdb';
import Header from './components/header/Header';
import FeatureMovie from './components/featuremovie/FeatureMovie';
import MovieRow from './components/movierow/MovieRow'


export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect( ()=> {
    const loadAll = async () => {
      // Pegando a lista TOTAL
      let list = await tmdb.getHomeList();
      setMovieList(list);

      // pegando o feature
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];

      while (chosen.backdrop_path === null || chosen.genre_ids.length === 0 || chosen.overview === "") {
        randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
        chosen = originals[0].items.results[randomChosen];
      }
      
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');
      setFeatureData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListner = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListner);

    return () => {
      window.removeEventListener('scroll',scrollListner);
    }
  }, [])


  return (
    <div className="page">

      <Header black={blackHeader} />

      {featureData &&
        <FeatureMovie item={featureData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Feito com <span role="img" aria-label="coração">❤️</span> por Andre Melo<br/>
        Direitos de imagem para Netflix<br/>
        Dados pego do site Themoviedb.org
      </footer>

      {movieList.length <= 0 && 
        <div className="loading">
          <img alt="carregando" src="https://c.tenor.com/Rfyx9OkRI38AAAAC/netflix-netflix-startup.gif"/>
        </div>
      }
    </div>
  );
}