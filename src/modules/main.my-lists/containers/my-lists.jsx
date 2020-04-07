import React, { Component } from 'react';
import MyListsPanel from '../components/my-lists-panel';
import update from 'immutability-helper';
import swalApi from '../../../api/util/swal-api';
import listsApi from '../../../api/routes/lists-api';
import async from 'async';

class MyLists extends Component {
  constructor (props) {
    super(props);
    this.state = {
      lists: [],
      creationMode: false,
      editionModeIndex: -1,
      newListName: '',
      editListName: '',
      pageSize: 0,
      listsAmount: 0,
      page: 0
    };

    this.functions = {
      viewListPodcasts: this.viewListPodcasts,
      toggleCreationMode: this.toggleCreationMode,
      handleInputChange: this.handleInputChange,
      cancelCreation: this.cancelCreation,
      createList: this.createList,
      deleteList: this.deleteList,
      setEditList: this.setEditList,
      editList: this.editList,
      cancelEdition: this.cancelEdition,
      handlePageClick: this.handlePageClick
    };
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  componentDidMount = () => {
    this.props.changeLoadingMessage('Loading list data');
    async.parallel([
      callback => this.loadUserListsFirstTime(callback),
      callback => this.loadUserListsCount(callback)
    ], (err) => {
      this.props.changeLoadingMessage();
      if (err) this.props.finishLoading(true,'Error loading the list data');
    });
  }

  loadUserListsFirstTime = callback => {
    listsApi.getUserLists(0)
      .then(response => {
        this.setLists(response.data, callback);
      })
      .catch((error) => {
        callback(error);
      });
  }

  loadUserListsCount = (callback) => {
    listsApi.getUserListsCount()
      .then(response => {
        this.setState({
          pageSize: response.data.pageSize,
          listsAmount: response.data.count
        });
        callback();
      })
      .catch((error) => {
        callback(error);
      });
  }

  loadUserLists = (page = 0) => {
    this.props.changeLoadingMessage("Loading");
    listsApi.getUserLists(page)
      .then(response => {
        this.setState({ page });
        this.setLists(response.data, () => {
          window.scrollTo({
            top: window.document.getElementById('lists-list').offsetTop - 30
          });
          this.props.changeLoadingMessage();
        });
      })
      .catch(() => {
        this.props.changeLoadingMessage();
      });
  }

  setLists = (listData, callback) => {
    async.mapLimit(listData, 3, this.setListCountData, (err, lists) => {
      if (err) this.props.finishLoading(true,err);
      else {
        this.setState({
          lists
        }, () => { if (callback) callback(); });
      }
    });
  }

  setListCountData = (list, callback) => {
    listsApi.getListCountSummary(list._id)
      .then(response => {
        list.count = response.data;
        list.empty = this.getListempty(list.count);
        callback(null, list);
      })
      .catch(() => {
        callback('Could not get the count of contacts in a list');
      });
  }

  getListempty = listCount => {
    for (const key in listCount) {
      if (listCount.hasOwnProperty(key)) {
        if (listCount[key] > 0) return false;
      }
    }
    return true;
  }

  handlePageClick = (data) => {
    this.loadUserLists(data.selected);
  }

  toggleCreationMode = () => {
    this.setState({
      creationMode: true
    });
  }

  createList = () => {
    this.props.changeLoadingMessage("Creating");
    listsApi.createList({ name: this.state.newListName, podcasts: [], episodes: [] })
      .then(response => {
        let newList = response.data;
        newList.empty = true;
        this.setState(previousState => ({
          lists: [newList, ...previousState.lists],
          creationMode: false,
          newListName: ''
        }));
        this.props.changeLoadingMessage();
        this.props.finishLoading(false,"List created successfully");
      })
      .catch(() => {
        this.props.changeLoadingMessage();
        this.props.finishLoading(true,"You already have a list with that name");
      });
  }

  cancelCreation = () => {
    this.setState({
      creationMode: false,
      newListName: ''
    });
  }

  viewListPodcasts = listId => {
    this.props.changePage('my-lists/' + listId);
  }

  deleteList = index => {
    swalApi.openDeleteConfirmation("list", "Once removed, you will not be able to recover this lists or its items")
      .then(willDelete => {
        if (willDelete) {
          this.props.changeLoadingMessage("Removing");
          const id = this.state.lists[index]._id;
          listsApi.deleteList(id)
            .then(() => {
              this.setState(prevState => ({
                lists: update(prevState.lists, { $splice: [[index, 1]] })
              }), () => { this.props.finishLoading(false,"List removed successfuly"); });
            })
            .catch(() => {
              this.props.finishLoading(true,"Could not delete the list");
            });
        }
      });
  }

  setEditList = index => {
    this.setState(
      {
        editionModeIndex: index,
        editListName: this.state.lists[index].name
      }
    );
  }

  editList = index => {
    this.props.changeLoadingMessage("Editing");
    listsApi.updateList(this.state.lists[index]._id, { name: this.state.editListName })
      .then(() => {
        let replacementList = this.state.lists[index];
        replacementList.name = this.state.editListName;
        this.setState(prevState => ({
          lists: update(prevState.lists, { $splice: [[index, 1, replacementList]] }),
        }));
        this.cancelEdition();
        this.props.finishLoading(false,"Name changed succesfully");

      })
      .catch(() => {
        this.props.finishLoading(true,"We could not update the name");
      });
  }

  cancelEdition = () => {
    this.setState({ editionModeIndex: -1 });
  }

  render = () =>
    <MyListsPanel {...this.props} {...this.functions} {...this.state} />
}

export default MyLists;