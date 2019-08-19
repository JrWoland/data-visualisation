import React from 'react';
import { ResponsiveBarCanvas } from '@nivo/bar';
import './Currency.css'

const Currency = (props) => {



  return (
    <>
    <div className='container currency'>
      <p className='title'>The number of countries using a given currency</p>
      <ResponsiveBarCanvas
        data={props.data.currencyData.sort((a, b, by = 'currency') => (a[by] > b[by]) ? 1 : ((b[by] > a[by]) ? -1 : 0))} //sort by currency
        keys={['currencyCode', 'currency']}
        indexBy="currencyCode"
        margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
        pixelRatio={1}
        padding={0.15}
        innerPadding={0}
        minValue="auto"
        maxValue="auto"
        groupMode="stacked"
        layout="horizontal"
        reverse={false}
        colors={{ scheme: 'accent' }}
        colorBy="id"
        borderWidth={0}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={{ tickSize: 0, tickPadding: 0, tickRotation: 0, legend: '', legendOffset: -20 }}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'number of countries',
          legendPosition: 'middle',
          legendOffset: 36
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'currency',
          legendPosition: 'middle',
          legendOffset: -40
        }}
        enableGridX={true}
        enableGridY={false}
        enableLabel={true}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        isInteractive={true}
      />
    </div >
      <div className="container summary">
        <h2>Summary</h2>
        <p>Number of countries: {props.data.numberOfCountries} (independent: {props.data.numberOfCountriesIndependent})</p>
        <p>Number of countries with EUR currency: {props.data.numberOfCountriesWithEURCurrency}</p>
      </div>
      </>
  )

}

export default Currency;