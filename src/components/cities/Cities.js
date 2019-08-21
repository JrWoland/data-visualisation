import React from 'react';
import { ResponsiveBarCanvas } from '@nivo/bar';
import './Cities.css'

const Cities = (props) => {
  return (
    <>
      <div className='container'>
        <p className='title'>Cities in SA Countries</p>
        <ResponsiveBarCanvas
          data={props.data.cities}
          keys={['country', 'cities']}
          indexBy="country"
          margin={{ top: 50, right: 60, bottom: 130, left: 60 }}
          pixelRatio={1}
          padding={0.15}
          innerPadding={0}
          minValue="auto"
          labelFormat='x'
          maxValue="auto"
          groupMode="stacked"
          layout="vertical"
          reverse={false}
          colors={{ scheme: 'accent' }}
          colorBy="y"
          borderWidth={0}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -30,
            legend: 'number of cities',
            legendPosition: 'middle',
            legendOffset: 56
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Country',
            legendPosition: 'middle',
            legendOffset: -40
          }}
          enableGridX={true}
          enableGridY={true}
          enableLabel={true}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          isInteractive={true}
        />
      </div >
    </>
  )

}

export default Cities;