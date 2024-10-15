import { Line } from 'react-chartjs-2';
import 'src/shared/ui/Charts/Charts.scss'

export default function ChartIpr() {
  const iprData = {
    labels: ['0', '2', '4', '6', '8'],
    datasets: [
      {
        label: 'IPR',
        data: [7, 7, 7, 7, 7],
        backgroundColor: 'white',
        borderColor: 'rgba(66, 67, 75, .5)',
        borderWidth: 5,
        fill: false,
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  };

  const options = {
    layout: {
      padding: {
        top: 0,
        left: 30,
        right: 0,
        bottom: 80,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
      },
    },
    scales: {
      x: {
        title: {
          display: false,
        },
        min: 0,
        max: 10,
      },
      y: {
        title: {
          display: true,
          text: 'Выполнение',
        },
        min: 0,
        max: 40,
      },
    },
  };

  const renderChart = () => {
    return (
      <>
        <Line
          data={iprData}
          options={options}
          width={492}
          height={252}
        />
        <div className='charts__percent'>
          <div className='charts__percent_container'>
            <p className='charts__percent_number'>0</p>
            <p className='charts__percent_number'>50</p>
            <p className='charts__percent_number'>100</p>
          </div>
          <p className='charts__percent__text'>Выполнение ИПР на сегодня</p>
        </div>
      </>
    );
  };
  return renderChart();
}