import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ProfileBackground,
  Modal,
  Message,
  ButtonStart,
  GalleryImage,
  TextInfo,
  ModalGroup
} from "../../ui/atoms";
import { SenderPrefs, PrefItem, PrefGroup } from "../../ui/organisms";
import {
  SET_MODE_FILTERS,
  SET_MESSAGE,
  SET_MODE,
  SET_MPM,
  SET_BOOKMARKS,
  SET_SEND_TYPE,
  REMOVE_ATTACHMENT,
  SET_BLACKLIST,
  SET_SENT_COUNT,
  LAUNCH_SENDER,
  SET_SENT_MALES,
  SET_CURRENT_ONLINE,
  TOGGLE_LIKE,
  TOGGLE_FAVORITE,
  TOGGLE_IGNORE_BM
} from "../../redux/actions";
import {
  TOGGLE_MEDIA_GALLERY,
  TOGGLE_BLACKLIST,
  TOGGLE_MAILING_PAGE,
  TOGGLE_ATTACHMENTS
} from "../../redux/ui/uiActions";
import { fetchAllMales, getStickers } from "../../api";
import { sendToChat, loadBookmars } from "../../utils";
import MediaGallery from "../organisms/MediaGallery";
import Blacklist from "../molecules/Blacklist";
import { Spring } from "react-spring/renderprops";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import MessageBlock from "../molecules/MessageBlock";
import Attachments from "../organisms/Attachments";

class SenderPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      online: 0,
      packs: []
    };

    this.selectMode = this.selectMode.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
    this.startSender = this.startSender.bind(this);
    this.onRangeChange = this.onRangeChange.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.toggleMediaGallery = this.toggleMediaGallery.bind(this);
    this.toggleBlacklist = this.toggleBlacklist.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.changeCount = this.changeCount.bind(this);
    this.toggleOnline = this.toggleOnline.bind(this);
    this.toggleAttachments = this.toggleAttachments.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.toggleIgnoreBm = this.toggleIgnoreBm.bind(this);
  }

  selectMode(value) {
    let mode;
    let options = {
      bookmarked: 0,
      nomessages: 0,
      unanswered: 0,
      onliners: 0,
      id_dialog: 0
    };

    switch (value) {
      case "online":
        options = { ...options, onliners: 1 };
        mode = "online";
        break;
      case "all":
        mode = "all";
        break;
      case "bmOnline":
        options = { ...options, bookmarked: 1, onliners: 1 };
        mode = "bmOnline";
        break;
      case "bmAll":
        options = { ...options, bookmarked: 1 };
        mode = "bmAll";
        break;
      case "activeDialogs":
        options = { ...options, id_dialog: 1 };
        mode = "activeDialogs";
        break;
    }

    if (!!this.state.online) {
      options = { ...options, onliners: 1 };
    }

    this.props.dispatch({ type: SET_MODE_FILTERS, payload: options });
    this.props.dispatch({ type: SET_MODE, payload: mode });
  }

  toggleAttachments() {
    return this.props.dispatch({ type: TOGGLE_ATTACHMENTS });
  }

  toggleIgnoreBm() {
    return this.props.dispatch({ type: TOGGLE_IGNORE_BM });
  }

  toggleOnline() {
    return async () => {
      await this.setState({ online: !this.state.online });
      this.selectMode(this.props.mode);
    };
  }

  toggleLike() {
    return this.props.dispatch({ type: TOGGLE_LIKE });
  }

  toggleFavorite() {
    return this.props.dispatch({ type: TOGGLE_FAVORITE });
  }

  onMessageChange(evt) {
    const { value } = evt.target;
    return this.props.dispatch({ type: SET_MESSAGE, payload: value });
  }

  onRangeChange(value) {
    return this.props.dispatch({ type: SET_MPM, payload: parseInt(value) });
  }

  startSender() {
    this.props.dispatch({ type: TOGGLE_MAILING_PAGE });
    this.props.dispatch({ type: LAUNCH_SENDER, payload: true });

    const dispatchSentMales = maleId =>
      this.props.dispatch({ type: SET_SENT_MALES, payload: maleId });

    fetchAllMales(0, data => {
      this.props.dispatch({ type: SET_CURRENT_ONLINE, payload: data.count });
      sendToChat(
        this.props.modeFilters,
        this.props.modelData.id,
        this.props.message,
        0,
        this.props.mode,
        this.props.bookmarks,
        "",
        Math.round(60 / this.props.mpm) * 1000,
        this.props.sendType,
        this.props.attachments,
        this.props.blacklist,
        this.changeCount,
        true,
        this.props.likeUser,
        this.props.favUser,
        this.props.ignoreBm
      );
    });
  }

  changeCount(counter) {
    return this.props.dispatch({ type: SET_SENT_COUNT, payload: counter });
  }

  changeMode(evt) {
    const { value } = evt.target;
    this.props.dispatch({ type: SET_SEND_TYPE, payload: value });
  }

  toggleMediaGallery() {
    return this.props.dispatch({ type: TOGGLE_MEDIA_GALLERY });
  }

  toggleBlacklist() {
    return this.props.dispatch({ type: TOGGLE_BLACKLIST });
  }

  removeImage(imgId) {
    return this.props.dispatch({ type: REMOVE_ATTACHMENT, payload: imgId });
  }

  componentDidMount() {
    loadBookmars(0, this.props.bookmarks, "", this.props.modelData.id, this.props.dispatch);

    const loadedBlacklist = localStorage.getItem("blacklist");

    if (loadedBlacklist) {
      const splittedBlacklist = new Set(loadedBlacklist.split(","));
      console.log(splittedBlacklist);
      for (let idx of splittedBlacklist) {
        this.props.dispatch({
          type: SET_BLACKLIST,
          payload: idx
        });
      }
    }

    getStickers(packs => this.setState({ packs: packs }));
  }

  render() {
    console.log(this.props, this.state);
    const messages = this.props.message.split(" @ ").filter(x => !!x);
    const mpm = this.props.mpm;
    return (
      <React.Fragment>
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {props => (
            <React.Fragment>
              <ProfileBackground
                img="https://cdn.wccftech.com/wp-content/uploads/2017/05/iOS-10.3.3-Wallpaper-1-740x740.jpg"
                style={props}
              />
              <SenderPrefs style={props}>
                <PrefGroup>
                  <Modal w="150px" h="75px" bg="#efefef" prefGroup>
                    <input
                      type="radio"
                      name="sendType"
                      id="chat"
                      value="chat"
                      onChange={this.changeMode}
                    />
                    <PrefItem htmlFor="chat">
                      <i className="fas fa-comments" />
                    </PrefItem>
                    <input
                      type="radio"
                      name="sendType"
                      id="mail"
                      value="mail"
                      onChange={this.changeMode}
                    />
                    <PrefItem htmlFor="mail">
                      <i className="fas fa-envelope" />
                    </PrefItem>
                  </Modal>

                  <Modal w="150px" h="150px" bg="#efefef" prefGroup>
                    <input
                      type="radio"
                      name="senderMode"
                      id="online"
                      value="online"
                      // onChange={e => this.selectMode(e.target.value)}
                    />
                    <PrefItem >
                      <i className="fas fa-user" />
                    </PrefItem>
                    <input
                      type="radio"
                      name="senderMode"
                      id="all"
                      value="all"
                      onChange={e => this.selectMode(e.target.value)}
                    />
                    <PrefItem htmlFor="all">
                      <i className="fas fa-users" />
                    </PrefItem>
                    <input
                      type="radio"
                      name="senderMode"
                      id="activeDialogs"
                      value="activeDialogs"
                      onChange={e => this.selectMode(e.target.value)}
                    />
                    <PrefItem htmlFor="activeDialogs">
                      <i className="fas fa-comment-dots" />
                    </PrefItem>
                    <input
                      type="radio"
                      name="senderMode"
                      id="bmAll"
                      value="bmAll"
                      onChange={e => this.selectMode(e.target.value)}
                    />
                    <PrefItem htmlFor="bmAll">
                      <i className="fas fa-bookmark" />
                    </PrefItem>
                  </Modal>

                  <Modal w="150px" h="135px" bg="#efefef" switches>
                    <label
                      className="form-switch"
                      onChange={this.toggleOnline()}
                    >
                      <span class="fas fa-signal" />
                      <input type="checkbox" />
                      <i />
                    </label>
                    <label className="form-switch" onChange={this.toggleLike}>
                      <span class="fas fa-heart" />
                      <input type="checkbox" />
                      <i />
                    </label>
                    <label
                      className="form-switch"
                      onChange={this.toggleFavorite}
                    >
                      <span class="fas fa-star" />
                      <input type="checkbox" />
                      <i />
                    </label>
                    <label
                      className="form-switch"
                      onChange={this.toggleIgnoreBm}
                    >
                      <span class="fas fa-user-slash" />
                      <input type="checkbox" />
                      <i />
                    </label>
                  </Modal>

                  <Modal w="150px" h="50px" bg="#efefef" prefGroup>
                    <Slider
                      min={5}
                      max={60}
                      step={5}
                      value={mpm}
                      tooltip={true}
                      onChange={this.onRangeChange}
                    />
                  </Modal>
                </PrefGroup>

                <PrefGroup msgAttach>
                  <Modal w="600px" h="300px" bg="#efefef" message>
                    <TextInfo>{this.props.message.length}</TextInfo>

                    <Message
                      style={{ resize: "none" }}
                      placeholder={`Type your ${
                        this.props.sendType === "chat" ? "message" : "mail"
                      } here...`}
                      onChange={this.onMessageChange}
                    />

                    {this.props.sendType === "mail" && (
                      <PrefItem inset onClick={this.toggleMediaGallery}>
                        <i className="fas fa-images" />
                      </PrefItem>
                    )}
                  </Modal>

                  {!!messages.length &&
                    this.props.sendType === "chat" &&
                    (messages[0] !== "" && (
                      <ModalGroup>
                        {messages.map((msg, idx) => (
                          <MessageBlock
                            msg={msg}
                            clickAdd={this.toggleAttachments}
                          />
                        ))}
                      </ModalGroup>
                    ))}

                  {!!this.props.attachments.length &&
                    this.props.sendType === "mail" && (
                      <Modal attachments h="125px" w="auto" bg="#efefef">
                        {this.props.attachments.map(img => (
                          <GalleryImage
                            img={img.url_thumbnail}
                            onClick={() => this.removeImage(img.id)}
                          />
                        ))}
                      </Modal>
                    )}
                </PrefGroup>

                {this.props.showMediaGallery && (
                  <MediaGallery
                    idFemale={this.props.modelData.id}
                    toggleGallery={this.toggleMediaGallery}
                  />
                )}
                <PrefGroup rightPanel>
                  <ButtonStart onClick={this.startSender}>
                    <i className="far fa-arrow-alt-circle-right" />
                  </ButtonStart>
                  <Modal w="58px" h="58px" bg="#efefef">
                    <PrefItem onClick={this.toggleBlacklist}>
                      <i className="fas fa-ban" />
                    </PrefItem>
                  </Modal>
                </PrefGroup>

                {!!this.props.showBlacklist && (
                  <Blacklist toggleBlacklist={this.toggleBlacklist} />
                )}

                {this.props.showAttachments && (
                  <Attachments
                    stickers={this.state.packs}
                    toggleAttachments={this.toggleAttachments}
                  />
                )}
              </SenderPrefs>
            </React.Fragment>
          )}
        </Spring>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  modeFilters: state.pdReducer.modeFilters,
  message: state.pdReducer.message,
  modelData: state.pdReducer.modelData,
  mode: state.pdReducer.mode,
  mpm: state.pdReducer.mpm,
  delay: state.pdReducer.delay,
  bookmarks: state.pdReducer.bookmarks,
  sendType: state.pdReducer.sendType,
  showMediaGallery: state.uiReducer.showMediaGallery,
  showBlacklist: state.uiReducer.showBlacklist,
  attachments: state.pdReducer.attachments,
  blacklist: state.pdReducer.blacklist,
  sentCount: state.pdReducer.sentCount,
  senderLaunch: state.pdReducer.senderLaunch,
  showAttachments: state.uiReducer.showAttachments,
  selectedMessage: state.pdReducer.selectedMessage,
  sentMales: state.pdReducer.sentMales,
  likeUser: state.pdReducer.likeUser,
  favUser: state.pdReducer.favUser,
  ignoreBm: state.pdReducer.ignoreBm
});

export default connect(mapStateToProps)(SenderPage);
