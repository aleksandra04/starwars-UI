const SAVE_FILMS = 'SAVE_FILMS';
const START_LOADING = 'START_LOADING';
const STOP_LOADING = 'STOP_LOADING';
const SET_LOAD_FILMS_ERROR = 'SET_LOAD_FILMS_ERROR';
const SAVE_OBJECT = 'SAVE_OBJECT';
const SAVE_OBJECT_NAME = 'SAVE_OBJECT_NAME';
const SAVE_OBJECT_ADDITIONAL_DATA = 'SAVE_OBJECT_ADDITIONAL_DATA';
const CLEAR_STATE = 'CLEAR_STATE';


const saveFilms = value => ({
  type: SAVE_FILMS,
  payload: value,
})

const startLoading = () => ({
  type: START_LOADING,
})

const stoptLoading = () => ({
  type: STOP_LOADING,
})

const setFilmsError = value => ({
  type: SET_LOAD_FILMS_ERROR,
  payload: value,
})

const saveObject = value => ({
  type: SAVE_OBJECT,
  payload: value,
})

const saveObjectName = value => ({
  type: SAVE_OBJECT_NAME,
  payload: value,
})

const saveObjectAdditionalData = (value) => ({
  type: SAVE_OBJECT_ADDITIONAL_DATA,
  payload: value,
})

export const clearState = () => ({
  type: CLEAR_STATE
})


export const uploadFilms = () => dispatch => {
  dispatch(startLoading());

  fetch('https://swapi.co/api/films/')
    .then(res => res.json())
    .then(({ results }) => {
      dispatch(saveFilms(results))
    })
    .catch(error => dispatch(setFilmsError(error.message)))
    .finally(() => dispatch(stoptLoading()))
}

export const uploadObject = (objectName, objectId) => dispatch => {

  dispatch(startLoading());

  fetch(`https://swapi.co/api/${objectName}/${objectId}`)
    .then(res => res.json())
    .then(( results ) => {
      dispatch(saveObjectName(objectName))
      dispatch(saveObject(results))
    })
    .catch(error => dispatch(setFilmsError(error.message)))
    .finally(() => dispatch(stoptLoading()))
}


export const uploadAddData = (objectData, objectName, keys) => dispatch => {
  dispatch(startLoading());
  for(let i in keys){
    let promises = objectData[keys[i]].map(url => fetch(url).then(y => y.json()));
    Promise.all(promises).then(results => {
      let data = {}
      data[keys[i]] = results
      dispatch(saveObjectAdditionalData(data));
    });
  }
  dispatch(stoptLoading())
}

const initialState = {
  filmsData: null,
  isLoading: false,
  error: null,
  objectData: null,
  objectName: 'films',
  objectAddData: null,
}

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_FILMS:
      return {
        ...state,
        error: null,
        filmsData: action.payload,
      }
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case STOP_LOADING:
      return {
        ...state,
        isLoading: false,
      }
    case SET_LOAD_FILMS_ERROR:
      return {
        ...state,
        error: action.payload,
        filmsData: null
      }
    case SAVE_OBJECT:
      return {
        ...state,
        objectData: action.payload,
      }
      case SAVE_OBJECT_NAME:
        return {
          ...state,
          objectName: action.payload,
        }
    case SAVE_OBJECT_ADDITIONAL_DATA:
      return {
        ...state,
        objectAddData: {
          ...state.objectAddData,
          ...action.payload,
        }
      }
    case CLEAR_STATE:
      return {
        ...state,
        objectData: null,
        objectAddData: null
      }
    default:
      return state;
  }
}