import React, { Component } from "react";
import { Modal, Input, Shade } from "../ui/atoms";
import { ListGroup, ListGroupItem } from "reactstrap";
import { connect } from "react-redux";
import { SET_BLACKLIST, DEL_BLACKLIST } from "../redux/actions";
import { PrefItem, PrefGroup } from "../ui/organisms";

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
        <Modal blacklist w="400px" h="700px" bg="#efefef">
          <PrefGroup blacklist>
            <Input placeholder="Enter male ID" onChange={this.onChangeInput} />
            <PrefItem onClick={this.addToBlacklist(this.state.inputId)}>
              <i class="fas fa-plus" />
            </PrefItem>
          </PrefGroup>
          <ListGroup className="mx-auto">
            {this.props.blacklist.map(maleId => (
              <ListGroupItem onClick={this.removeFromBlacklist(maleId)}>
                {maleId}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Modal>

        <Shade full onClick={this.props.toggleBlacklist} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  blacklist: state.pdReducer.blacklist
});

export default connect(mapStateToProps)(Blacklist);
