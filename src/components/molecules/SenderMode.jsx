import React, { Component } from "react";
import { Modal } from "../../ui/atoms";
import { PrefItem } from "../../ui/organisms";
import { connect } from "react-redux";

class SenderMode extends Component {
  render() {
    return (
      <Modal w="150px" h="150px" bg="#efefef" prefGroup>
        <input
          type="radio"
          name="senderMode"
          id="all"
          value="all"
          onChange={e => this.props.selectMode(e.target.value)}
        />
        <PrefItem htmlFor="all">
          <i className="fas fa-users" />
        </PrefItem>
        <input
          type="radio"
          name="senderMode"
          id="activeDialogs"
          value="activeDialogs"
          onChange={e => this.props.selectMode(e.target.value)}
        />
        <PrefItem htmlFor="activeDialogs">
          <i className="fas fa-comment-dots" />
        </PrefItem>
        <input
          type="radio"
          name="senderMode"
          id="bmAll"
          value="bmAll"
          onChange={e => this.props.selectMode(e.target.value)}
        />
        <PrefItem htmlFor="bmAll">
          <i className="fas fa-bookmark" />
        </PrefItem>
      </Modal>
    );
  }
}

export default connect()(SenderMode);
