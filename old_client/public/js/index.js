console.log('Hello');

function buttonClicked() {
  console.log('Clicked');

  fetch('/button', {
    method: 'POST'
  })
  .then(response => response.json())
  .then(result => {
    console.log('Result:', result);
  })
  .catch( alert );
}

function addAccount(e) {
  e.preventDefault();

  const username = document.getElementById('username');
  const password = document.getElementById('password');

  if (!username.value || !password.value)
    return;

  console.log('Checking account...');
  
  const body = {
    username: username.value, 
    password: password.value
  };

  username.value = '';
  password.value = '';

  fetch('/add', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(response => response.json())
  .then(result => {
    console.log('Add acc:', result);
  })
  .catch( alert );
}

document.getElementById('add-account-form').addEventListener('submit', addAccount);