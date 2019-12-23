import axios, { AxiosResponse } from "axios";
import jsonpAdapter from "axios-jsonp";
// import Store from "../utils/firebase";

import { YOUTUBE_ROOT_URL, GOOGLE_AC_URL } from "../constants/settings";

const params = {
  key: process.env.REACT_APP_YOUTUBE_API_KEY,
  part: "snippet",
  type: "video"
};

export const youtubeSearch = (term: string) => {
  return axios
    .get(YOUTUBE_ROOT_URL, {
      params: {
        ...params,
        q: term
      }
    })
    .then(res =>
      // res.data.items.length
      res.data
    );
};

export const suggest = (term: string) => {
  // @ts-ignore
  return axios({
    // A YT undocumented API for auto suggest search queries
    // ?client=youtube&hl=en&gs_rn=64&gs_ri=youtube&ds=yt&cp=12&gs_id=3h&q=${term}&callback=jusaudio.sbox
    url: GOOGLE_AC_URL,
    adapter: jsonpAdapter,
    params: {
      client: "youtube",
      hl: "en",
      gs_rn: "64",
      gs_ri: "youtube",
      ds: "yt",
      cp: 12,
      gs_id: "3h",
      q: term,
    }
  })
  .then((res: AxiosResponse) => {
    console.log("jsonp results >> ", res);
    if (res.status !== 200) {
      throw Error("Suggest API not 200!");
    }
    return res.data[1].map((item: any[]) => item[0]);
  })
}

/**
 * Commented out for now, may use again later to index YT videos for faster
 * experience
 */
// export const storeYoutubeMappingInDatabase = (
//   track: { title: string; id: number },
//   youtubeURL: string
// ) => {
//   if (track.id && youtubeURL) {
//     const YoutubeMappings = Store.rtdb.ref(`/youtubeMappings/${track.id}`);
//     YoutubeMappings.set({
//       title: track.title,
//       url: youtubeURL
//     });
//   }
// };

// export const getYoutubeMappingFromDatabase = async (trackId: number) => {
//   const YoutubeMappings = Store.rtdb.ref(`/youtubeMappings/${trackId}`);
//   const results = await YoutubeMappings.once("value");
//   return results.val();
// };
