import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import { uploadObject, uploadAddData, clearState } from '../store/rootReducer'
import { 
  seleсtObjectData, seleсtObjectName, selectError, seleсtIsLoading,
  seleсtAdditionalData
} from '../store/selectors'
import { getIdFromUrl, objectKeysMap } from "../helpers"
import { Error } from './error'
import Loader from './loader'
import '../styles/object.scss'

const getObjectName = (key) => {
  if (['residents', 'pilots', 'characters'].includes(key)) {
    return 'people'
  }
  return key
}

const getRenderName = (objectName) => objectName === 'films' ? 'title' : 'name'


const ObjectComponent = ({
  objectName, objectData, error, isLoading, loadObject, loadAddData, addData, clearStateData
}) => {

  let params = useParams()
  let history = useHistory()

  useEffect(() => {
    clearStateData()
    loadObject(params.objname, +params.id);
  }, [params.objname, +params.id])

  useEffect(() => {
    objectData && loadAddData(objectData, objectName, objectKeysMap[objectName]["load"])
  }, [objectData])

  const handleClose = () => {
    history.push({ pathname: '/films' });
  }

  return (
    <div className='object'>
      {isLoading && <Loader />}
      {error && <Error />}
      {!isLoading && !error && <>
      <div
        className='object__close'
        onClick={() => handleClose()}
      >close</div>
      {objectData && objectKeysMap[objectName]["show"]
        .map(key =>
          <div className='object__row'>
            <p className='object__row_title'>{key}:</p>
            <p className='object__row_text'>{objectData[key]}</p>
          </div>
        )}
      <div>
        {!addData && <p className='loading object__row'>Loading...</p>}
        {addData && objectKeysMap[objectName]["load"]
          .map(key =>
            <div className='object__row'>
              <p className='object__row_title'>{key}:</p>
              <p className='object__row_text'>{addData[key] && addData[key].length && addData[key]
                .map(linkObj =>
                  <Link
                    className='object__row_link'
                    to={`/${getObjectName(key)}/${getIdFromUrl(linkObj.url)}`}>
                    {linkObj[getRenderName(key)]}
                  </Link>
                )}
              </p>
            </div>
          )}
      </div>
      </>}
    </div>
  )
}

const mapStateToProps = state => ({
  objectName: seleсtObjectName(state),
  objectData: seleсtObjectData(state),
  error: selectError(state),
  isLoading: seleсtIsLoading(state),
  addData: seleсtAdditionalData(state)
});

const mapDispatchToProps = dispatch => ({
  loadObject: (objName, objId) => dispatch(uploadObject(objName, objId)),
  loadAddData: (objData, objName, keys) => dispatch(uploadAddData(objData, objName, keys)),
  clearStateData: () => dispatch(clearState()) 
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ObjectComponent);

ObjectComponent.propTypes = {
  addData: PropTypes.object.isRequired,
  objectData: PropTypes.object.isRequired,
  objectName: PropTypes.string.isRequired,
  loadObject: PropTypes.func.isRequired,
  loadAddData: PropTypes.func.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
};

ObjectComponent.defaultProps = {
  error: null,
  isLoading: false,
};
