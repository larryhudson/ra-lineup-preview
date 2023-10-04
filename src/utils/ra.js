import cheerio from "cheerio";

export async function getArtistsForEvent(eventUrl) {
  console.log("Getting artists for event with URL", eventUrl);
  // download the event page html
  // I got the headers from Firefox's browser dev tools - right click on network request and click 'use as fetch in console'
  const eventPageResponse = await fetch(eventUrl, {
    credentials: "include",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/118.0",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      "Upgrade-Insecure-Requests": "1",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "cross-site",
    },
    method: "GET",
    mode: "cors",
  });
  const eventPageHtml = await eventPageResponse.text();
  console.log(eventPageHtml);
  // parse the html
  const $ = cheerio.load(eventPageHtml);
  // get the ld+json script and parse it, then get the 'performer' array
  const jsonScriptTag = $("script[type='application/ld+json']");
  const jsonScriptTagContent = jsonScriptTag.html();
  console.log(jsonScriptTagContent);
  const jsonScriptTagJson = JSON.parse(jsonScriptTagContent);
  console.log(jsonScriptTagJson);
  const artistsArray = jsonScriptTagJson.performer;
  // return the array
  return artistsArray;
}
