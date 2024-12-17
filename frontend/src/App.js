import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);

  const handleScrap = async () => {
    try {
      const response = await axios.get('http://localhost:4000/scrap');
      console.log('response>>>>>>>', response);
      setData(response.data); // Set the scraped data
    } catch (error) {
      console.log('error while fetching data', error);
    }
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>

        <h1>Web Scraping</h1>
        {data.length === 0 && <button onClick={handleScrap}>Get the Data</button>}

      </div>

      <div>
        {data.length > 0 ? (
          <table border="1" style={{ marginTop: '40px', width: '80%', textAlign: 'left', margin: "auto" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: "center" }}>No data fetched yet</p>
        )}
      </div>
    </div>
  );
};

export default App;
