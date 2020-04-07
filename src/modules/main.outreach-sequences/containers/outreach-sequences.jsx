/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OutreachSequencesPanel from '../components/outreach-sequences-panel';
import emailAccountsApi from '../../../api/routes/email-accounts-api';
import outreachSequencesApi from '../../../api/routes/outreach-sequences-api';
import stagesApi from '../../../api/routes/stages-api';
import swalApi from '../../../api/util/swal-api';
import update from 'immutability-helper';
import DragScroll from '../../../common/general/util/drag-scroll';
import Editor from '../../../common/general/components/markdown-editor';
import async from 'async';

import ReactMarkdown from 'react-markdown';

class OutreachSequences extends Component {
  constructor (props) {
    super(props);
    this.state = {
      primaryAccount: null,
      outreachSequences: [],

      updateWaiting: true,
      updateSent: true,
      updateOpened: true,
      updateReplied: true,
      updateBooked: true,
      updatePostponed: true,

      outreachSequenceDetail: null,

      emailReportOpen: false,
      emailDescription: '',
      emailReport: null
    };

    this.functions = {
      handleInputChange: this.handleInputChange,
      loadOutreachSequences: this.loadOutreachSequences,
      mustUpdate: this.mustUpdate,
      finishedUpdate: this.finishedUpdate,
      setOutreachSequenceDetail: this.setOutreachSequenceDetail,
      goBack: this.goBack,
      bookSequence: this.bookSequence,
      postponeSequence: this.postponeSequence,
      restoreSequence: this.restoreSequence,
      removeSequence: this.removeSequence,
      openReportSequenceEmail: this.openReportSequenceEmail,
      closeReportSequenceEmail: this.closeReportSequenceEmail,
      reportSequenceEmail: this.reportSequenceEmail,

      addNote: this.addNote,
      editNote: this.editNote,
      removeNote: this.removeNote,

      sampleEdit: this.sampleEdit,
      sampleDelete: this.sampleDelete
    };
  }

  componentDidMount = () => {
    let outreachPanel = new DragScroll();
    outreachPanel.init({
      id: 'outreach-panel',
      draggable: true,
      wait: false
    });
    this.props.changeLoadingMessage("Loading");
    emailAccountsApi.getPrimary()
      .then(response => {
        if (response.data) {
          this.setState({ primaryAccount: response.data });
          this.loadOutreachSequences();
        }
        else {
          this.setState({ primaryAccount: 'none' });
        }
        this.props.changeLoadingMessage();

      })
      .catch(() => {
        this.setState({ primaryAccount: 'none' });
        this.props.finishLoading(true, "An error has occured loading your email data");
      });
  }

  loadOutreachSequences = () => {
    outreachSequencesApi.getAll()
      .then(response => {
        this.setState({ outreachSequences: response.data });
      })
      .catch(() => {
        this.props.finishLoading(true, "An error has occured loading your outreach sequences");
      });
  }

  mustUpdate = categoriesArray => {
    let updateObj = {};
    categoriesArray.forEach(element => {
      updateObj["update" + element] = true;
    });
    this.setState({ ...updateObj });
  }

