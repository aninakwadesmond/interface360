import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Style from './newsNaV.module.scss';
import { useContext, useEffect, useState } from 'react';
import { BlogContext } from '../ContextApr/BlogContext';
import { json } from 'react-router-dom';

function NewsNav() {
  const { queryInput, query, dispatch, load } = useContext(BlogContext);
  // const [load, setLoad] = useState(false);

  useEffect(() => {
    dispatch({ type: 'resetQuery' });
  }, [load]);

  function handleInput(e) {
    dispatch({ type: 'queryInput', payload: e.target.value });
  }

  useEffect(() => {
    async function fetchData() {
      if (queryInput.length < 3) return;
      if (!load) return;
      const response = await fetch(
        `https://gnews.io/api/v4/search?q=${queryInput}&apikey=9430c3128033a6153997af83a0a91e5b`
      );
      if (!response.ok) {
        return json({ message: 'Error page' }, { status: 300 });
      } else {
        const responseData = await response.json();
        dispatch({ type: 'loadData', payload: responseData.articles });
        dispatch({ type: 'setLoad', payload: false });
        // setLoad(false);
        // dispatch({ type: 'resetQuery' });
      }
    }
    fetchData();
  }, [load]);

  function SubmitInput(e) {
    if (e.key === 'Enter') {
      dispatch({ type: 'setLoad', action: true });
      // setLoad((prev) => !prev);
    }
  }

  return (
    <div className={Style.nav}>
      <h1>News & Blogs</h1>
      <div className={Style.search}>
        <input
          type="text"
          value={queryInput}
          placeholder="search..."
          onChange={(e) => {
            handleInput(e);
          }}
          onKeyDown={(e) => SubmitInput(e)}
        />
        <FontAwesomeIcon
          icon={faSearch}
          className={Style.searchbutton}
          onClick={() => dispatch({ type: 'setLoad', payload: true })}
        />
      </div>
    </div>
  );
}

export default NewsNav;
