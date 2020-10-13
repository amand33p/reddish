import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchResults } from '../reducers/searchReducer';

const SearchResults = () => {
  const { query } = useParams();
  const searchResults = useSelector((state) => state.search);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchResults(query));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!searchResults) {
    return null;
  }

  return (
    <div>
      {searchResults.results.map((s) => (
        <span key={s.id}>{s.title}</span>
      ))}
    </div>
  );
};

export default SearchResults;
