import {
  SET_FEMALE_DATA,
  SET_MODE_FILTERS,
  SET_MESSAGE,
  SET_MODE,
  SET_MPM,
  SET_BOOKMARKS,
  SET_SEND_TYPE,
  SELECT_ATTACHMENT,
  REMOVE_ATTACHMENT,
  SET_BLACKLIST,
  DEL_BLACKLIST,
  SET_SENT_COUNT,
  LAUNCH_SENDER,
  SELECT_MESSAGE,
  SET_BONUSES,
  SET_SENT_MALES,
  CLEAR_SENT_MALES,
  SET_CURRENT_ONLINE,
  CLEAR_ATTACHMENTS,
  CLEAR_BOOKMARKS,
  TOGGLE_LIKE,
  TOGGLE_FAVORITE,
  TOGGLE_IGNORE_BM
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
  mpm: 2000,
  bookmarks: [],
  sendType: "chat",
  attachments: [],
  blacklist: [],
  sentCount: 0,
  senderLaunch: false,
  selectedMessage: "",
  currentBonuses: 0,
  sentMales: [],
  currentOnline: 0,
  likeUser: false,
  favUser: false,
  ignoreBm: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_IGNORE_BM:
      return { ...state, ignoreBm: !state.ignoreBm };

    case TOGGLE_FAVORITE:
      return { ...state, favUser: !state.favUser };

    case TOGGLE_LIKE:
      return { ...state, likeUser: !state.likeUser };

    case CLEAR_ATTACHMENTS:
      return { ...state, attachments: [] };

    case CLEAR_BOOKMARKS:
      return { ...state, bookmarks: [] };

    case SET_CURRENT_ONLINE:
      return { ...state, currentOnline: payload };

    case CLEAR_SENT_MALES:
      return { ...state, sentMales: [] };

    case SET_SENT_MALES:
      return { ...state, sentMales: [...state.sentMales, payload] };

    case SET_BONUSES:
      return { ...state, currentBonuses: parseInt(payload) };

    case SELECT_MESSAGE:
      return { ...state, selectedMessage: payload };

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
      return { ...state, mpm: payload};

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

    case SELECT_ATTACHMENT:
      return { ...state, attachments: [...state.attachments, payload] };

    case REMOVE_ATTACHMENT:
      return {
        ...state,
        attachments: state.attachments.filter(img => img.id !== payload)
      };
    default:
      return state;
  }
};
