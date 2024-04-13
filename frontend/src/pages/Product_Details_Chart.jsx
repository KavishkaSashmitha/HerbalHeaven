import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import Chart from 'react-apexcharts';
import { Square3Stack3DIcon } from '@heroicons/react/24/outline';

const BarChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    series: [[]],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8070/api/directorders');
        const data = await response.json();
        console.log('Data from API:', data); // Log the data received from the API

        // Process data to extract product names and quantities
        const productQuantities = {};

        data.forEach((order) => {
          order.items.forEach((item) => {
            const productName = item.productId;
            const quantity = item.quantity;

            console.log('Product:', productName, 'Quantity:', quantity); // Log each product and its quantity

            if (!productQuantities[productName]) {
              productQuantities[productName] = 0;
            }
            productQuantities[productName] += quantity;
          });
        });

        console.log('Product Quantities:', productQuantities); // Log the final product quantities

        // Prepare data for chart
        const productNames = Object.keys(productQuantities);
        const quantities = Object.values(productQuantities);

        console.log('Product Names:', productNames); // Log the product names
        console.log('Quantities:', quantities); // Log the quantities

        setChartData({
          labels: productNames,
          series: [quantities],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartConfig = {
    type: 'bar',
    height: 240,
    series: chartData.series,
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: '',
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#020617'],
      plotOptions: {
        bar: {
          columnWidth: '40%',
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: '#616161',
            fontSize: '12px',
            fontFamily: 'inherit',
            fontWeight: 400,
          },
        },
        categories: chartData.labels,
      },
      yaxis: {
        labels: {
          style: {
            colors: '#616161',
            fontSize: '12px',
            fontFamily: 'inherit',
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: '#dddddd',
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: 'dark',
      },
    },
  };

  return (
    <Card>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
          <Square3Stack3DIcon className="h-6 w-6" />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">
            Bar Chart
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="max-w-sm font-normal"
          >
            Visualize your data in a simple way using the
            @material-tailwind/react chart plugin.
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
};

export default BarChart;
