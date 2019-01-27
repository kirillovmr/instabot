const LOCAL_API_ROOT = 'http://localhost:4000';

export function getApi() {
  const origin = window.location.origin;

  if (origin.includes('localhost')) {
    return LOCAL_API_ROOT;
  } else {
    return origin;
  }
}

export async function initialFetch(apiRoot) {
  await fetch(`${apiRoot}/initial`, {
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
      users: result.users,
      initialDone: true
    });
  })
  .catch( alert );
}