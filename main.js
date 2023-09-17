//Demande des informations sur l'utilisateur Spotify

function generateRandomString(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
//hashage
//const digest = await window.crypto.subtle.digest('SHA-256', data);

//La generateCodeChallengefonction renvoie la base64représentation du résumé en appelant àbase64encode() :
async function generateCodeChallenge(codeVerifier) {
  function base64encode(string) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);

  return base64encode(digest);
}


//Le code pour demander l'autorisation de l'utilisateur ressemble à ceci :
const clientId = 'aca7085d90bc434c93697e3118cc8297';
const redirectUri = 'http://localhost:8080';

let codeVerifier = generateRandomString(128);

generateCodeChallenge(codeVerifier).then(codeChallenge => {
  let state = generateRandomString(16);
  let scope = 'user-read-private user-read-email';

  localStorage.setItem('code_verifier', codeVerifier);

  let args = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectUri,
    state: state,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge
  });

  window.location = 'https://accounts.spotify.com/authorize?' + args;
})
;
//Analyse l'URL et enregistrer le codeparamètre pour demander ensuite le jeton d'accès
const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');

//Le corps de la requête peut être implémenté comme suit :
let codeVerifier = localStorage.getItem('code_verifier');

let body = new URLSearchParams({
  grant_type: 'authorization_code',
  code: code,
  redirect_uri: redirectUri,
  client_id: clientId,
  code_verifier: codeVerifier
});

//Enfin, nous pouvons faire la POSTrequête et stocker le jeton d'accès en analysant la réponse JSON du serveur :
const response = fetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: body
})
  .then(response => {
    if (!response.ok) {
      throw new Error('HTTP status ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    localStorage.setItem('access_token', data.access_token);
  })
  .catch(error => {
    console.error('Error:', error);
  });

//Le code suivant implémente la getProfile()fonction qui effectue l'appel API au /mepoint de terminaison afin de récupérer les informations relatives au profil utilisateur :

  async function getProfile(accessToken) {
    let accessToken = localStorage.getItem('access_token');

    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });

    const data = await response.json();
  }

//Top 5 des titres des 30 derniers jours

// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQCGjJrxpKhn4X3DVMlhpr4bt7L1nf68psRDNHDhzPW3WdlZw7BJEV48X0BDZGgZtn66339RZnscqqvh3pJGvJ-kB8WUcc7rL6-HSJmB2yqUUuGPaoDPG0P7rAP3wUBzAyHUJchnRHKUJDq8zVojjrFXDlzC8hs_TNJN9WSK6gB8uVBw_ze2mrE6hRz0aREkdlkQnCeIBxtYCuJCtJOQVu_VWtcRWp_saS92bnpv3uTbzVH0doTCpRUO44ucbMZNCjpSNYkBb8FVZhyZBQkK';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=short_term&limit=5', 'GET'
  )).items;
}

const topTracks = await getTopTracks();
console.log(
  topTracks?.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);

//Recommandation de 5 chansons en fonction des 5 meilleurs morceaux de l'utilisateur

// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQCGjJrxpKhn4X3DVMlhpr4bt7L1nf68psRDNHDhzPW3WdlZw7BJEV48X0BDZGgZtn66339RZnscqqvh3pJGvJ-kB8WUcc7rL6-HSJmB2yqUUuGPaoDPG0P7rAP3wUBzAyHUJchnRHKUJDq8zVojjrFXDlzC8hs_TNJN9WSK6gB8uVBw_ze2mrE6hRz0aREkdlkQnCeIBxtYCuJCtJOQVu_VWtcRWp_saS92bnpv3uTbzVH0doTCpRUO44ucbMZNCjpSNYkBb8FVZhyZBQkK';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

const topTracksIds = [
  '0s1PsjRpN9v3gveUOM6Iux','5yqgKyX1TOG41LBSosE1X8','7nhWtCc3v6Vem80gYPlppQ','3sBofbRnJphNVu5SdBxzKQ','4ycaDB5s90BpUyaS5nZwcI'
];

async function getRecommendations(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
  return (await fetchWebApi(
    `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET'
  )).tracks;
}

const recommendedTracks = await getRecommendations();
console.log(
  recommendedTracks.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);

//Écouter une chanson ici et maintenant
const playlistId = '103uXic5F34U6TgxL8fnFR';

<iframe
  title="Spotify Embed: Recommendation Playlist "
  src={`https://open.spotify.com/embed/playlist/103uXic5F34U6TgxL8fnFR?utm_source=generator&theme=0`}
  width="100%"
  height="100%"
  style={{ minHeight: '360px' }}
  frameBorder="0"
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy"
/>

//Main
function generation(){
    var inputText = document.getElementBy("token");
    var token = generateRandomString(128);
    inputText.value = token;
}