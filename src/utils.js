import {
  fetchMales,
  sendMessage,
  fetchAllMales,
  sendMail,
  sendSticker,
  likeMale,
  addToFavorites,
  sendAudio,
  sendAttach
} from "./api";
import { SET_BOOKMARKS } from "./redux/actions";

let sentMales = [];
let counter = 0;

export const sendToChat = (
  filters,
  idFemale,
  messages,
  offset,
  mode,
  bookmarks,
  cursor,
  mpm,
  sendType,
  attachments,
  blacklist,
  dispatchCount,
  senderLaunch,
  likeUser,
  favUser,
  ignoreBm
) => {
  let idx = 0;
  let splitMessage = messages.split(" @ ");

  const changeLimit = limitData => {
    limitData = {
      limit: limitData['x-rate-limit-limit'],
      remaining: limitData['x-rate-limit-remaining'],
      reset: limitData['x-rate-limit-reset']
  }
  
}

  if (mode !== "all") {
    console.log("mode: online");
    fetchMales(
      filters,
      offset,
      data => {
        let cursor = data.cursor;
        data = data.profiles.filter(x => x.id !== idFemale);

        const interval = setInterval(() => {
          if (!splitMessage.length) {
            sentMales.push(...data.map(male => "" + male.id));
            clearInterval(interval);
            offset += data.length;
            sendToChat(
              filters,
              idFemale,
              messages,
              offset,
              mode,
              bookmarks,
              cursor,
              mpm,
              sendType,
              attachments,
              blacklist,
              dispatchCount,
              senderLaunch,
              likeUser,
              favUser,
              ignoreBm
            );
            return;
          }

          if (idx === data.length) {
            idx = 0;
            splitMessage.shift();
            return;
          }

          if (
            sentMales.includes("" + data[idx].id) ||
            blacklist.includes(data[idx].id)
          ) {
            console.log(`[${data[idx].id}] already sent || blacklist`);
            idx++;
            return;
          }

          if (mode !== "bmAll" && ignoreBm === true) {
            if (bookmarks.includes("" + data[idx].id)) {
              console.log("bm mode || bookmark");
              console.log(data[idx].id);

              idx++;
              return;
            }
          }

          if (!data[idx].id) {
            return;
          }

          if (sendType === "chat") {
            const attach = attachments.find(
              el => el.attachTo === splitMessage[0]
            );
            if (!!attachments.length && attach) {
              sendMessage(data[idx].id, idFemale, splitMessage[0], resData => {
                console.log(offset, data.length, sentMales, splitMessage[0]);
                dispatchCount(counter++);
              });

              if (attach.type === "sticker") {
                sendSticker(data[idx].id, idFemale, attach);
              } else {
                sendAttach(data[idx].id, idFemale, attach.id, attach.type);
              }
            } else {
              sendMessage(data[idx].id, idFemale, splitMessage[0], resData => {
                console.log(offset, data.length, sentMales, splitMessage[0]);
                dispatchCount(counter++);
              });
            }
          } else if (sendType === "mail") {
            sendMail(
              idFemale,
              data[idx].id,
              splitMessage[0],
              data => dispatchCount(counter++),
              attachments
            );
          }

          if (likeUser) {
            likeMale(data[idx].id, idFemale);
          }

          if (favUser) {
            addToFavorites(data[idx].id, idFemale);
          }

          idx++;
        }, mpm);
      },
      cursor
    );
  } else {
    fetchAllMales(offset, data => {
      console.log("mode: all");
      let idx = 0;
      let splitMessage = messages.split(" @ ");
      data.users = data.users.filter(x => !!x.is_online)

      const interval = setInterval(() => {
        if (!splitMessage.length) {
          sentMales.push(...data.users.map(male => "" + male.id));
          clearInterval(interval);
          offset = offset + 1;
          sendToChat(
            filters,
            idFemale,
            messages,
            offset,
            mode,
            bookmarks,
            cursor,
            mpm,
            sendType,
            attachments,
            blacklist,
            dispatchCount,
            senderLaunch,
            likeUser,
            favUser,
            ignoreBm
          );
          return;
        }

        if (idx === data.users.length) {
          idx = 0;
          splitMessage.shift();
          return;
        }

        if (
          sentMales.includes("" + data.users[idx].id) ||
          blacklist.includes(data.users[idx].id)
        ) {
          console.log(`[${data.users[idx].id}] already sent || blacklist`);
          idx++;
          return;
        }

        if (ignoreBm) {
          console.log("ignore bm on");
          if (bookmarks.includes("" + data.users[idx].id)) {
            console.log("bm mode || bookmark");
            idx++;
            return;
          }
        }

        if (!data.users[idx].id) {
          return;
        }

        if (sendType === "chat") {
          const attach = attachments.find(
            el => el.attachTo === splitMessage[0]
          );
          if (!!attachments.length && attach) {
            sendMessage(
              data.users[idx].id,
              idFemale,
              splitMessage[0],
              resData => {
                console.log(offset, data.length, sentMales, splitMessage[0]);
                dispatchCount(counter++);
              }
            );

            if (attach.type === "sticker") {
              sendSticker(data.users[idx].id, idFemale, attach);
            } else {
              sendAttach(data.users[idx].id, idFemale, attach.id, attach.type);
            }
          } else {
            sendMessage(
              data.users[idx].id,
              idFemale,
              splitMessage[0],
              resData => {
                console.log(offset, data.length, sentMales, splitMessage[0]);
                dispatchCount(counter++);
              }
            );
          }
        } else if (sendType === "mail") {
          sendMail(
            idFemale,
            data.users[idx].id,
            splitMessage[0],
            data => dispatchCount(counter++),
            attachments
          );
        }

        if (likeUser) {
          likeMale(data.users[idx].id, idFemale);
        }

        if (favUser) {
          addToFavorites(data.users[idx].id, idFemale);
        }

        idx++;
      }, mpm);
    });
  }
};

export const loadBookmars = (bmOffset, bookmarks, cursor, modelId, dispatchFn) => {
  if (bookmarks.length >= 1000) {
    return;
  }

  fetchMales(
    {
      bookmarked: 1,
      nomessages: 0,
      unanswered: 0,
      onliners: 0
    },
    bmOffset,
    data => {
      let cursor = data.cursor;
      data = data.profiles;
      for (let bmIdx = 0; bmIdx < data.length; bmIdx++) {
        if (bmIdx === data.length - 1) {
          bmOffset += data.length;
          loadBookmars(bmOffset, bookmarks, cursor, modelId, dispatchFn);
        }

        
        bookmarks.push("" + data[bmIdx].id);

        console.log('bookmarks :', bookmarks, modelId);
      }
    },
    cursor
  );

  dispatchFn({ type: SET_BOOKMARKS, payload: bookmarks });
};
