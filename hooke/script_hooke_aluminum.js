$(document).ready(function() {

  var TITLE = 'Tensile test for Aluminum alloys: Identify the Alloy';

  var POINT_X = 'strain'; // column name for x values in data.csv
  var POINT_X_PREFIX = ''; // prefix for x values, eg '$'
  var POINT_X_POSTFIX = ' (in-per-in)'; // postfix for x values, eg '%'

  var POINT_Y = 'stress'; // column name for y values in data.csv
  var POINT_Y_PREFIX = ''; // prefix for x values, eg 'USD '
  var POINT_Y_POSTFIX = ' (ksi)'; // postfix for x values, eg ' kg'

  var POINT_NAME = 'material'; // point names that appear in tooltip
  var POINT_COLOR = 'rgba(0,0,255,0.9)'; // point color, eg `black` or `rgba(10, 100, 44, 0.8)`
  var POINT_RADIUS = 2; // radius of each data point

  var X_AXIS = 'strain';  // x-axis label and label in tooltip
  var Y_AXIS = 'stress'; // y-axis label and label in tooltip

  var SHOW_GRID = true; // `true` to show the grid, `false` to hide

  // Read data file and create a chart
  d3.csv('./al_alloy_dual.csv').then(function(rows) {

    var data = rows.map(function(row) {
      return {
        x: row[POINT_X],
        y: row[POINT_Y],
        name: row[POINT_NAME]
      }
    })

		var scatterChartData = {
			datasets: [{
				label: 'Hookes law',
				backgroundColor: POINT_COLOR,
        data: data,
        pointRadius: POINT_RADIUS,
        pointHoverRadius:  POINT_RADIUS + 2,
			}]
    };

    var ctx = document.getElementById('stress-strain-al').getContext('2d');

    Chart.Scatter(ctx, {
      data: scatterChartData,
      options: {
        title: {
          display: true,
          text: TITLE,
          fontSize: 14,
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: X_AXIS
            },
            type: 'linear',
            gridLines: {
              display: SHOW_GRID,
            },
            ticks: {
              callback: function(value, index, values) {
                return POINT_X_PREFIX + value.toLocaleString() + POINT_X_POSTFIX;
              }
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: Y_AXIS
            },
            gridLines: {
              display: SHOW_GRID,
            },
            ticks: {
              callback: function(value, index, values) {
                return POINT_Y_PREFIX + value.toLocaleString() + POINT_Y_POSTFIX;
              }
            }
          }]
        },
        tooltips: {
          displayColors: false,
          callbacks: {
            title: function(tooltipItem, all) {
              return [
                all.datasets[tooltipItem[0].datasetIndex].data[tooltipItem[0].index].name,
              ]
            },
            label: function(tooltipItem, all) {
              return [
                X_AXIS + ': ' + POINT_X_PREFIX + tooltipItem.xLabel.toLocaleString() + POINT_X_POSTFIX,
                Y_AXIS + ': ' + POINT_Y_PREFIX + tooltipItem.yLabel.toLocaleString() + POINT_Y_POSTFIX
              ]
            }
          }
        }
      }
    });

  });
});
