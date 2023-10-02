export async function getSearchResults({ searchQuery }) {
  // set these in an environment variable?
  const userId = "MY_USER_ID_HERE";
  const clientId = "MY_CLIENT_ID_HERE";
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
  const searchHeaders = {
    Accept: "application/json, text/javascript, */*; q=0.01",
    "Accept-Language": "en-US,en;q=0.5",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    "X-Requested-With": "XMLHttpRequest",
  };
  const searchResponse = await fetch(searchUrl.toString());
  const json = await searchResponse.json();

  const tracks = json.collection;
  // we don't need all the object keys
  return tracks.map((track) => {
    return {};
  });
}
