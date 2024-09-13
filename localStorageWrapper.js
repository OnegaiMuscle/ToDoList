const localStorageWrapper = {

  prefix: 'task_',

  setItem(key, value) {
    localStorage.setItem(this.prefix + key, JSON.stringify(value));
  },

  getItem(key) {
    const item = localStorage.getItem(this.prefix + key);
    try {
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error("Erreur de parsing pour la clé", key, error);
      return null;
    }
  },

  getAllItems() {
    const items = {}
    const keys = Object.keys(localStorage).filter(key => key.startsWith(this.prefix))
    console.log(keys)
    keys.forEach(key => {
      items[key] = localStorage.getItem(key);
    });
    return items
  },

  removeItem(key) {
    localStorage.removeItem(this.prefix + key);
  },
};

export default localStorageWrapper;