  finishedUpdate = (category, callback) => {
    this.setState({
      ["update" + category]: false
    }, callback);
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  setOutreachSequenceDetail = id => {
    this.props.changeLoadingMessage("Loading");
    async.parallel([
      callback => this.getOutreachSequence(id, callback),
      callback => this.getReportEmail(id, callback)
    ], (err) => {
      if (err) this.props.finishLoading(true, err);
      else this.props.changeLoadingMessage();
    });


  }

  getOutreachSequence = (id, callback) => {
    outreachSequencesApi.getById(id, 'Y')
      .then(response => {
        console.log(response.data);

        this.setState({ outreachSequenceDetail: response.data });
        callback();
      })
      .catch(() => {
        callback("An error occured while loading the sequence")
      });
  }

  getReportEmail = (id, callback) => {
    outreachSequencesApi.getEmailReport(id)
      .then(response => {
        this.setState({ emailReport: response.data });
        callback();
      })
      .catch((error) => {
        this.setState({ emailReport: null });
        if (error.response && error.response.status === 404)
          callback();
        else
          callback("An error occured while loading the sequence");
      });
  }

  goBack = () => {
    this.setState({
      updateWaiting: true,
      updateSent: true,
      updateOpened: true,
      updateReplied: true,
      updateBooked: true,
      updatePostponed: true,
      outreachSequenceDetail: null
    });
  }

  bookSequence = sequence => {
    this.props.changeLoadingMessage("Booking");
    stagesApi.actionBook(sequence)
      .then(response => {

        if (response.status === 200) {
          this.goBack();
          this.mustUpdate(['Replied', 'Booked']);
        }
        this.props.changeLoadingMessage();
      })
      .catch(() => {
        this.props.finishLoading(true, "An error has occured, please try again");
      });
  }

  postponeSequence = sequence => {
    this.props.changeLoadingMessage("Postponing");
    stagesApi.actionPostpone(sequence)
      .then(response => {

        if (response.status === 200) {
          this.goBack();
        }
        this.props.changeLoadingMessage();
      })
      .catch(() => {
        this.props.finishLoading(true, "An error has occured, please try again");
      });
  }

  restoreSequence = sequence => {
    this.props.changeLoadingMessage("Restoring");
    stagesApi.actionRestore(sequence)
      .then(response => {

        if (response.status === 200) {
          this.goBack();
        }
        this.props.changeLoadingMessage();
      })
      .catch(() => {
        this.props.finishLoading(true, "An error has occured, please try again");
      });
  }

  openReportSequenceEmail = () => {
    this.setState({ emailReportOpen: true, emailDescription: '' });
  }

  closeReportSequenceEmail = () => {
    this.setState({ emailReportOpen: false });
  }

  reportSequenceEmail = () => {
    const reportObj = {
      outreachId: this.state.outreachSequenceDetail._id,
      description: this.state.emailDescription
    };
    outreachSequencesApi.createEmailReport(reportObj)
      .then((response) => {
        this.setState({ emailReport: response.data });
        this.closeReportSequenceEmail();
        this.props.finishLoading(false, "Report sent sucessfully");
      })
      .catch(() => {
        this.props.finishLoading(true, "An error has occured, please try again later");
      });
  }

  removeSequence = (id, callback) => {
    this.props.changeLoadingMessage("Loading");
    let index;
    for (let i = 0; i < this.state.outreachSequences.length && !index; i++) {
      const sequence = this.state.outreachSequences[i];
      if (sequence._id === id) {
        index = i;
      }
    }
    let sequenceToRemove = this.state.outreachSequences[index];
    outreachSequencesApi.removeSequence(sequenceToRemove._id)
      .then(() => {
        this.setState(prevState => ({
          outreachSequences: update(prevState.outreachSequences, { $splice: [[index, 1]] })
        }), () => callback());
      })
      .catch(error => {
        callback(error);
      });
  }

  addNote = id => {
    let wrapper = document.createElement('div');
    ReactDOM.render(<Editor />, wrapper);
    let element = wrapper.firstChild;

    swalApi.openEditor(
      "Type the message you want to be stored as a note for this sequence",
      "Add a note",
      "Add",
      element)
      .then((confirm) => {
        if (confirm) {
          let text = element.getElementsByTagName("textarea")[0].value;

          wrapper = document.createElement('div');
          ReactDOM.render(<ReactMarkdown source={text} />, wrapper);
          let titleBox = document.createElement('input');
          titleBox.placeholder = '(optional)';
          wrapper.appendChild(document.createTextNode('Title '));
          wrapper.appendChild(document.createElement('br'));
          wrapper.appendChild(titleBox);

          swalApi.openConfirmation("Your note: ", "Confirm add note", "Confirm", wrapper)
            .then((confirm) => {
              if (confirm) {

                outreachSequencesApi.addNote(id, {
                  title: titleBox.value || "My Note",
                  content: text,
                  date: new Date()
                })
                  .then(() => {
                    this.getOutreachSequence(id, () => { });
                    swalApi.success("Note added succesfully");
                  })
                  .catch(() => {
                    this.props.finishLoading(true, "An error has occured, please try again later");
                  });
              }
            });
        }
      });
  }

  editNote = (id, idNote, content, title, date) => {
    let wrapper = document.createElement('div');
    ReactDOM.render(<Editor value={content} />, wrapper);
    let element = wrapper.firstChild;

    swalApi.openEditor(
      "Type the message you want to be stored as a note for this sequence",
      "Edit your note",
      "Edit",
      element)
      .then((confirm) => {
        if (confirm) {
          let text = element.getElementsByTagName("textarea")[0].value;

          wrapper = document.createElement('div');
          ReactDOM.render(<ReactMarkdown source={text} />, wrapper);
          let titleBox = document.createElement('input');
          titleBox.placeholder = '(optional)';
          wrapper.appendChild(document.createTextNode(`Your current title: ${title}`));
          wrapper.appendChild(document.createElement('br'));
          wrapper.appendChild(document.createTextNode('Change Title '));
          wrapper.appendChild(document.createElement('br'));
          wrapper.appendChild(titleBox);

          swalApi.openConfirmation("Your note: ", "Confirm edit note", "Confirm", wrapper)
            .then((confirm) => {
              if (confirm) {

                outreachSequencesApi.editNote(id, idNote, {
                  title: titleBox.value || title,
                  content: text,
                  date: date,
                  editDate: new Date()
                })
                  .then(() => {
                    this.getOutreachSequence(id, () => { });
                    swalApi.success("Note edited succesfully");
                  })
                  .catch(() => {
                    this.props.finishLoading(true, "An error has occured, please try again later");
                  });
              }
            });
        }
      });
  }

  removeNote = (id, idNote) => {
    swalApi.openConfirmation("Are you sure you want to delete this note? You won't be able to recover it after deletion is complete. ", "Confirm delete note")
      .then((confirm) => {
        if (confirm) {

          outreachSequencesApi.removeNote(id, idNote)
            .then(() => {
              this.getOutreachSequence(id, () => { });
              swalApi.success("Note removed succesfully");
            })
            .catch(() => {
              this.props.finishLoading(true, "An error has occured, please try again later");
            });
        }
      });
  }

  sampleEdit = () => swalApi.error("This sample note can't be edited!")

  sampleDelete = () => swalApi.error("This sample note can't be deleted!")

  render = () => (
    < OutreachSequencesPanel {...this.props} {...this.functions} {...this.state} />
  )

}

export default OutreachSequences;
