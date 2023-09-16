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