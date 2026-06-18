const localStorageKey = 'feedback-form-state';
const formData = { email: '', message: '' };

const form = document.querySelector('.feedback-form');

// On page load, populate form and formData from localStorage
const savedData = localStorage.getItem(localStorageKey);
if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);
    if (parsedData) {
      formData.email = (parsedData.email || '').trim();
      formData.message = (parsedData.message || '').trim();
      form.elements.email.value = formData.email;
      form.elements.message.value = formData.message;
    }
  } catch (error) {
    console.error('Failed to parse feedback form state from localStorage:', error);
  }
}

// Track input changes using event delegation
form.addEventListener('input', (event) => {
  const { name, value } = event.target;
  if (name === 'email' || name === 'message') {
    formData[name] = value.trim();
    localStorage.setItem(localStorageKey, JSON.stringify(formData));
  }
});

// Handle form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = formData.email.trim();
  const message = formData.message.trim();

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(localStorageKey);
  formData.email = '';
  formData.message = '';
  form.reset();
});
