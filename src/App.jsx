import React, { useEffect, useState } from 'react';

const PAGE_SIZE = 10;

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then(response => {
        if (!response.ok) throw new Error('Fetch failed');
        return response.json();
      })
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setFetchError(true);
        setLoading(false);
        alert('failed to fetch data');
      });
  }, []);

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageData = data.slice(start, end);

  if (loading) return <div>Loading...</div>;
  if (fetchError) return <div>Error occurred.</div>;

  return (
    <div>
      <table border="1" cellPadding="5" cellSpacing="0" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Role</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '10px' }}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >Previous</button>
        <span style={{ margin: '0 10px' }}>{page} / {totalPages}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >Next</button>
      </div>
    </div>
  );
}

export default App;