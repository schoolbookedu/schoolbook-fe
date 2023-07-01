export const getStorage = (key, type = "string", storage = sessionStorage) => {
  switch (type) {
    case "object":
      const value = storage.getItem(key);
      if (value) {
        return JSON.parse(value);
      }
      return null;
    default:
      return storage.getItem(key);
  }
};

export const setStorage = (
  key,
  data,
  type = "string",
  storage = sessionStorage
) => {
  switch (type) {
    case "object":
      storage.setItem(key, JSON.stringify(data));
      break;
    default:
      storage.setItem(key, data);
      break;
  }
};

export const removeStorage = (key, storage = sessionStorage) => {
  storage.removeItem(key);
};

export const clearStorage = (storage = sessionStorage) => {
  storage.clear();
};
