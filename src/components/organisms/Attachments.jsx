import React, { Component } from "react";
import { Modal, AttachIcon, Shade, AttachIconLabel } from "../../ui/atoms";
import { connect } from "react-redux";
import { SELECT_ATTACHMENT } from "../../redux/actions";
import { TabsWrapper, Tab } from "../../ui/molecules";
import { getMediaGallery } from "../../api";

class Stickers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      audio: [],
      images: [],
      video: [],
      showAudio: false,
      showVideo: false,
      showStickers: false,
      showImages: false
    };

    this.addToAttachment = this.addToAttachment.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  renderContent(type) {
    let contentType = {
      showAudio: false,
      showVideo: false,
      showStickers: false,
      showImages: false
    };
    switch (type) {
      case "audio":
        contentType.showAudio = true;
        break;
      case "video":
        contentType.showVideo = true;
        break;
      case "stickers":
        contentType.showStickers = true;
        break;
      case "images":
        contentType.showImages = true;
        break;
    }
    console.log(contentType, type);
    return this.setState(contentType);
  }

  addToAttachment(attach, type) {
    this.props.dispatch({
      type: SELECT_ATTACHMENT,
      payload: { ...attach, attachTo: this.props.selectedMessage, type: type }
    });

    return this.props.toggleAttachments();
  }

  componentDidMount() {
    return getMediaGallery(this.props.modelData.id, data =>
      this.setState({
        audio: data.audio,
        images: data.images,
        video: data.videos
      })
    );
  }

  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <Modal gallery w="600px" h="800px" bg="#efefef">
          <TabsWrapper>
            <Tab onClick={() => this.renderContent("stickers") } blue={this.state.showStickers}>Stickers</Tab>
            <Tab onClick={() => this.renderContent("images")} blue={this.state.showImages}>Photo</Tab>
            <Tab onClick={() => this.renderContent("video")} blue={this.state.showVideo}>Video</Tab>
            <Tab onClick={() => this.renderContent("audio")} blue={this.state.showAudio}>Audio</Tab>
          </TabsWrapper>
          {this.state.showStickers &&
            this.props.stickers.map(category =>
              category.items.map(sticker => (
                <AttachIcon
                  src={sticker.image}
                  onClick={() => this.addToAttachment(sticker, "sticker")}
                />
              ))
            )}
          {this.state.showAudio &&
            this.state.audio.map(audio => (
              <AttachIconLabel>
                {audio.title}
                <AttachIcon
                  lg
                  src={
                    "http://www.myiconfinder.com/uploads/iconsets/256-256-7fcc2234bf1ab89f98287243830b9415-itunes.png"
                  }
                  onClick={() => this.addToAttachment(audio, "audio")}
                />
              </AttachIconLabel>
            ))}
          {this.state.showVideo &&
            this.state.video.map(video => (
              <AttachIcon
                lg
                src={video.url_thumbnail}
                onClick={() => this.addToAttachment(video, "video")}
              />
            ))}
          {this.state.showImages &&
            this.state.images.map(image => (
              <AttachIcon
                lg
                src={image.url_thumbnail}
                onClick={() => this.addToAttachment(image, "photo")}
              />
            ))}
        </Modal>

        <Shade full onClick={this.props.toggleAttachments} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  attachments: state.pdReducer.attachments,
  selectedMessage: state.pdReducer.selectedMessage,
  modelData: state.pdReducer.modelData
});

export default connect(mapStateToProps)(Stickers);
