export async function getSearchResults({ searchQuery }) {
  // set these in an environment variable?
  const userId = import.meta.env.SPOTIFY_USER_ID;
  const clientId = import.meta.env.SPOTIFY_CLIENT_ID;
  // construct the search url
  const searchUrl = new URL("https://api-v2.soundcloud.com/search/tracks");
  searchUrl.searchParams.set("q", searchQuery);
  searchUrl.searchParams.set("user_id", userId);
  searchUrl.searchParams.set("client_id", clientId);
  searchUrl.searchParams.set("limit", 20);
  searchUrl.searchParams.set("offset", 0);
  searchUrl.searchParams.set("linked_partitioning", 1);
  searchUrl.searchParams.set("app_locale", "en");
  searchUrl.searchParams.set("facet", "genre");
  searchUrl.searchParams.set("variant_ids", 2622); // not sure what this does
  searchUrl.searchParams.set("filter.duration", "epic");
  // do the fetch

  const fetchOptions = {
    credentials: "omit",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/118.0",
      Accept: "application/json, text/javascript, */*; q=0.01",
      "Accept-Language": "en-US,en;q=0.5",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-site",
    },
    referrer: "https://soundcloud.com/",
    method: "GET",
    mode: "cors",
  };
  const searchResponse = await fetch(searchUrl.toString(), fetchOptions);
  const json = await searchResponse.json();

  const tracks = json.collection;
  // we don't need all the object keys
  return tracks.map((track) => {
    return track;
  });
}
