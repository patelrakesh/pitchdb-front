import React, { Component } from 'react';
import TeamPanel from '../components/team-panel';
import teamsApi from '../../../api/routes/teams-api';
import cookiesApi from '../../../api/util/cookies-api';
import swalApi from '../../../api/util/swal-api';
import update from 'immutability-helper';
import axios from 'axios';

class Team extends Component {
  constructor (props) {
    super(props);
    this.state = {
      team: null,
      invEmail: '',
      users: []
    };

    this.functions = {
      handleInputChange: this.handleInputChange.bind(this),
      issueInvitation: this.issueInvitation.bind(this),
      createTeam: this.createTeam.bind(this),
      removeMember: this.removeMember.bind(this)
    };
  }

  componentDidMount = () => {
    if (this.props.user.teamId) {
      this.props.changeLoadingMessage("Loading");
      teamsApi.getTeam()
        .then(response => {
          this.setState({ team: response.data, users: response.data.users }, () => this.props.changeLoadingMessage());
        })
        .catch(() => {
          this.props.finishLoading(true, "Error while loading your team information");
        });
    }
    else {
      this.props.changeLoadingMessage();
    }
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  createTeam = () => {
    this.props.changeLoadingMessage("Creating");
    teamsApi.createTeam()
      .then(response => {
        const jwt = response.data.token;
        cookiesApi.setUserJWT(jwt);
        axios.defaults.headers.common['Authorization'] = "Bearer " + jwt;
        this.setState({ team: { _id: response.data.user.teamId } });
        this.props.setUser(response.data.user);
        this.setState({ team: { _id: response.data.user.teamId } });
        this.props.finishLoading(false, "Team created successfully");
      })
      .catch(() =>
        this.props.finishLoading(true, "Could not create team, please try again later")
      );
  }

  issueInvitation = () => {
    this.props.changeLoadingMessage("Sending invitation");
    if (!this.state.invEmail) {
      this.props.finishLoading(true, "Please enter a valid email");
    }
    else
      teamsApi.issueInvitation(this.state.team, this.state.invEmail)
        .then(() => {
          this.props.finishLoading(false, "Invitation sent");
        })
        .catch(() => {
          this.props.finishLoading(true, "Error sending the invitation");
        });
  }

  removeMember = index => {
    swalApi.openDeleteConfirmation('member', "Once removed, this member will not be able to access PitchDB anymore. All of this member's contacts will be transfered to your account")
      .then((willDelete) => {
        if (willDelete) {
          this.props.changeLoadingMessage("Removing member");
          let userId = this.state.users[index]._id;
          teamsApi.removeTeamUser(userId)
            .then(() => {
              this.setState(prevState => ({
                users: update(prevState.users, { $splice: [[index, 1]] })
              }), () => this.props.finishLoading(false, "Member removed sucessfully"));

            })
            .catch(() => {
              this.props.finishLoading(true, "An error occured removing the member");
            });
        }
      });
  }

  render = () =>
    <TeamPanel {...this.props} {...this.functions} {...this.state} />
}

export default Team;