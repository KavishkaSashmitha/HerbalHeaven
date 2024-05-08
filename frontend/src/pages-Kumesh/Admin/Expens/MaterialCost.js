import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  Image,
} from '@react-pdf/renderer';

const URL = 'http://localhost:8070/sup/materialCost';

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function MaterialCost() {
  const [employees, setEmployees] = useState([]);
  const [totalMaterialCost, setTotalMaterialCost] = useState(0);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchHandler()
      .then((data) => {
        if (data && data.employees) {
          setEmployees(data.employees);
          calculateTotalMaterialCost(data.employees);
        } else {
          setError('No data found');
        }
      })
      .catch((error) => {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      });
  }, []);

  const calculateTotalMaterialCost = (employees) => {
    let total = 0;
    employees.forEach((employee) => {
      if (employee.materialCost) {
        Object.values(employee.materialCost).forEach((cost) => {
          if (cost !== null && typeof cost !== 'undefined') {
            total += cost;
          }
        });
      }
    });
    setTotalMaterialCost(total);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Filter employees based on search query
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-green-100 p-6 rounded-lg shadow-md">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchInputChange}
        placeholder="Search by employee name..."
        className="px-4 py-2 border border-gray-300 rounded-md mb-6"
      />
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Expense Details Regarding Materials{' '}
        </h1>
        <PDFDownloadLink
          document={
            <ReportDocument
              employees={filteredEmployees}
              totalMaterialCost={totalMaterialCost}
            />
          }
          fileName="material_cost_report.pdf"
        >
          {({ blob, url, loading, error }) => (
            <button
              className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded inline-flex items-center"
              disabled={loading}
              style={{ marginTop: '-200px' }} // Adjust the negative value to move it up further
            >
              {loading ? 'Generating PDF...' : 'Generate Report'}
            </button>
          )}
        </PDFDownloadLink>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-green-500">
          <thead className="bg-green-400 text-white text-lg">
            <tr>
              <th className="px-6 py-4 text-left font-medium uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-4 text-left font-medium uppercase tracking-wider">
                Material Cost
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-green-200' : 'bg-green-300'}
              >
                <td className="px-6 py-4">{employee.name}</td>
                <td className="px-6 py-4">
                  <ul className="list-disc list-inside">
                    {employee.materialCost ? (
                      Object.entries(employee.materialCost).map(
                        ([month, materialCost]) => (
                          <li key={month} className="text-green-800">
                            {`${month}: LKR ${materialCost ? materialCost.toFixed(2) : '-'}`}
                          </li>
                        )
                      )
                    ) : (
                      <li className="text-red-600">-</li>
                    )}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-green-400">
            <tr>
              <td className="px-6 py-4 text-left font-medium uppercase tracking-wider">
                Total Material Cost
              </td>
              <td className="px-6 py-4 text-lg font-bold">
                LKR {totalMaterialCost.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

// Define your ReportDocument component
const ReportDocument = ({ employees, totalMaterialCost }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Material Cost Report</Text>
        <Image
          style={styles.logo}
          src={require('../../../assets/logo-1.png')}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.totalCost}>
          Total Material Cost: LKR {totalMaterialCost.toFixed(2)}
        </Text>
        <Text style={styles.subHeader}>Employee-wise Material Costs:</Text>
        {employees.map((employee, index) => (
          <Text key={index} style={styles.employeeText}>
            {`${employee.name}: ${Object.entries(employee.materialCost || {})
              .map(([month, cost]) => `${month}: LKR ${cost || '-'}`)
              .join(', ')}`}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);

const styles = {
  page: {
    padding: 20,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logo: {
    width: 200,
    height: 200,
  },
  content: {
    marginBottom: 20,
  },
  totalCost: {
    fontSize: 16,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  employeeText: {
    fontSize: 12,
  },
};

export default MaterialCost;
