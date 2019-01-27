import React from 'react';
import uuidv1 from 'uuid/v1';

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

// Sets to state user object
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

export function smile(value) {
  return <span key={uuidv1()} role="img" aria-label="">{value}</span>
}

export function textToSmile(text) {
  switch(text) {
    case 'like':
      return '❤️';
    case 'follow':
      return '👤';
    case 'comment':
      return '💬'
    case 'direct':
      return '✉️'
    default:
      return '🙄'
  }
}