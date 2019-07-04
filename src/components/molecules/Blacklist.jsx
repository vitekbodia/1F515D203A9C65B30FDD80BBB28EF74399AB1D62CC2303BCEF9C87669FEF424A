import React, { Component } from "react";
import { Modal, Input, Shade } from "../../ui/atoms";
import { ListGroup, ListGroupItem } from "reactstrap";
import { connect } from "react-redux";
import { SET_BLACKLIST, DEL_BLACKLIST } from "../../redux/actions";
import { PrefItem, PrefGroup } from "../../ui/organisms";
import { Spring } from "react-spring/renderprops";

class Blacklist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputId: 0
    };

    this.onChangeInput = this.onChangeInput.bind(this);
    this.addToBlacklist = this.addToBlacklist.bind(this);
    this.removeFromBlacklist = this.removeFromBlacklist.bind(this);
  }

  onChangeInput(evt) {
    const { value } = evt.target;
    return this.setState({ inputId: value });
  }

  addToBlacklist(id) {
    return async () => {
      console.log(id);
      await this.props.dispatch({ type: SET_BLACKLIST, payload: id });
      return localStorage.setItem("blacklist", this.props.blacklist);
    };
  }

  removeFromBlacklist(id) {
    return async () => {
      await this.props.dispatch({ type: DEL_BLACKLIST, payload: id });
      return localStorage.setItem("blacklist", this.props.blacklist);
    };
  }

  componentWillUnmount() {}

  render() {
    return (
      <React.Fragment>
        <Spring from={{ top: "-500px" }} to={{ top: "90%" }}>
          {props => (
            <Modal blacklist w="400px" h="700px" bg="#efefef" style={props}>
              <PrefGroup blacklist>
                <Input
                  placeholder="Enter male ID"
                  onChange={this.onChangeInput}
                />
                <PrefItem onClick={this.addToBlacklist(this.state.inputId)}>
                  <i className="fas fa-plus" />
                </PrefItem>
              </PrefGroup>
              <ListGroup className="mx-auto h-50 w-75 text-center overflow-y">
                {this.props.blacklist.map(maleId => (
                  <ListGroupItem onClick={this.removeFromBlacklist(maleId)}>
                    {maleId}
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Modal>
          )}
        </Spring>

        <Shade full onClick={this.props.toggleBlacklist} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  blacklist: state.pdReducer.blacklist,
  showBlacklist: state.uiReducer.showBlacklist
});

export default connect(mapStateToProps)(Blacklist);
