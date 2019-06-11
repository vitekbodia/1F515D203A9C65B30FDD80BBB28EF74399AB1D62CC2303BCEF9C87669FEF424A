import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ProfileBackground,
  MainInfoWrapper,
  InfoTitle,
  Loading
} from "../../ui/atoms";
import { PrefItem } from "../../ui/organisms";
import { LAUNCH_SENDER, SET_SENT_COUNT } from "../../redux/actions";
import { TOGGLE_SENDER_PAGE } from "../../redux/ui/uiActions";
import { Spring } from "react-spring/renderprops";

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
    this.props.dispatch({ type: TOGGLE_SENDER_PAGE });
  }

  render() {
    return (
      <React.Fragment>
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {props => (
            <React.Fragment>
              <ProfileBackground
                img="https://superg.ru/wp-content/uploads/2018/09/mojave_dynamic-0020.png"
                style={props}
              />
              <MainInfoWrapper style={props}>
                <Loading src="http://www.wallies.com/filebin/images/loading_apple.gif" />
                <InfoTitle>Sent: {this.props.sentCount}</InfoTitle>
                <PrefItem onClick={this.stopSender}>
                  <i className="fas fa-times" />
                </PrefItem>
              </MainInfoWrapper>
            </React.Fragment>
          )}
        </Spring>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  sentCount: state.pdReducer.sentCount,
  senderLaunch: state.pdReducer.senderLaunch
});

export default connect(mapStateToProps)(MailingPage);
