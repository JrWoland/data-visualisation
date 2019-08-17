import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import './Population.css'

// const data = [

//     {
//         "id": "japan",
//         "color": "hsl(67, 70%, 50%)",
//         "data": [
//             {
//                 x: 2000,
//                 y: 242
//             },
//             {
//                 "x": 2001,
//                 "y": 200
//             },

//         ]
//     }]
const Population = (props) => {

    let dataToDisplay = [
        {
            "id": "Poland",
            "color": "hsl(67, 70%, 50%)",
            "data": props.data.populationData === undefined ? [{ x: 0, y: 0 }] : props.data.populationData
        }
    ]

    return (
        <div className='container'>
            <ResponsiveLine
                data={dataToDisplay}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -60,
                    legend: 'year',
                    legendOffset: 40,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'population (mln)',
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
                colors={{ scheme: 'nivo' }}
                enablePoints={false}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabel="y"
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
    )
}

export default Population;