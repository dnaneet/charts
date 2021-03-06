$(document).ready(function() {

  var TITLE = 'Task progress chart (Hover over data point to view tasks done on that day)';

  var POINT_X = 'dayNumber'; // column name for x values in data csv 
  var POINT_X_PREFIX = 'day number-'; // prefix for x values, eg '$'
  var POINT_X_POSTFIX = ''; // postfix for x values, eg '%'

  var POINT_Y = 'cumulative'; // column name for y values in data.csv
  var POINT_Y_PREFIX = ''; // prefix for x values, eg 'USD '
  var POINT_Y_POSTFIX = ''; // postfix for x values, eg ' kg'

  var POINT_NAME = 'task'; // point names that appear in tooltip
  var POINT_COLOR = 'rgba(255,10,10,0.9)'; // point color, eg `black` or `rgba(10, 100, 44, 0.8)`
  var POINT_RADIUS = 5; // radius of each data point

  var X_AXIS = 'Day Number';  // x-axis label and label in tooltip
  var Y_AXIS = 'Cumulative time on tasks (minutes)'; // y-axis label and label in tooltip

  var SHOW_GRID = true; // `true` to show the grid, `false` to hide

  // Read data file and create a chart
  d3.csv('./ED5101_data.csv').then(function(rows) {

    var data = rows.map(function(row) {
      return {
        x: row[POINT_X],
        y: row[POINT_Y],
        name: row[POINT_NAME]
      }
    })

	var scatterChartData = {
			datasets: [{
				label: 'task progress',
				backgroundColor: POINT_COLOR,
        			data: data,
        			pointRadius: POINT_RADIUS,
        			pointHoverRadius:  POINT_RADIUS + 2
				//showLine: true
				}]
    };

    var ctx = document.getElementById('container').getContext('2d');

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
    	    //type: 'time',	  
            scaleLabel: {
              display: true,
              labelString: X_AXIS
            },
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
