import { Card, Table, Badge, Spinner } from 'react-bootstrap';

export default function DataTable({ data, loading }) {
  const getIntensityVariant = (intensity) => {
    if (intensity > 50) return 'danger';
    if (intensity > 25) return 'warning';
    return 'success';
  };

  return (
    <Card className="custom-card">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <Card.Title className="mb-0">Data Records</Card.Title>
        {loading && <Spinner animation="border" size="sm" />}
      </Card.Header>
      <Card.Body className="p-0">
        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
          <Table striped bordered hover responsive className="mb-0">
            <thead className="bg-light position-sticky top-0">
              <tr>
                <th>Title</th>
                <th>Sector</th>
                <th>Topic</th>
                <th>Intensity</th>
                <th>Likelihood</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item._id || index}>
                  <td style={{ maxWidth: '300px' }} className="text-truncate" title={item.title}>
                    {item.title}
                  </td>
                  <td>
                    <Badge bg="primary">{item.sector}</Badge>
                  </td>
                  <td>{item.topic}</td>
                  <td>
                    <Badge bg={getIntensityVariant(item.intensity)}>
                      {item.intensity}
                    </Badge>
                  </td>
                  <td>{item.likelihood}</td>
                  <td>{item.country}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          
          {data.length === 0 && !loading && (
            <div className="text-center py-5 text-muted">
              No data found with current filters
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}