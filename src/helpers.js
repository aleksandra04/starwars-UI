export const getIdFromUrl = (url) => {
  let arr = url.split('/')
  return +arr[arr.length - 2]
}

export const objectKeysMap = {
  "people": {
    "show": ["name", "height", "mass", "hair_color", "skin_color", "eye_color", "birth_year", "gender", "homeworld"],
    "load": ["films", "species", "vehicles", "starships"]
  },
  "planets": {
    "show": ["name", "rotation_period", "orbital_period", "diameter", "climate", "gravity", "terrain", "surface_water", "population"],
    "load": ["residents", "films"]
  },
  "films": {
    "show": ["title", "episode_id", "opening_crawl", "director", "producer", "release_date"],
    "load": ["characters", "planets", "starships", "vehicles", "species"]
  },
  "species": {
    "show": [
      "name", "classification", "designation", "average_height", "skin_colors",
      "hair_colors", "eye_colors", "average_lifespan", "homeworld", "language"
    ],
    "load": ["people", "films"]
  },
  "vehicles": {
    "show": [
      "name", "model", "manufacturer", "cost_in_credits", "length", "max_atmosphering_speed",
      "crew", "passengers", "cargo_capacity", "consumables", "vehicle_class"],
    "load": ["pilots", "films"]
  },
  "starships": {
    "show": [
      "name", "model", "manufacturer", "cost_in_credits", "length", "max_atmosphering_speed",
      "crew", "passengers", "cargo_capacity", "consumables", "hyperdrive_rating", "MGLT", "starship_class"
    ],
    "load": ["pilots", "films"]
  }
}
