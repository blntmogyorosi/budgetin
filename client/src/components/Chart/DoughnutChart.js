import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DoughnutChart = ({ title, data }) => {
	const options = {
		animationEnabled: true,
		cutoutPercentage: 10,
		subtitles: [{
			text: title,
			verticalAlign: "center",
			fontSize: 24,
			dockInsidePlotArea: true
		}],
		data: [{
			type: "doughnut",
			radius: "60%",
			innerRadius: "75%",
			indexLabelFontSize: 12,
			indexLabel: "{name} - {y}",
			// yValueFormatString: "#,###'%'",
			dataPoints: data
		}]
	}

	return (
		<CanvasJSChart
			options={options}
		/>
	)
}

export default DoughnutChart;