const axios = require("axios");

const axs = axios.create({
  baseURL: "https://api.prime.date",
  mode: "cors",
  withCredentials: true,
  referrer: "https://prime.date/",
  "X-Remote-IP": "127.0.0.1",
  referrerPolicy: "no-referrer-when-downgrade",
  headers: { accept: "application/json", "content-type": "application/json" }
});

export const fetchMales = (options, offset, cb, cursor = "") => {
  const data = {
    criteria: {
      filters: {
        bookmarked: options.bookmarked,
        nomessages: options.nomessages,
        unanswered: options.unanswered,
        onliners: options.onliners,
        id_female: null,
        id_dialog: options.id_dialog
      }
    },
    limit: 15,
    offset: offset,
    cursor: cursor,
    type: "operatorchat"
  };

  axs({
    url: "/connections/get",
    data: data,
    method: "POST"
  }).then(res => cb(res.data.data));
};

export const fetchAllMales = (page, cb) => {
  const data = {
    filters: {
      ageFrom: null,
      ageTo: null,
      countries: [],
      withPhoto: false,
      moreChildren: false,
      lastOnline: 2
    },
    limit: 25,
    page: page
  };

  axs({
    url: "/account/search",
    data: data,
    method: "POST"
  }).then(data => cb(data.data.data));
};

export const fetchFemaleData = cb =>
  axs({ url: "/operator/find-females", method: "POST" }).then(data =>
    cb(data.data.data.list[0])
  );

export const sendMessage = (idMale, idFemale, message, cb) => {
  const data = {
    idUserTo: idMale,
    idMale: idMale,
    idFemale: idFemale,
    content: { message: message }
  };
  axs({
    url: `/operator/add-activity/message/${idMale}`,
    data: data,
    method: "POST"
  }).then(res => cb(res.data));
};

export const sendMail = (
  idFemale,
  idMale,
  message,
  cb,
  images = [],
  videos = []
) => {
  const data = {
    email: { content: message, from: idFemale, to: idMale, title: "" },
    images: images,
    videos: videos
  };
  axs({ url: "/correspondence/send", data: data, method: "POST" }).then(res =>
    cb(res.data)
  );
};

export const getMediaGallery = (idFemale, cb) => {
  axs({
    url: `/upload/get-mail-media-gallery?idUser=${idFemale}`,
    method: "GET"
  }).then(res => cb(res.data.data));
};
