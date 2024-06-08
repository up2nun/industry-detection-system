import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './DataViewer.module.scss';

interface DataRow {
  [key: string]: string;
}

const DataViewer: React.FC = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 14;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('Dataset.csv');
        const parsedData = parseCSV(response.data);
        setData(parsedData);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchData();
  }, []);

  const parseCSV = (csv: string): DataRow[] => {
    const lines = csv.split('\n');
    const result: DataRow[] = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
      const obj: DataRow = {};
      const currentLine = lines[i].split(',');

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j];
      }

      result.push(obj);
    }

    return result;
  };

  const handleClickPrevious = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleClickNext = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(data.length / rowsPerPage)));
  };

  const renderRows = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const slicedData = data.slice(startIndex, endIndex);

    return slicedData.map((row, index) => (
      <tr key={index}>
        {Object.values(row).map((value, index) => (
          <td key={index}>{value}</td>
        ))}
      </tr>
    ));
  };

  return (
    <div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {Object.keys(data[0] || {}).map((key, index) => (
                <th key={index}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {renderRows()}
          </tbody>
        </table>
      </div>
      <div className={styles.navigationButtons}>
        <button className={styles.button} onClick={handleClickPrevious} disabled={currentPage === 1}>
          Предыдущая
        </button>
        <button className={styles.button} onClick={handleClickNext} disabled={currentPage === Math.ceil(data.length / rowsPerPage)}>
          Следующая
        </button>
      </div>
    </div>
  );
};

export default DataViewer;
