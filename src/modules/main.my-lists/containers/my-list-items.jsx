import React, { Component } from 'react';
import async from 'async';
import MyListDetailPanel from '../components/my-list-detail-panel';
import listsApi from '../../../api/routes/lists-api';
import emailAccountsApi from '../../../api/routes/email-accounts-api';
import podcastsApi from '../../../api/routes/podcasts-api';
import businessesApi from '../../../api/routes/businesses-api';
import eventOrganizationsApi from '../../../api/routes/events-api';
import update from 'immutability-helper';
import swalApi from '../../../api/util/swal-api';
import gmailApi from '../../../api/external/gmail';

import * as Showdown from "showdown";

import cookiesApi from '../../../api/util/cookies-api';

class MyListItems extends Component {
  constructor (props) {
    super(props);
    this.state = {
      list: null,
      type: 'podcast',
      itemDetail: null,
      currentHasItems: false,
      count: null,
      pageSize: 0,
      items: [],
      page: 0,

      modalIsOpen: false,
      emailTo: '',
      subject: '',
      emailTrackBackItem:{}
    };

    this.functions = {
      viewPodcastDetail: this.viewPodcastDetail,
      handleSelected: this.handleSelected,
      changeType: this.changeType,
      backToResults: this.backToResults,
      backToLists: this.backToLists,
      connectContacts: this.connectContacts,
      deleteItem: this.deleteItem,
      viewItemDetail: this.viewItemDetail,
      handlePageClick: this.handlePageClick,
      openEmail: this.openEmail,
      findEmail: this.findEmail,
      sendEmailMessage: this.sendEmailMessage,
      closeModal: this.closeModal,
      handleInputChange: this.handleInputChange
    };
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  componentDidMount = () => {
    this.firstTimeLoad();
  }

  firstTimeLoad = () => {
    this.props.changeLoadingMessage("Loading list data");
    const listId = this.props.location.pathname.split("/")[3];
    async.parallel([
      callback => this.loadList(listId, callback),
      callback => this.loadCountSummaryFirstTime(listId, callback)
    ], (err) => {
      if (err) this.props.finishLoading(true, err);
      else {
        this.props.changeLoadingMessage("Loading contact data");
        async.parallel([
          callback => this.loadItemsFirstTime(callback),
          callback => this.getItemsCount(callback)
        ], (err) => {
          if (err) this.props.finishLoading(true, err);
          else {
            this.props.changeLoadingMessage();
          }
        });
      }
    });
  }

  loadList = (listId, callback) => {
    listsApi.getUserList(listId)
      .then(response => {
        this.setState({
          list: response.data
        }, () => callback());
      })
      .catch(() => {
        callback('Error loading list data');
      });
  }

  loadCountSummaryFirstTime = (listId, callback) => {
    listsApi.getListCountSummary(listId)
      .then(response => {
        this.setState({ count: response.data }, () => {
          this.setFirstNotempty(callback);
        });
      })
      .catch(() => {
        callback('Could not get the count of contacts in a list');
      });
  }

  loadCountSummary = () => {
    listsApi.getListCountSummary(this.state.list._id)
      .then(response => {
        this.setState({ count: response.data });
      })
      .catch(() => {
      });
  }

  setFirstNotempty = callback => {
    let type;
    if (this.state.count.podcast > 0) type = 'podcast';
    else if (this.state.count.episode > 0) type = 'episode';
    else if (this.state.count.eventOrganization > 0) type = 'eventOrganization';
    else if (this.state.count.business > 0) type = 'business';
    else if (this.state.count.mediaOutlet > 0) type = 'mediaOutlet';
    else if (this.state.count.conference > 0) type = 'conference';
    else if (this.state.count.guest > 0) type = 'guest';
    this.setState({ type }, () => callback());
  }

  loadItemsFirstTime = callback => {
    listsApi.getListItems(this.state.list._id, this.state.type, 0)
      .then(response => {
        this.setState({ items: response.data }, () => callback());
      })
      .catch(() => {
        callback('Error loading the contacts list');
      });
  }

  getItemsCount = callback => {
    listsApi.getListItemsCount(this.state.list._id, this.state.type)
      .then(response => {
        this.setState({ pageSize: response.data.pageSize }, () => callback());
      })
      .catch(() => {
        callback('Error loading the contacts list');
      });
  }

  loadItems = (page = 0, type = this.state.type, callback) => {
    this.props.changeLoadingMessage('Loading contacts');
    listsApi.getListItems(this.state.list._id, type, page)
      .then(response => {
        console.log(response.data);

        this.setState({ items: response.data, type, page },
          () => {
            window.scrollTo({
              top: window.document.getElementById('contacts-type').offsetTop - 120
            });
            this.props.changeLoadingMessage();
            if (callback) callback();
          }
        );
      })
      .catch(() => {
        this.props.finishLoading(true, 'Error loading the contacts list');
      });
  }

  handleSelected = (index) => {
    let selectType = this.state.type;
    if (selectType === 'episode')
      selectType = 'podcastEpisode';
    let selected = this.state.items[index];
    let itemSelector = 'user' + selectType.charAt(0).toUpperCase() + selectType.substring(1);
    let selectedItem = selected[itemSelector][this.state.type];
    selectedItem.selected = !selectedItem.selected;
    this.setState({
      items: update(this.state.items, { $splice: [[index, 1, selected]] }),
    });
  }

  viewPodcastDetail = (podcastId, e) => {
    e.stopPropagation();
    this.props.changeLoadingMessage("Loading");
    podcastsApi.getDetailById(podcastId)
      .then(response => {
        this.setState({ itemDetail: response.data }, () => this.props.changeLoadingMessage());
      })
      .catch(() => {
        this.props.finishLoading(true, 'We could not load the podcast data');
      });
  }

  viewItemDetail = (itemId, e) => {
    e.stopPropagation();
    this.props.changeLoadingMessage("Loading");
    switch (this.state.type) {
      case 'business':
        businessesApi.fetchLocalBusiness(itemId)
          .then(response => {
            this.setState({ itemDetail: response.data }, () => this.props.changeLoadingMessage());
          })
          .catch(() => this.props.changeLoadingMessage());
        break;
      default:
        eventOrganizationsApi.fetchEvent(itemId)
          .then(response => {
            this.setState({ itemDetail: response.data }, () => this.props.changeLoadingMessage());
          })
          .catch(() => this.props.changeLoadingMessage());
        break;
    }
  }

  changeType = type => {
    this.loadItems(0, type);
  }

  handlePageClick = data => {
    this.loadItems(data.selected);
  }

  backToResults = () => {
    this.setState({ itemDetail: null });
  }

  backToLists = () => {
    this.props.changePage('my-lists');
  }

  connectContacts = (listId) => {
    let newSequences = [];

    let selectType = this.state.type;
    if (selectType === 'episode')
      selectType = 'podcastEpisode';
    let itemSelector = 'user' + selectType.charAt(0).toUpperCase() + selectType.substring(1);

    this.state.items.forEach(item => {
      let innerItem = item[itemSelector][this.state.type];
      if (innerItem.selected && !innerItem.connected) {
        const newSequence = {
          [itemSelector + 'Id']: item[itemSelector]._id,
          listId,
          listItemId: item._id
        };
        newSequences.push(newSequence);
      }
    });

    if (newSequences.length <= 0)
      this.props.finishLoading(true, "You must select at least one contact from your list that is available for email find");
    else {
      emailAccountsApi.getPrimary()
        .then((response) => {
          if (response.data) {
            swalApi.openConfirmation(`You are about to consume ${newSequences.length} pitch(es). The email 
            ${response.data.email} will be used as the sender email for the selected contact(s)`, 'Confirm', 'Confirm')
              .then(confirmation => {
                if (confirmation) {
                  this.props.changeLoadingMessage("Creating");
                  listsApi.connectContacts(newSequences)
                    .then(response => {
                      if (response.status === 200) {
                        const { resultsCount } = response.data;
                        this.loadItems(0, this.state.type, () => {
                          this.props.refresHeader(true, () => { });
                          swalApi.success(`Contact information requested, with a total of ${resultsCount} email(s) found. ${resultsCount} pitch(es) were consumed`);
                        });
                      }
                    })
                    .catch(error => {
                      if (error.response && error.response.status === 460)
                        this.promptConfiguration(error.response.data);
                      else if (error.response && typeof error.response.data === 'string')
                        this.props.finishLoading(true, error.response.data);
                      else
                        this.props.finishLoading(true, "There was an error creating the outreach sequences");
                    });
                }
              });
          }
          else {
            this.promptConfiguration("You haven't configured any email account for sending emails");
          }
        })
        .catch(() => {
          this.props.finishLoading(true, "Could not get email information, try again later.");
        });
    }
  }

  findEmail = (e, listId, listItemId, userItemId) => {
    e.stopPropagation();
    let selectType = this.state.type;
    if (selectType === 'episode')
      selectType = 'podcastEpisode';
    let itemSelector = 'user' + selectType.charAt(0).toUpperCase() + selectType.substring(1);
    const newSequences = [{
      [itemSelector + 'Id']: userItemId,
      listId,
      listItemId
    }];
    emailAccountsApi.getPrimary()
      .then((response) => {
        if (response.data) {
          swalApi.openConfirmation(`You are about to consume 1 pitch. The email 
            ${response.data.email} will be used as the sender email for the selected contact`, 'Confirm', 'Confirm')
            .then(confirmation => {
              if (confirmation) {
                this.props.changeLoadingMessage("Creating");
                listsApi.connectContacts(newSequences)
                  .then(response => {
                    if (response.status === 200) {
                      const { resultsCount } = response.data;
                      this.loadItems(0, this.state.type, () => {
                        this.props.refresHeader(true, () => { });
                        swalApi.success(`Contact information requested, with a total of ${resultsCount} email(s) found. ${resultsCount} pitch(es) were consumed`);
                      });
                    }
                  })
                  .catch(error => {
                    if (error.response && error.response.status === 460)
                      this.promptConfiguration(error.response.data);
                    else if (error.response && typeof error.response.data === 'string')
                      this.props.finishLoading(true, error.response.data);
                    else
                      this.props.finishLoading(true, "There was an error creating the outreach sequences");
                  });
              }
            });
        }
        else {
          this.promptConfiguration("You haven't configured any email account for sending emails");
        }
      })
      .catch(() => {
        this.props.finishLoading(true, "Could not get email information, try again later.");
      });
  }

  promptConfiguration = (message) => {
    swalApi.openConfirmation(message, "Could not create", "Go to configuration")
      .then(confirmation => {
        if (confirmation)
          this.props.changePage('account/configuration');
      });
  }

  deleteItem = (itemId, e) => {

    e.stopPropagation();
    let itemIdsToDelete = [itemId];

    swalApi.openDeleteConfirmation('Contact', 'Once removed, you will not be able to recover this contact')
      .then(willDelete => {
        if (willDelete) {
          this.props.changeLoadingMessage("Removing");

          listsApi.deleteItems(this.state.list._id, itemIdsToDelete)
            .then(response => {
              if (response.status === 200) {
                this.loadItems(this.state.page, this.state.type, () => {
                  this.props.finishLoading(false, 'Contact removed succesfully');
                });
                this.loadCountSummary();
              } else {
                this.props.finishLoading(true, 'There was an error removing your contact, please try again later');
              }
            })
            .catch(() => {
              this.props.finishLoading(true, 'There was an error removing your contact, please try again later');
            });
        }
      });
  }

  openEmail = (itemId, e,item) => {

    // console.log("podcast Item",item)
    e.stopPropagation();

    listsApi.getSequence(this.state.list._id, itemId)
      .then(response => {
        const { data } = response;
        if (data && !data.emailFrom) {
          // Send email message from within this screen
          this.setState({ modalIsOpen: true, emailTo: data.emailTo, emailTrackBackItem : item });
        }
        else {
          listsApi.activateSequence(this.state.list._id, itemId)
            .then(() => {
              this.props.changePage('outreach-sequences');
            })
            .catch(err => {
              console.log(err);
              this.props.finishLoading(true, "There was an error, please try again later");
            });
        }
      })
      .catch(() => {
        this.props.finishLoading(true, "There was an error, please try again later");
      });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false, emailTo: '' });
  }

  // Function for email dialog
  sendEmailMessage = () => {
    this.props.changeLoadingMessage("Sending");
    this.closeModal();
    const converter = new Showdown.Converter();

    let content = {
      subject: this.state.subject,
      message: converter.makeHtml(document.getElementsByTagName("textarea")[0].value)
    };

    const emailToken = cookiesApi.get('gmailAccessToken');
    const emailTokenExp = cookiesApi.get('gmailAccessTokenExp');

    const expDate = new Date(emailTokenExp);
    if (expDate < new Date()) {
      swalApi.error('Please sign-in with your email account again before attempting to send emails');
      this.props.changePage('account/configuration');
    }
    else {
      // Check if token is expired
      const formattedMessage = gmailApi.formatMessage(this.props.user.name, 'me@gmail.com', this.state.emailTo, content.subject, content.message);
      gmailApi.sendEmail({ raw: formattedMessage }, emailToken)
        .then(() => {
          this.props.finishLoading(null, "Email sent succesfully");
        })
        .catch(err => {
          console.log(err);
          this.props.finishLoading(true, "There was an error sending your email, please try again later");
        });
    }


    // stagesApi.actionSend(stageObj)
    //   .then(response => {
    //     if (response.status === 200) {
    //       this.props.mustUpdate(['Waiting', 'Sent']);
    //     }
    //     this.props.finishLoading(false, "Message sent succesfully");
    //   })
    //   .catch(error => {
    //     this.props.changeLoadingMessage();
    //     this.openMessageMenu();
    //     if (error.response && error.response.status === 402) {
    //       this.setState({ emailError: error.response.data });
    //     }
    //     else if (error.response && error.response.status === 522) {
    //       this.props.removeSequence(stageObj.sequence._id, (err) => {
    //         if (err) this.props.finishLoading(true, "There was an error removing the sequence");
    //         else {
    //           this.props.finishLoading();
    //           const swalObj = ["Not validated", `We could not validate the recipient email address is able to recieve messages,
    //                         the outreach sequence has been removed`, "warning"];
    //           this.closeModal();
    //           this.props.removeItem(this.props.index, swalObj);
    //         }
    //       });
    //     }
    //     else if (error.response && error.response.status === 530) {
    //       this.setState({ emailError: "An error ocurred with your email account, please go to your account configuration and reconnect your email" });
    //     }
    //     else {
    //       this.setState({ emailError: "An error has occured sending your email, please try again later" });
    //     }
    //   });
  }

  render = () =>
    <MyListDetailPanel {...this.props} {...this.functions} {...this.state} />
}

export default MyListItems;