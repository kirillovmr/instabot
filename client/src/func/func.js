const LOCAL_API_ROOT = 'http://localhost:4000';

export function getApi() {
  const origin = window.location.origin;

  if (origin.includes('localhost')) {
    return LOCAL_API_ROOT;
  } else {
    return origin;
  }
}

// Sets to state users object
// Call with initialFetch.call(this)
export async function initialFetch() {
  await fetch(`${getApi()}/initial`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(result => {
    if (!result.success)
      return alert("Error making initial fetch");

    this.setState({
      ...result,
      initialDone: true
    });
  })
  .catch( alert );
}

export function fetchUser(username) {
  fetch(`${getApi()}/user?username=${username}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(result => {
    this.setState({
      ...result
    });
  })
  .catch( alert );
}