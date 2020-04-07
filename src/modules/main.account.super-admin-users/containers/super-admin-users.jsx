/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import swalApi from '../../../api/util/swal-api';
import SuperAdminPanel from '../components/super-admin-users-panel';
import adminUsersApi from '../../../api/routes/admin-users-api';
import bundlesApi from '../../../api/routes/bundles-api';
import cookiesApi from '../../../api/util/cookies-api';

class SuperAdmin extends Component {
  constructor (props) {
    super(props);
    this.state = {
      users: [],
      usersAmount: 0,
      creationMode: false,
      bundleAdditionIndex: -1,
      newUserEmail: '',
      newUserName: '',
      pageSize: 0,
      page: 0,
      bundles: [],

      term: '',
      numberAdditionCredits: 0
    };

    this.functions = {
      loadUsers: this.loadUsers,
      searchUsers: this.searchUsers,

      enterCreationMode: this.enterCreationMode,
      createUser: this.createUser,
      closeCreationMode: this.closeCreationMode,

      enterCreditsAdditionMode: this.enterCreditsAdditionMode,
      addCredits: this.addCredits,
      cancelBundleAdditionMode: this.cancelBundleAdditionMode,

      removeUser: this.removeUser,
      resetPassword: this.resetPassword,
      handleInputChange: this.handleInputChange,
      handleCreditsChange: this.handleCreditsChange,

      signInAsUser: this.signInAsUser,

      changePrivileges: this.changePrivileges,
      toggleStatus: this.toggleStatus,

      handlePageClick: this.handlePageClick
    };
  }

  componentDidMount = () => {
    this.loadUsers();
    this.countUsers();
    this.loadBundlesData();
  }

  searchUsers = () => {
    this.loadUsers();
    this.countUsers();
  }

  loadUsers = (page = 0) => {
    this.props.changeLoadingMessage('Loading users');
    adminUsersApi.getAllUsers(page, this.state.term.length > 0 ? this.state.term : null)
      .then(response => {
        this.setState({ users: response.data, page, bundleAdditionIndex: -1, numberAdditionCredits: 0 }, () => {
          window.scrollTo({
            top: window.document.getElementById('list-top').offsetTop - 20
          });
          this.props.changeLoadingMessage();
        });
      })
      .catch(() => {
        this.props.finishLoading(true, "Could not load users data");
      });
  }

  handlePageClick = (data) => {
    this.loadUsers(data.selected);
  }

  countUsers = () => {
    adminUsersApi.countUsers(this.state.term.length > 0 ? this.state.term : null)
      .then(response => {
        this.setState({ usersAmount: response.data.count, pageSize: response.data.pageSize });
      })
      .catch(() => {
        this.props.finishLoading(true, "Could not load users data");
      });
  }

  // Bundles load

  loadBundlesData = () => {
    this.props.changeLoadingMessage('Loading');
    bundlesApi.get()
      .then(response => {
        this.setState({ bundles: response.data, selectedBundle: response.data[0] }, () => { this.props.changeLoadingMessage(); });
      })
      .catch(() => {
        this.props.finishLoading(true, 'An error occured while loading the bundles data, please try again later');
      });
  }

  enterCreationMode = () => {
    this.setState({
      newUserEmail: '',
      creationMode: true
    });
  }

  createUser = () => {
    swalApi.openConfirmation("Are you sure you want to add an user with this email?")
      .then(confirm => {
        if (confirm) {
          this.props.changeLoadingMessage("Creating");
          adminUsersApi.createUser({
            email: this.state.newUserEmail,
            name: this.state.newUserName,
            privileges: []
          })
            .then(() => {
              this.props.finishLoading(false, "User added succesfully and email sent with login instructions");
              this.closeCreationMode();
              this.loadUsers();
            })
            .catch(() => {
              this.props.finishLoading(true, "Could not add user");
            });
        }
      });
  }

  closeCreationMode = () => {
    this.setState({ creationMode: false });
  }

  enterCreditsAdditionMode = index => {
    this.setState({
      bundleAdditionIndex: index
    });
  }

  cancelBundleAdditionMode = () => {
    this.setState({ bundleAdditionIndex: -1 });
  }

  addCredits = () => {
    swalApi.openConfirmation(`Are you sure you want to add ${this.state.numberAdditionCredits} credits to this user?`)
      .then(confirm => {
        if (confirm) {
          this.props.changeLoadingMessage("Adding bundle");
          adminUsersApi.addCredits(this.state.users[this.state.bundleAdditionIndex]._id, {amount: this.state.numberAdditionCredits})
            .then(() => {
              this.props.finishLoading(false, "Credits added succesfully");
              this.loadUsers();
            })
            .catch(() => {
              this.props.finishLoading(true, "Could not add credits");
            });
        }
      });
  }

  removeUser = index => {
    swalApi.openDeleteConfirmation("user")
      .then(confirm => {
        if (confirm) {
          this.props.changeLoadingMessage("Removing");
          adminUsersApi.deleteUser(this.state.users[index]._id)
            .then(() => {
              this.props.finishLoading(false, "User removed succesfully");
              this.loadUsers();
            })
            .catch(() => {
              this.props.finishLoading(true, "Could not remove user");
            });
        }
      });
  }

