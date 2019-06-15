import { fetchFemaleData } from "./api";
import Iframe from "react-iframe";
import React, { Component } from "react";
import ProfilePage from "./components/pages/ProfilePage";
import SenderPage from "./components/pages/SenderPage";
import MailingPage from "./components/pages/MailingPage";
import { UseGlobalStyle } from "./ui/pages/UseGlobalStyle";
import "./ui/pages/resets.css";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { SET_FEMALE_DATA } from "./redux/actions";
import { ArrowButton, TextInfoCredits } from "./ui/atoms";
import TopPanel from "./components/organisms/TopPanel";
import { TOGGLE_TOP_PANEL } from "./redux/ui/uiActions";

class PrimeDate extends Component {
  constructor(props) {
    super(props);

    this.toggleTopPanel = this.toggleTopPanel.bind(this);
  }

  toggleTopPanel() {
    return this.props.dispatch({ type: TOGGLE_TOP_PANEL });
  }

  componentDidMount() {
    return fetchFemaleData(model =>
      this.props.dispatch({ type: SET_FEMALE_DATA, payload: model })
    );
  }

  render() {
    let modelId = this.props.modelData.id;
    console.log(this.props);

    return (
      <React.Fragment>
        <UseGlobalStyle />

        {this.props.showTopPanel ? (
          <TopPanel toggleTopPanel={this.toggleTopPanel} />
        ) : (
          <ArrowButton onClick={this.toggleTopPanel}>
            <i className="fas fa-chevron-down" />
          </ArrowButton>
        )}

        <Iframe
          key="pdIframe"
          url="https://beta.prime.date/#chat"
          id="pdFrame"
          width="100vw"
          height="100vh"
          display={!!modelId ? "none" : "relative"}
        />

        {this.props.showProfilePage && <ProfilePage />}
        {this.props.showSenderPage && <SenderPage />}
        {this.props.showMailingPage && <MailingPage />}

        <TextInfoCredits href="https://t.me/bodiavaleur" target="_blank">
          by Bodyan with <i className="fas fa-heart" />
        </TextInfoCredits>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  modelData: state.pdReducer.modelData,
  showTopPanel: state.uiReducer.showTopPanel,
  modeFilters: state.pdReducer.modeFilters,
  message: state.pdReducer.message,
  showProfilePage: state.uiReducer.showProfilePage,
  showSenderPage: state.uiReducer.showSenderPage,
  showMailingPage: state.uiReducer.showMailingPage
});

export default connect(mapStateToProps)(PrimeDate);
