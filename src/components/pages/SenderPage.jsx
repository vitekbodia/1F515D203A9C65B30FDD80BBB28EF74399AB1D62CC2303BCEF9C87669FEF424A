import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ProfileBackground,
  Modal,
  Message,
  ButtonStart,
  Input,
  RangeInput,
  RangeInputLabel,
  GalleryImage,
  TextInfo
} from "../../ui/atoms";
import { SenderPrefs, PrefItem, PrefGroup } from "../../ui/organisms";
import {
  SET_MODE_FILTERS,
  SET_MESSAGE,
  SET_MODE,
  SET_MPM,
  SET_BOOKMARKS,
  SET_SEND_TYPE,
  REMOVE_IMAGE,
  SET_BLACKLIST,
  SET_SENT_COUNT,
  LAUNCH_SENDER
} from "../../redux/actions";
import {
  TOGGLE_MEDIA_GALLERY,
  TOGGLE_BLACKLIST,
  TOGGLE_MAILING_PAGE
} from "../../redux/ui/uiActions";
import { fetchAllMales } from "../../api";
import { sendToChat, loadBookmars } from "../../utils";
import MediaGallery from "../organisms/MediaGallery";
import Blacklist from "../../molecules/Blacklist";
import { Spring } from "react-spring/renderprops";

class SenderPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      online: 0
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

  toggleOnline() {
    return async () => {
      await this.setState({ online: !this.state.online });
      this.selectMode(this.props.mode);
    };
  }

  onMessageChange(evt) {
    const { value } = evt.target;
    return this.props.dispatch({ type: SET_MESSAGE, payload: value });
  }

  onRangeChange(evt) {
    const { value } = evt.target;
    return this.props.dispatch({ type: SET_MPM, payload: parseInt(value) });
  }

  startSender() {
    this.props.dispatch({ type: TOGGLE_MAILING_PAGE });
    this.props.dispatch({ type: LAUNCH_SENDER, payload: true });
    fetchAllMales(0, data =>
      sendToChat(
        this.props.modeFilters,
        this.props.modelData.id,
        this.props.message,
        this.props.mode === "all" ? Math.round(data.count / 25) : 0,
        this.props.mode,
        this.props.bookmarks,
        "",
        Math.round(60 / this.props.mpm) * 1000,
        this.props.sendType,
        this.props.attachments,
        this.props.blacklist,
        this.changeCount,
        true
      )
    );
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
    return this.props.dispatch({ type: REMOVE_IMAGE, payload: imgId });
  }

  componentDidMount() {
    loadBookmars(0, this.props.bookmarks, "", this.props.dispatch);

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
  }

  render() {
    console.log(this.props, this.state);
    return (
      <React.Fragment>
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {props => (
            <React.Fragment>
              <ProfileBackground
                img="https://images.wallpaperscraft.com/image/mac_os_x_apple_mavericks_waves_wave_94219_1280x800.jpg"
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

                  <Modal w="150px" h="190px" bg="#efefef" prefGroup>
                    <input
                      type="radio"
                      name="senderMode"
                      id="online"
                      value="online"
                      onChange={e => this.selectMode(e.target.value)}
                    />
                    <PrefItem htmlFor="online">
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
                    <i className="fas fa-bookmark"></i>
                    </PrefItem>
                    <label
                      className="form-switch"
                      onChange={this.toggleOnline()}
                    >
                      <input type="checkbox" />
                      <i />
                    </label>
                  </Modal>

                  <Modal w="150px" h="50px" bg="#efefef" prefGroup>
                    <RangeInputLabel>
                      <RangeInput
                        type="range"
                        min={10}
                        max={120}
                        step={10}
                        value={this.props.mpm}
                        onChange={this.onRangeChange}
                      />
                      MPM: {this.props.mpm}
                    </RangeInputLabel>
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

                  {!!this.props.attachments.length && (
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
                  <Modal w="60px" h="60px" bg="#efefef">
                    <PrefItem onClick={this.toggleBlacklist}>
                      <i className="fas fa-ban" />
                    </PrefItem>
                  </Modal>
                </PrefGroup>

                {!!this.props.showBlacklist && (
                  <Blacklist toggleBlacklist={this.toggleBlacklist} />
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
  senderLaunch: state.pdReducer.senderLaunch
});

export default connect(mapStateToProps)(SenderPage);
