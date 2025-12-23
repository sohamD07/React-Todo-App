const STORAGE_KEY = 'todos';

export const loadTodos = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];

    const parsed = JSON.parse(data);

    // Validate structure
    if (!Array.isArray(parsed)) {
      console.warn('Invalid todos data in localStorage');
      return [];
    }

    return parsed;
  } catch (error) {
    console.error('Error loading todos from localStorage:', error);
    return [];
  }
};

export const saveTodos = (todos) => {
  try {
    if (!Array.isArray(todos)) {
      console.error('Invalid todos data to save');
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Error saving todos to localStorage:', error);
    // Could notify user that save failed
  }
};

export const clearTodos = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing todos from localStorage:', error);
  }
};