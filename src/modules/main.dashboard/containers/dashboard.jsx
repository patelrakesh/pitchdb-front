import React, { Component } from 'react';
import DashboardPanel from '../components/dashboard-panel';

class Dashboard extends Component {
  constructor (props) {
    super(props);
  }

  render = () => <DashboardPanel {...this.props} />
}

export default Dashboard;