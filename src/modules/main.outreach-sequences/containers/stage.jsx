/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import StageItem from '../components/stage-item';
import stagesApi from '../../../api/routes/stages-api';
import * as Showdown from "showdown";


class Stage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      subject: '',
      message: '',
      modalIsOpen: false,
      emailError: '',
      outreachEmail: ''

    };
    this.functions = {
      handleInputChange: this.handleInputChange,
      getStageIcon: this.getStageIcon,
      handleSelection: this.handleSelection,
      closeModal: this.closeModal,
      sendEmailMessage: this.sendEmailMessage,
      trimTitle: this.trimTitle
    };
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSelection = () => {
    switch (this.props.category) {
      case 'waiting':
        this.openMessageMenu();
        break;
      default:
        this.props.setOutreachSequenceDetail(this.props.stage.sequence._id);
        break;
    }
  }

  openMessageMenu = () => {
    this.setState({ modalIsOpen: true });
  }

  sendEmailMessage = () => {
    this.props.changeLoadingMessage("Sending");
    this.closeModal();
    const converter = new Showdown.Converter();

    let stageObj = this.props.stage;
    stageObj.content = {
      subject: this.state.subject,
      message: converter.makeHtml(document.getElementsByTagName("textarea")[0].value)
    };

    stagesApi.actionSend(stageObj)
      .then(response => {
        if (response.status === 200) {
          this.props.mustUpdate(['Waiting', 'Sent']);
        }
        this.props.finishLoading(false, "Message sent succesfully");
      })
      .catch(error => {
        this.props.changeLoadingMessage();
        this.openMessageMenu();
        if (error.response && error.response.status === 402) {
          this.setState({ emailError: error.response.data });
        }
        else if (error.response && error.response.status === 522) {
          this.props.removeSequence(stageObj.sequence._id, (err) => {
            if (err) this.props.finishLoading(true, "There was an error removing the sequence");
            else {
              this.props.finishLoading();
              const swalObj = ["Not validated", `We could not validate the recipient email address is able to recieve messages,
                            the outreach sequence has been removed`, "warning"];
              this.closeModal();
              this.props.removeItem(this.props.index, swalObj);
            }
          });
        }
        else if (error.response && error.response.status === 530) {
          this.setState({ emailError: "An error ocurred with your email account, please go to your account configuration and reconnect your email" });
        }
        else {
          this.setState({ emailError: "An error has occured sending your email, please try again later" });
        }
      });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false, emailError: '' });
  }

  getStageIcon = () => {
    switch (this.props.category) {
      case 'waiting':
        return (<div>
          <i className="fas fa-envelope"></i>
        </div>);
      case 'sent':
        return (<div>
          <i className="fas fa-arrow-alt-circle-right"></i>
        </div>);
      case 'opened':
        return (<div>
          <i className="fas fa-envelope-open"></i>
        </div>);
      case 'replied':
        return (<div>
          <i className="fas fa-arrow-alt-circle-left"></i>
        </div>);
      case 'booked':
        return (<div>
          <i className="fas fa-check-circle"></i>
        </div>);
      case 'postponed':
        return (<div>
          <i className="fas fa-minus-circle"></i>
        </div>);
      default:
        return (<div></div>);
    }
  }

  trimTitle = title => {
    let newtitle = title;
    if (title && title.length > 70)
      newtitle = title.substring(0, 67) + "...";
    return newtitle;
  }

  render = () =>
    <StageItem {...this.props} {...this.functions} {...this.state} />
}

export default Stage;