import React from "react";
import './WebCamView.css';

export class WebCamView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: '',
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyPress);

    this.setupWebcamStream();
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyPress);
  }

  handleKeyPress(event) {
    if (event.code === 'Space') {
      this.setupVideoFilter();
    }
  }

  setupWebcamStream() {
    if (navigator.mediaDevices.getUserMedia) {
      const constraints = {
        audio: false,
        video: true,
      };
      const videoElem = this.getVideoElem();
      videoElem.classList.add('hidden');
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        if (videoElem) {
          videoElem.srcObject = stream;
          videoElem.classList.remove('hidden');
        }
      });
    }
  }

  setupVideoFilter() {
    const videoElem = this.getVideoElem();
    videoElem.classList.add('shadowed');

    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    this.setState({
      currentColor: randomColor,
    });
  }

  getVideoElem() {
    return document.querySelector('.video-view');
  }

  render() {
    return (
      <div className="web-cam-view">
        <div className="video-container">
          <video
            className="video-view"
            playsInline
            autoPlay
          />
          <div style={{ backgroundColor: this.state.currentColor }} className="filter"/>
        </div>
        {
          this.state.currentColor
          ? <span className="current-color">Current color: { this.state.currentColor.toLocaleUpperCase() }</span>
          : null
        }
      </div>
    );
  }
}
