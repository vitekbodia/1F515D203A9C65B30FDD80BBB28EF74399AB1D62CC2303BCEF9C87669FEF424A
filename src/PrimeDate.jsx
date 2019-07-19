import { fetchFemaleData, getBonuses, getLimit } from "./api";
import Iframe from "react-iframe";
import React, { Component } from "react";
import ProfilePage from "./components/pages/ProfilePage";
import SenderPage from "./components/pages/SenderPage";
import MailingPage from "./components/pages/MailingPage";
import { UseGlobalStyle } from "./ui/pages/UseGlobalStyle";
import "./ui/pages/resets.css";
import { connect } from "react-redux";
import { SET_FEMALE_DATA, SET_BONUSES } from "./redux/actions";
import { ArrowButton, TextInfoCredits } from "./ui/atoms";
import TopPanel from "./components/organisms/TopPanel";
import { TOGGLE_TOP_PANEL } from "./redux/ui/uiActions";

class PrimeDate extends Component {
  constructor(props) {
    super(props);

    this.toggleTopPanel = this.toggleTopPanel.bind(this);
    this.countBonuses = this.countBonuses.bind(this);

    this.state = {
      audio50: document.getElementById("audio50"),
      audio10: document.getElementById("audio10"),
      audio5: document.getElementById("audio5"),
      audio2: document.getElementById("audio2")
    };
  }

  toggleTopPanel() {
    getLimit(res => console.log(res))
    return this.props.dispatch({ type: TOGGLE_TOP_PANEL });
  }

  countBonuses(update = false) {
    return getBonuses(bonuses => {
      const current = this.props.currentBonuses;
      console.log(bonuses - current);

      if (update) {
        if (bonuses - current >= 50 && bonuses - current <= 60) {
          this.state.audio50.play();
        }

        if (bonuses - current >= 10 && bonuses - current < 50) {
          this.state.audio10.play();
        }

        if (bonuses - current >= 5 && bonuses - current < 10) {
          this.state.audio5.play();
        }

        if (bonuses - current >= 2 && bonuses - current < 5) {
          this.state.audio2.play();
        }
      }

      this.props.dispatch({ type: SET_BONUSES, payload: bonuses });
    });
  }

  componentDidMount() {
    setInterval(() => this.countBonuses(true), 2000);
    return fetchFemaleData(model =>
      this.props.dispatch({ type: SET_FEMALE_DATA, payload: model })
    );
  }

  render() {
    let modelId = this.props.modelData.id;
    console.log(this.props);
    document.title = `Sender | ${this.props.currentBonuses}`;

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
          width="0"
          height="0"
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
  showMailingPage: state.uiReducer.showMailingPage,
  currentBonuses: state.pdReducer.currentBonuses
});

export default connect(mapStateToProps)(PrimeDate);
