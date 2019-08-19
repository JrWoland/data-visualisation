import React from 'react'
import './Geomap.css'
import { ResponsiveChoroplethCanvas  } from '@nivo/geo'
import countries from './countries.json'

const Geomap = (props) => {
    return(
    <div className="container geo">
        <p className='title'>World Population 2016</p>
        <ResponsiveChoroplethCanvas 
        data={props.data.populationDataWorld}
        features={countries.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors="YlGn"
        domain={[ 0, 200000000 ]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".3s"
        projectionScale={110}
        projectionTranslation={[ 0.5, 0.6 ]}
        projectionRotation={[ 0, 0, 0 ]}
        enableGraticule={true}
        graticuleLineColor="#dddddd"
        borderWidth={0.5}
        borderColor="#152538"
        legends={[
            {
                anchor: 'bottom-left',
                direction: 'column',
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemTextColor: '#444444',
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000000',
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

export default Geomap