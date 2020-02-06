import { createSelector } from 'reselect';

const rootSelector = state => state;

export const selectFilmsData = createSelector(
  rootSelector,
  ({ filmsData }) => {
    return !filmsData
      ? []
      : filmsData.sort((a, b) => a.episode_id - b.episode_id)
  }
)

export const selectError = createSelector(
  rootSelector,
  ({ error }) => error
)

export const seleсtIsLoading = createSelector(
  rootSelector,
  ({ isLoading }) => isLoading
);

export const seleсtObjectData = createSelector(
  rootSelector,
  ({ objectData }) => {
    return objectData
  }
);

export const seleсtObjectName = createSelector(
  rootSelector,
  ({ objectName }) => objectName
);

export const seleсtAdditionalData = createSelector(
  rootSelector,
  ({ objectAddData }) => objectAddData
);