import React, { Component } from "react";
import { Modal } from "../../ui/atoms";
import { connect } from "react-redux";
import {
  TOGGLE_IGNORE_BM,
  TOGGLE_LIKE,
  TOGGLE_FAVORITE
} from "../../redux/actions";

class ModeSwitches extends Component {
  constructor(props) {
    super(props);

    this.state = {
      online: 0
    };

    this.toggleOnline = this.toggleOnline.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.toggleIgnoreBm = this.toggleIgnoreBm.bind(this);
  }

  toggleIgnoreBm() {
    return this.props.dispatch({ type: TOGGLE_IGNORE_BM });
  }

  toggleLike() {
    return this.props.dispatch({ type: TOGGLE_LIKE });
  }

  toggleFavorite() {
    return this.props.dispatch({ type: TOGGLE_FAVORITE });
  }

  toggleOnline() {
    return async () => {
      await this.setState({ online: !this.state.online });
      this.props.selectMode(this.props.mode, this.state.online);
    };
  }

  render() {
    return (
      <Modal w="150px" h="135px" bg="#efefef" switches>
        <label className="form-switch" onChange={this.toggleOnline()}>
          <span class="fas fa-signal" />
          <input type="checkbox" />
          <i />
        </label>
        <label className="form-switch" onChange={this.toggleLike}>
          <span class="fas fa-heart" />
          <input type="checkbox" />
          <i />
        </label>
        <label className="form-switch" onChange={this.toggleFavorite}>
          <span class="fas fa-star" />
          <input type="checkbox" />
          <i />
        </label>
        <label className="form-switch" onChange={this.toggleIgnoreBm}>
          <span class="fas fa-user-slash" />
          <input type="checkbox" />
          <i />
        </label>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  mode: state.pdReducer.mode
});

export default connect(mapStateToProps)(ModeSwitches);
