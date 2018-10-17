import React from 'react';
var LineChart = require("react-chartjs").Line;

const stockChart = ({chartLabels, chartData}) => {
    const data = {
        labels:chartLabels,
        datasets:[
            {
                label:'History (Past Month)',
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data:chartData
            }
        ]
    }

        return(
            <div className="pa3 ma3">
                <LineChart data={data} width="600" height="250"/>
            </div>
        );
    
}

export default stockChart;