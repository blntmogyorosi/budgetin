import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DoughnutChart = ({ title, text, data }) => {
	console.log(data)
	const options = {
		animationEnabled: true,
		title: {
			text: title,
		},
		subtitles: [{
			text: text,
			verticalAlign: "center",
			fontSize: 24,
			dockInsidePlotArea: true
		}],
		data: [{
			type: "doughnut",
			indexLabel: "{name}: {y}",
			// yValueFormatString: "#,###'%'",
			dataPoints: data
		}]
	}

	return (
		<div className="doughnut-chart">
			<CanvasJSChart
				options={options}
			/>
		</div>
	)
}

export default DoughnutChart;