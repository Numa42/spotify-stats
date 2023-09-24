// Obtenez l'URL actuelle de la page
const url = window.location.href;

// Créez une fonction pour extraire les paramètres de l'URL
function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function top5() {
    // Utilisez la fonction pour obtenir la valeur du paramètre "code"
    const token = getParameterByName("code", url);

    // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
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
};