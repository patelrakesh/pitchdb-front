import React, { Component } from 'react';

import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';

import Chart from '../components/chart';

import commonOptions from '../util/common-options';

HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);

let maxYAxis = commonOptions.defaultLineMaxYAxis;

class Line extends Component {
  constructor (props) {
    super(props);

    if (props.maxYAxis && props.maxYAxis > maxYAxis)
      maxYAxis = props.maxYAxis;

    this.baseOptions = {
      ...commonOptions.general,
      title: {
        text: props.title
      },
      yAxis: {
        title: {
          text: props.yAxisTitle
        },
        max: maxYAxis
      },
      tooltip: {
        pointFormat: `<b>{point.y}</b> ${props.toolTipText}`
      },
      xAxis: {
        tickInterval: 1,
        labels: {
          enabled: true,
          formatter: function () {
            return props.seriesData[this.value][0];
          }
        }
      },
      series: [
        {
          ...commonOptions.lineSeries,
          data: props.seriesData
        }
      ]
    };

    this.state = {
      options: this.baseOptions,
      ready: props.seriesData && props.seriesData.length > 0
    };

    this.functions = {};
  }

  render = () => <Chart highcharts={Highcharts} options={this.state.options} ready={this.state.ready} />
}

export default Line;