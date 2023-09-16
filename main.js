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