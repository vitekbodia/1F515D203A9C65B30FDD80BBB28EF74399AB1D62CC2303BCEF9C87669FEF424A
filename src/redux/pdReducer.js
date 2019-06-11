import {
  SET_FEMALE_DATA,
  SET_MODE_FILTERS,
  SET_MESSAGE,
  SET_MODE,
  SET_MPM,
  SET_BOOKMARKS,
  SET_SEND_TYPE,
  SELECT_IMAGE,
  REMOVE_IMAGE,
  SET_BLACKLIST,
  DEL_BLACKLIST,
  SET_SENT_COUNT,
  LAUNCH_SENDER
} from "./actions";

const initialState = {
  modelData: 0,
  modeFilters: {
    bookmarked: 0,
    nomessages: 0,
    unanswered: 0,
    onliners: 1
  },
  mode: "online",
  message: "",
  mpm: 20,
  bookmarks: [],
  sendType: "chat",
  attachments: [],
  blacklist: [],
  sentCount: 0,
  senderLaunch: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_SENT_COUNT:
      return { ...state, sentCount: payload };

    case LAUNCH_SENDER:
      return { ...state, senderLaunch: payload };

    case SET_FEMALE_DATA:
      return { ...state, modelData: payload };

    case SET_MODE_FILTERS:
      return { ...state, modeFilters: payload };

    case SET_MESSAGE:
      return { ...state, message: payload };

    case SET_MODE:
      return { ...state, mode: payload };

    case SET_MPM:
      return { ...state, mpm: payload };

    case SET_BOOKMARKS:
      return { ...state, bookmarks: payload };

    case SET_SEND_TYPE:
      return { ...state, sendType: payload };

    case SET_BLACKLIST:
      return { ...state, blacklist: [...state.blacklist, parseInt(payload)] };

    case DEL_BLACKLIST:
      return {
        ...state,
        blacklist: state.blacklist.filter(blId => blId !== payload)
      };

    case SELECT_IMAGE:
      return { ...state, attachments: [...state.attachments, payload] };

    case REMOVE_IMAGE:
      return {
        ...state,
        attachments: state.attachments.filter(img => img.id != payload)
      };
    default:
      return state;
  }
};
