import React, { Component } from 'react';
import StageCategoryPanel from '../components/stage-category-panel';
import swalApi from '../../../api/util/swal-api';
import stagesApi from '../../../api/routes/stages-api';
import update from 'immutability-helper';
import commonDataParsing from '../../../common/general/util/common-data-parsing';
import swal from 'sweetalert';

class StageCategory extends Component {
  constructor (props) {
    super(props);
    this.state = {
      itemsComplete: [],
      items: [],
      categoryName: '',
      firstLoad: false,
      updating: true,
      termf: ''
    };
    this.functions = {
      handleInputChange: this.handleInputChange,
      issueRemoveSequence: this.issueRemoveSequence,
      removeItem: this.removeItem,
      changeFilterTerm: this.changeFilterTerm
    };
  }

  componentDidMount = () => {
    this.loadItems(callback => {
      this.props.finishedUpdate(commonDataParsing.toTitleCase(this.props.category), () => {
        this.setState({ updating: false }, callback);
      });
    });
  }

  loadItems = callback => {
    this.setCategoryName();
    stagesApi.getLatestByCategory(this.props.category)
      .then(response => {
        this.setState({ items: response.data, itemsComplete: response.data },
          () => {
            callback(() => {
              this.performAdditionalAction();
            });
          });
      })
      .catch(() => {
        callback();
        this.props.finishLoading(true, "An error has occured loading the " + this.props.category + " stages");
      });
  }


  componentDidUpdate = () => {
    if (!this.state.updating) {
      if (this.props['update' + commonDataParsing.toTitleCase(this.props.category)])
        this.setState({ updating: true },
          () => {
            this.loadItems(callback => {
              this.props.finishedUpdate(commonDataParsing.toTitleCase(this.props.category),
                () => {
                  this.setState({ updating: false }, callback);
                });
            });
          });
    }
  }

  performAdditionalAction = () => {
    if (!this.state.firstLoad) {
      this.setState({ firstLoad: true }, () => {
        switch (this.props.category) {
          case 'sent':
            this.props.changeLoadingMessage("Checking if emails were opened");
            this.checkOpenedStages((err, result) => {
              if (err) {
                this.props.finishLoading(true, err, () => this.props.changePage('account/configuration'));
              }
              else {
                this.props.changeLoadingMessage();
                if (result.stages.length > 0 || (result.stages.length === 0 && result.bounced)) {
                  this.props.mustUpdate(['Sent', 'Opened', 'Replied']);
                }
                if (result.bounced) {
                  this.props.refresHeader(true, () => { });
                  swal("Email bounced", "One or more of the emails you sent bounced. We have refunded the pitches spent on these", "warning");
                }
              }
            });
            setTimeout(() => {
              this.props.changeLoadingMessage();
            }, 6000);
            break;
          case 'opened':
            this.checkRepliedStages((err, result) => {
              if (err) {
                this.props.finishLoading(true, err, () => this.props.changePage('account/configuration'));
              }
              else {
                if (result.length > 0) {
                  this.props.mustUpdate(['Opened', 'Replied']);
                }
              }
            });
            break;
          default:
            break;
        }
      });
    }
  }

  checkOpenedStages = callback => {
    if (this.state.items && this.state.items.length > 0)
      stagesApi.actionOpened(this.state.items)
        .then(response => {
          callback(null, response.data);
        })
        .catch(error => {
          if (error.response && error.response.status === 530) {
            callback("An error ocurred with your email account, please go to your account configuration", true);

          }
          else
            callback("An error occured while checking for updates");
        });
  }

  checkRepliedStages = callback => {
    if (this.state.items && this.state.items.length > 0)
      stagesApi.actionReplied(this.state.items)
        .then(response => {
          callback(null, response.data);
        })
        .catch(error => {
          if (error.response && error.response.status === 530) {
            callback("An error ocurred with your email account, please go to your account configuration", true);
            this.props.changePage('account/configuration');
          }
          else
            callback("An error occured while checking for updates");
        });
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  setCategoryName = () => {
    // console.log("this.props :: ",this.props);
    let categoryName;
    switch (this.props.category) {
      case 'waiting':
        categoryName = 'Waiting';
        break;
      case 'sent':
        categoryName = 'Email sent';
        break;
      case 'opened':
        categoryName = 'Email opened';
        break;
      case 'replied':
        categoryName = 'Email replied';
        break;
      case 'booked':
        categoryName = 'Booked';
        break;
      case 'postponed':
        categoryName = 'Not now';
        break;
      default:
        break;
    }

    this.setState({ categoryName: categoryName });
  }

  issueRemoveSequence = (index, e) => {
    e.stopPropagation();
    swalApi.openDeleteConfirmation('outreach sequence')
      .then((willDelete) => {
        if (willDelete) {
          let stageToDelete = this.state.items[index];
          this.props.removeSequence(stageToDelete.sequence._id, (err) => {
            if (err) this.props.finishLoading(true, "There was an error removing the sequence");
            else {
              this.removeItem(index);
            }
          });
        }
      });
  }

  removeItem = (index, swalObj) => {

    let originalListAfterRemoval = this.state.itemsComplete.filter((item => {
      return this.state.items[index]._id !== item._id;
    }));

    this.setState(prevState => ({
      items: update(prevState.items, { $splice: [[index, 1]] }),
      itemsComplete: originalListAfterRemoval
    }), () => {
      if (swalObj)
        swal(swalObj[0], swalObj[1], swalObj[2]);
      else
        this.props.finishLoading(false, "Sequence removed sucessfully");
    });
  }

  changeFilterTerm = (event) => {
    let termf = event.target.value;
    let term = termf.toUpperCase();
    let filteredItems = this.state.itemsComplete.filter(item => {
      if (item.sequence.userPodcastId) {
        return item.sequence.userPodcastId.podcast.title.toUpperCase().includes(term);
      }
      else if (item.sequence.userPodcastEpisodeId) {
        return item.sequence.userPodcastEpisodeId.episode.title.toUpperCase().includes(term);
      }
      else if (item.sequence.userEventOrganizationId) {
        if (item.sequence.userEventOrganizationId.eventOrganization.dataFileType == 1) {
          return item.sequence.userEventOrganizationId.eventOrganization.schoolName.toUpperCase().includes(term);
        }
        else {
          return item.sequence.userEventOrganizationId.eventOrganization.organization.toUpperCase().includes(term);
        }
      }
      else if (item.sequence.userBusinessId) {
        if (item.sequence.userBusinessId.business.companyName) {
          return item.sequence.userBusinessId.business.companyName.toUpperCase().includes(term);
        }
        else {
          return item.sequence.userBusinessId.business.organization.toUpperCase().includes(term);
        }
      }
      else if (item.sequence.userMediaOutletId) {
        return item.sequence.userMediaOutletId.mediaOutlet.companyName.toUpperCase().includes(term);
      }
      else {
        return item.sequence.userGuestId.guest.fullName.toUpperCase().includes(term);
      }

    });

    this.setState({
      items: filteredItems,
      termf: term
    });
  }

  render = () =>
    <StageCategoryPanel {...this.props} {...this.functions} {...this.state} />
}

export default StageCategory;