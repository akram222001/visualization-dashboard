import { Row, Col, Card } from 'react-bootstrap';

export default function StatisticsCards({ statistics }) {
  const cards = [
    {
      title: 'Total Records',
      value: statistics.totalRecords || 0,
      variant: 'primary',
      icon: '📊'
    },
    {
      title: 'Sectors',
      value: statistics.totalSectors || 0,
      variant: 'success',
      icon: '🏢'
    },
    {
      title: 'Countries',
      value: statistics.totalCountries || 0,
      variant: 'info',
      icon: '🌍'
    },
    {
      title: 'Avg Intensity',
      value: statistics.intensityStats?.avg ? statistics.intensityStats.avg.toFixed(2) : '0',
      variant: 'warning',
      icon: '⚡'
    }
  ];

  return (
    <Row className="g-3 mb-4">
      {cards.map((card, index) => (
        <Col xs={12} sm={6} lg={3} key={index}>
          <Card className={`border-${card.variant} custom-card h-100`}>
            <Card.Body className="text-center">
              <div className="fs-2 mb-2">{card.icon}</div>
              <Card.Title className="h4">{card.value}</Card.Title>
              <Card.Text className="text-muted">{card.title}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}