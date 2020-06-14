import React, { useEffect } from 'react';
import Chart from 'chart.js';

function Charts(props) {
    const chartRef = React.createRef();
    function getRandomColorHex() {
        var hex = "0123456789ABCDEF",
            color = "#";
        for (var i = 1; i <= 6; i++) {
            color += hex[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    useEffect(() => {
        const ch = chartRef.current.getContext("2d");
        new Chart(ch, {
            type: props.cType,
            data: {
                labels: props.cLabels,
                datasets: [
                    {
                        label: props.cName,
                        data: props.cData,
                        backgroundColor: getRandomColorHex()
                    }
                ],
            },
            options: {
                animation: {
                    duration: 0,
                },
                events: []
            }
        });
    })

    return (
        <canvas
            id="ch"
            ref={chartRef}
            className="chartjs-render-monitor"

        />
    );
}

export default Charts;
