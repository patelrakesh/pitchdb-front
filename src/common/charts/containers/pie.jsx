import React, { Component } from 'react';

import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';

import Chart from '../components/chart';

import commonOptions from '../util/common-options';

HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);

// Make monochrome colors
var pieColors = (function () {
  var colors = [],
    base = Highcharts.getOptions().colors[0],
    i;

  for (i = 0; i < 10; i += 1) {
    // Start out with a darkened base color (negative brighten), and end
    // up with a much brighter color
    colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
  }
  return colors;
}());

class Pie extends Component {
  constructor (props) {
    super(props);
    this.baseOptions = {
      ...commonOptions.general,
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: props.title
      },
      subtitle: {
        text: props.subtitle
      },
      tooltip: {
        pointFormat: 'Total: <b>{point.y}</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          colors: pieColors,
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
            distance: -50,
            filter: {
              property: 'percentage',
              operator: '>',
              value: 4
            }
          }
        }
      },
      series: [{
        data: props.seriesData
      }],
    };
    this.state = {
      options: this.baseOptions,
      ready: true
    };
    this.functions = {};
  }

  render = () => <Chart highcharts={Highcharts} options={this.state.options} ready={this.state.ready} />
}

export default Pie;