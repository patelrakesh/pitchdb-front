import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import LoadingIcon from '../../general/components/loading-icon';
import './chart.css';

export default ({ options, highcharts, ready }) =>
  <React.Fragment>
    {ready ?
      <HighchartsReact
        highcharts={highcharts}
        constructorType={'chart'}
        options={options}
      /> :
      <div className="loading-chart">
        <LoadingIcon size="loading-huge" />
      </div>
    }
  </React.Fragment>;
