import { fetchMales, sendMessage, fetchAllMales, sendMail } from "./api";
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
  images,
  blacklist,
  dispatchCount,
  senderLaunch
) => {
  let idx = 0;
  let splitMessage = messages.split(" @ ");

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
            sentMales.push(...data.map(male => male.id));
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
              images,
              blacklist,
              dispatchCount,
              senderLaunch
            );
            return;
          }

          if (idx === data.length) {
            idx = 0;
            splitMessage.shift();
            return;
          }

          if (
            sentMales.includes(data[idx].id) ||
            blacklist.includes(data[idx].id)
          ) {
            console.log(`[${data[idx].id}] already sent || blacklist`);
            idx++;
            return;
          }

          if (mode !== "activeDialogs" && mode !== "bmAll") {
            if (bookmarks.includes(data[idx].id)) {
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
            sendMessage(data[idx].id, idFemale, splitMessage[0], resData => {
              console.log(offset, data.length, sentMales, splitMessage[0]);
              dispatchCount(counter++);
            });
          } else if (sendType === "mail") {
            sendMail(
              idFemale,
              data[idx].id,
              splitMessage[0],
              data => dispatchCount(counter++),
              images
            );
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

      const interval = setInterval(() => {
        if (!splitMessage.length) {
          sentMales.push(...data.users.map(male => male.id));
          clearInterval(interval);
          offset = offset - 1;
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
            images,
            blacklist,
            dispatchCount,
            senderLaunch
          );
          return;
        }

        if (idx === data.users.length) {
          idx = 0;
          splitMessage.shift();
          return;
        }

        if (
          sentMales.includes(data.users[idx].id) ||
          blacklist.includes(data.users[idx].id)
        ) {
          console.log(`[${data.users[idx].id}] already sent || blacklist`);
          idx++;
          return;
        }

        if (bookmarks.includes(data.users[idx].id)) {
          console.log("bm mode || bookmark");
          idx++;
          return;
        }

        if (!data.users[idx].id) {
          return;
        }

        if (sendType === "chat") {
          sendMessage(
            data.users[idx].id,
            idFemale,
            splitMessage[0],
            resData => {
              console.log(offset, data.length, sentMales, splitMessage[0]);
              dispatchCount(counter++);
            }
          );
        } else if (sendType === "mail") {
          sendMail(
            idFemale,
            data.users[idx].id,
            splitMessage[0],
            data => dispatchCount(counter++),
            images
          );
        }

        idx++;
      }, mpm);
    });
  }
};

export const loadBookmars = (bmOffset, bookmarks, cursor, dispatchFn) => {
  if (bookmarks.length >= 500) {
    return;
  }

  console.log(bookmarks);

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
          loadBookmars(bmOffset, bookmarks, cursor, dispatchFn);
        }

        bookmarks.push(data[bmIdx].id);
      }
    },
    cursor
  );

  dispatchFn({ type: SET_BOOKMARKS, payload: bookmarks });
};

// export const sendToChat = (
//   filters,
//   idFemale,
//   messages,
//   delay,
//   mpm,
//   offset,
//   mode
// ) => {
//   let count = 0;
//   const malesSent = [];
//   mpm = (60 / mpm) * 1000;
//   delay = delay * 1000;

//   // const messagesLoop = (idMale, idFemale, splMessages) => {
//   //   for (let msgIdx = 0; msgIdx < splMessages.length; msgIdx++) {
//   //     setTimeout(() => {
//   //       sendMessage(idMale, idFemale, splMessages[msgIdx], resData =>
//   //         console.log(resData, splMessages[msgIdx])
//   //       );
//   //     }, (msgIdx + 1) * delay);
//   //   }
//   // };

//   const malesLoop = males => {
//     const data = mode === "all" ? males.users : males;

//     for (let idx = 0; idx < data.length; idx++) {
//       (idx => {
//         if (malesSent.includes(data[idx].id)) {
//           console.log("[!] Already sent.");
//           return;
//         }

//         setTimeout(() => {
//           const splMessages = messages.split(" @ ");

//           if (!!splMessages.length) {
//             return;
//           }

//           if (count === data.length - 1) {
//             if (mode === "online") {
//               offset += data.length;
//             } else if (mode === "all") {
//               offset = offset - 1;
//             }

//             sendToChat(filters, idFemale, messages, delay, mpm, offset, mode);
//           }

//           sendMessage(data[idx].id, idFemale, splMessages[0], resData =>
//             console.log(resData, splMessages[0])
//           );

//           // messagesLoop(data[idx].id, idFemale, splMessages);
//           console.log(data[idx].id, count, offset, data.length);

//           count++;
//           splMessages.shift();
//           malesSent.push(data[idx].id);
//         }, (idx + 1) * mpm);
//       })(idx);
//     }
//   };

// };