  changePrivileges = index => {
    let select = document.createElement("select");
    select.id = "privileges";

    let privileges = [
      "superAdmin",
      "betaUser",
      "testRole"
    ];

    var options_str ='<option selected disabled>Select an option</option>';

    swalApi.openDualActionConfirmation(
      "You're about to change this user's privileges",
      "Add or Remove User Privileges",
      "Add",
      "Remove" )
      .then(confirm => {
        if (confirm === "Add") {

          if(this.state.users[index].privileges){
            for(let i  = 0; i < this.state.users[index].privileges.length; i++){
              for(let j = 0; j < privileges.length; j++){  
                if(this.state.users[index].privileges[i] === privileges[j])
                  { 
                    if( privileges.length === 1){
                      privileges = [];
                    }else{
                      privileges.splice(i, 1);
                    } 
                  }
              }
            }
          }
          
          privileges.length > 0 ? 
          privileges.forEach( 
            function(privilege) {
              options_str += '<option value="' + privilege + '">' + privilege + '</option>';
            })
          :
          options_str = "";

          select.innerHTML = options_str;

          swalApi.openSelection(
            privileges.length > 0 ? "Select the privilege you want to add to this user" : "There are no privileges available to add to this user",
            "Add Privilege",
            privileges.length > 0 ? "Add" : "Ok",
            privileges.length > 0 ? select : null)
          .then(confirm => {
            if (confirm && privileges.length > 0){
              if(select.value !== "Select an option"){
                this.props.changeLoadingMessage("Adding privilege");
                adminUsersApi.addPrivilege(this.state.users[index]._id, select.value)
                  .then(() => {
                    this.props.finishLoading(false, "Privilege added succesfully");
                    this.loadUsers();
                  })
                  .catch(() => {
                    this.props.finishLoading(true, "Could not add privilege to user");
                  });
              }
            }
          });
          
        }else if(confirm === "Remove"){

          this.state.users[index].privileges && this.state.users[index].privileges.length > 0  ? 
          this.state.users[index].privileges.forEach( 
            function(privilege) {
              options_str += '<option value="' + privilege + '">' + privilege + '</option>';
            })
          :
          options_str = "";

          select.innerHTML = options_str;

          swalApi.openSelection(
            this.state.users[index].privileges && this.state.users[index].privileges.length > 0 ? "Select the privilege you want to remove from this user" : "There are no privileges available to remove to this user",
            "Remove Privilege",
            this.state.users[index].privileges && this.state.users[index].privileges.length > 0 ? "Remove" : "Ok",
            this.state.users[index].privileges && this.state.users[index].privileges.length > 0 ? select : null)
          .then(confirm => {
            if (confirm && this.state.users[index].privileges && this.state.users[index].privileges.length > 0){
              
              if(select.value !== "Select an option"){
                this.props.changeLoadingMessage("Removing privilege");
                adminUsersApi.removePrivilege(this.state.users[index]._id, select.value)
                .then(() => {
                  this.props.finishLoading(false, "Privilege removed succesfully");
                  this.loadUsers();
                })
                .catch(() => {
                  this.props.finishLoading(true, "Could not remove privilege to user");
                });
              } else{
                swalApi.error("You must select a valid privilege");
              }
            }
          });
          
        }
      });
  }

  toggleStatus = index => {
    const disabled = this.state.users[index].disabled; 
    swalApi.openConfirmation(
      disabled ? 
      "Are you sure you want to ENABLE this user?" 
      : "Are you sure you want to DISABLE this user?")
    .then( confirm => {
      if (confirm) {
        this.props.changeLoadingMessage(
          disabled ?
          "Enabling user"
          : "Disabling user"
        );
        adminUsersApi.toggleStatus(this.state.users[index]._id)
          .then(() => {
            this.props.finishLoading(false, 
              disabled ?
              "User enabled successfully"
              : "User disabled successfully");
            this.loadUsers();
          })
          .catch(() => {
            this.props.finishLoading(true, 
              disabled ? 
              "Could not enable user"
              : "Could not disable user");
          });
      }
    });
  }

  resetPassword = index => {
    swalApi.openConfirmation("Reset this user's password?")
      .then(confirm => {
        if (confirm) {
          this.props.changeLoadingMessage("Resetting password");
          adminUsersApi.resetPassword(this.state.users[index]._id)
            .then(() => {
              this.props.finishLoading(false, "User password reset and email with new password sent");
              this.loadUsers();
            })
            .catch(() => {
              this.props.finishLoading(true, "Could not reset password");
            });
        }
      });
  }

  signInAsUser = index => {
    swalApi.openConfirmation("Sign into this user account?")
      .then(confirm => {
        if (confirm) {
          this.props.changeLoadingMessage("Signing in");
          adminUsersApi.getSignInToken(this.state.users[index]._id)
            .then(response => {
              cookiesApi.set('admin-token', cookiesApi.get('jwt'));
              cookiesApi.setUserJWT(response.data);
              cookiesApi.remove('lastPage');
              cookiesApi.remove('currentPage');
              window.location = 'app.pitchdb.com';
            })
            .catch(() => {
              this.props.finishLoading(true, "Could not get user info");
            });
        }
      });
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleCreditsChange = event => {
    this.setState({ numberAdditionCredits: event.target.value });
  }


  render = () => <SuperAdminPanel {...this.state} {...this.props} {...this.functions} />
}

export default SuperAdmin;