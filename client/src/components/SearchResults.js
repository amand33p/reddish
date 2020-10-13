import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearchResults,
  toggleUpvote,
  toggleDownvote,
  loadSearchPosts,
} from '../reducers/searchReducer';
import PostCard from './PostCard';

import { Container, Paper, Typography, Button } from '@material-ui/core';
import { useSearchPageStyles } from '../styles/muiStyles';
import SearchIcon from '@material-ui/icons/Search';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import AutorenewIcon from '@material-ui/icons/Autorenew';

const SearchResults = () => {
  const { query } = useParams();
  const searchResults = useSelector((state) => state.search);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const dispatch = useDispatch();
  const classes = useSearchPageStyles();

  useEffect(() => {
    dispatch(setSearchResults(query));
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  if (!searchResults) {
    return null;
  }

  const handleLoadPosts = async () => {
    try {
      setLoadingMore(true);
      await dispatch(loadSearchPosts(query, page + 1));
      setPage((prevState) => prevState + 1);
      setLoadingMore(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Container disableGutters>
      <Paper variant="outlined" className={classes.mainPaper}>
        <Paper variant="outlined">
          <Typography
            variant="h6"
            color="secondary"
            className={classes.infoPaper}
          >
            <SearchIcon fontSize="large" style={{ marginRight: '7px' }} />
            Showing search results for "{query}"
          </Typography>
        </Paper>
        {searchResults.results.length !== 0 ? (
          searchResults.results.map((s) => (
            <PostCard
              key={s.id}
              post={s}
              toggleUpvote={toggleUpvote}
              toggleDownvote={toggleDownvote}
            />
          ))
        ) : (
          <Typography variant="h5" className={classes.noResults}>
            <SentimentVeryDissatisfiedIcon
              className={classes.sorryIcon}
              color="primary"
            />
            Sorry, there were no post results for "{query}"
          </Typography>
        )}
        {'next' in searchResults && (
          <div className={classes.loadBtnWrapper}>
            <Button
              color="primary"
              variant="outlined"
              size="large"
              onClick={handleLoadPosts}
              startIcon={<AutorenewIcon />}
              className={classes.loadBtn}
            >
              {loadingMore ? 'Loading more posts...' : 'Load more'}
            </Button>
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default SearchResults;
