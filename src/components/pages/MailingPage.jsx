import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ProfileBackground,
  MainInfoWrapper,
  InfoTitle,
  Loading,
  Modal,
  DisplayMessages,
  TextInfoMailing,
  TextInfoMailingWrap
} from "../../ui/atoms";
import { PrefItem } from "../../ui/organisms";
import {
  LAUNCH_SENDER,
  SET_SENT_COUNT,
  CLEAR_SENT_MALES,
  CLEAR_ATTACHMENTS,
  CLEAR_BOOKMARKS
} from "../../redux/actions";
import { TOGGLE_SENDER_PAGE } from "../../redux/ui/uiActions";
import { Spring } from "react-spring/renderprops";
import Timer from "react-compound-timer";

class MailingPage extends Component {
  constructor(props) {
    super(props);

    this.stopSender = this.stopSender.bind(this);
  }

  stopSender() {
    this.props.dispatch({ type: SET_SENT_COUNT, payload: 0 });

    for (let i = 0; i < 99999; i++) {
      window.clearInterval(i);
    }

    this.props.dispatch({ type: LAUNCH_SENDER, payload: false });
    this.props.dispatch({ type: CLEAR_SENT_MALES });
    this.props.dispatch({ type: CLEAR_ATTACHMENTS });
    this.props.dispatch({ type: CLEAR_BOOKMARKS });
    this.props.dispatch({ type: TOGGLE_SENDER_PAGE });
  }

  render() {
    return (
      <React.Fragment>
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {props => (
            <React.Fragment>
              <ProfileBackground
                img="https://wallpapersite.com/images/pages/pic_w/18199.jpg"
                style={props}
              />
              <DisplayMessages>
                {this.props.message.split(" @ ").map(msg => (
                  <Modal displayMessage w="350px" h="150px" bg="#333333">
                    {msg}
                  </Modal>
                ))}
              </DisplayMessages>
              <MainInfoWrapper style={props}>
                <Loading src="http://www.wallies.com/filebin/images/loading_apple.gif" />
                <InfoTitle>Sent: {this.props.sentCount}</InfoTitle>

                <PrefItem onClick={this.stopSender}>
                  <i className="fas fa-times" />
                </PrefItem>
              </MainInfoWrapper>

              <TextInfoMailingWrap>
                <TextInfoMailing>
                  Bookmarks: {this.props.bookmarks.length}
                </TextInfoMailing>
                <TextInfoMailing>MPM: {this.props.mpm}</TextInfoMailing>
                <TextInfoMailing>
                  Online: {this.props.currentOnline}
                </TextInfoMailing>
                <TextInfoMailing>
                  Time:{" "}
                  <Timer formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`}>
                    <Timer.Hours formatValue={value => `${value}:`} />
                    <Timer.Minutes formatValue={value => `${value}:`}/>
                    <Timer.Seconds formatValue={value => `${value}`} />
                  </Timer>
                </TextInfoMailing>
              </TextInfoMailingWrap>
            </React.Fragment>
          )}
        </Spring>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  sentCount: state.pdReducer.sentCount,
  senderLaunch: state.pdReducer.senderLaunch,
  message: state.pdReducer.message,
  bookmarks: state.pdReducer.bookmarks,
  mpm: state.pdReducer.mpm,
  currentOnline: state.pdReducer.currentOnline
});

export default connect(mapStateToProps)(MailingPage);
