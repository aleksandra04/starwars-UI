import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/filmsPage.scss';
import { useLocation, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  selectFilmsData,
  selectError,
  seleсtIsLoading
} from '../store/selectors'
import { uploadFilms } from '../store/rootReducer'
import ObjectComponent from './objectComponent'
import Loader from './loader'
import { Error } from './error'
import { getIdFromUrl } from '../helpers'

const FilmsPage = ({
  filmsData,
  error,
  isLoading,
  loadFilms,
  match
}) => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const input = searchParams.get('query');
  const sortOrder = searchParams.get('sortOrder');
  
  useEffect(() => {
    filmsData.length || loadFilms();
  }, [loadFilms])

  const handleInputChange = (value) => {
    searchParams.set('query', value);
    if (value) {
      history.push({ search: searchParams.toString() });
    } else {
      searchParams.delete('query');
      history.push({ search: searchParams.toString() });
    }
  };

  const filteredFilms = input
    ? filmsData.filter(film =>
      film.title.toLowerCase()
        .includes(input.trim().toLowerCase())
      || film.episode_id === +input.trim())
    : filmsData;

  const handleSort = () => {
    if (!sortOrder || sortOrder === 'desc') {
      searchParams.set('sortOrder', 'asc');
    } else {
      searchParams.set('sortOrder', 'desc');
    }
    history.push({ search: searchParams.toString() });
  }

  const sortbyName = (arr) => arr
    .sort((a, b) => a.title.localeCompare(b.title))

  let filmsToShow = [...filteredFilms]
  if (sortOrder === 'asc') {
    filmsToShow = sortbyName(filmsToShow)
  } if (sortOrder === 'desc') {
    filmsToShow = sortbyName(filmsToShow).reverse()
  }

  const handleCardClick = (id) => {
    history.push({
      pathname: `${match.url}/${id}`,
      search: location.search,
    });
  }

  var filmId = match.params.id

  return (
    <div className='main'>
      <h1 className='main__header'>Star Wars</h1>
      {isLoading && <Loader />}
      {error && <Error message={error} />}
      {filmId && !error && !isLoading &&
        <ObjectComponent />}
      {!error && !isLoading && !filmId &&
        <div>
          <div className='bar'>
            <input
              type="search"
              placeholder='Search...'
              value={input}
              onChange={event => handleInputChange(event.target.value)}
              className ='bar__input'
            >
            </input>
            <div 
              className='bar__sort'
              onClick={() => handleSort()}
            >
              Sort by name
            </div>
          </div>

          <div className='films'>
            {filmsToShow.map(film =>
              <div
                key={film.episode_id}
                className='films__card'
                onClick={() => handleCardClick(getIdFromUrl(film.url))}
              >
                <p className='films__card_title'>{film.title}</p>
                <p>Episode {film.episode_id}</p>
              </div>
            )}
          </div>
        </div>}
    </div>
  )
}

const mapStateToProps = state => ({
  filmsData: selectFilmsData(state),
  error: selectError(state),
  isLoading: seleсtIsLoading(state),
});

const mapDispatchToProps = dispatch => ({
  loadFilms: value => dispatch(uploadFilms(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilmsPage);

FilmsPage.propTypes = {
  filmsData: PropTypes.arrayOf(PropTypes.shape({})),
  match: PropTypes.string.isRequired,
  loadFilms: PropTypes.func.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
};

FilmsPage.defaultProps = {
  filmsData: [],
  error: null,
  isLoading: false,
};
