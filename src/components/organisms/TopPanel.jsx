import React, { Component } from "react";
import { connect } from "react-redux";
import { TopBar, NavbarWrapper } from "../../ui/molecules";
import {
  Shade,
  NavbarItem,
  NavbarItemIcon,
  NavbarItemLabel
} from "../../ui/atoms";
import {
  TOGGLE_SENDER_PAGE,
  TOGGLE_PROFILE_PAGE
} from "../../redux/ui/uiActions";
import { Spring } from "react-spring/renderprops";

class TopPanel extends Component {
  constructor(props) {
    super(props);

    this.redirectTo = this.redirectTo.bind(this);
  }

  redirectTo(page) {
    switch (page) {
      case "sender":
        this.props.dispatch({ type: TOGGLE_SENDER_PAGE });
        break;

      case "profile":
        this.props.dispatch({ type: TOGGLE_PROFILE_PAGE });
        break;
      default:
        return;
    }
  }

  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <Spring
          from={{
            position: "absolute",
            top: "-50px"
          }}
          to={{
            position: "absolute",
            top: "0"
          }}
        >
          {props => (
            <TopBar style={props}>
              <NavbarWrapper>
                <NavbarItem onClick={() => this.redirectTo("profile")}>
                  <NavbarItemIcon>
                    <i className="far fa-user" />
                  </NavbarItemIcon>
                  <NavbarItemLabel>Profile</NavbarItemLabel>
                </NavbarItem>
                <NavbarItem onClick={() => this.redirectTo("sender")}>
                  <NavbarItemIcon>
                    <i className="far fa-paper-plane" />
                  </NavbarItemIcon>
                  <NavbarItemLabel>Sender</NavbarItemLabel>
                </NavbarItem>
              </NavbarWrapper>
            </TopBar>
          )}
        </Spring>

        <Shade onClick={this.props.toggleTopPanel} full />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  showTopPanel: state.uiReducer.showTopPanel,
  showSenderPage: state.uiReducer.showSenderPage
});

export default connect(mapStateToProps)(TopPanel);
