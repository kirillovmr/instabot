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