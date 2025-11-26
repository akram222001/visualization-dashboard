import { Card, Form, Button, Row, Col } from 'react-bootstrap';

export default function FilterPanel({ filters, setFilters, filterOptions }) {
  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  return (
    <Card className="custom-card">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Filters</h5>
        <Button variant="outline-danger" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </Card.Header>
      <Card.Body>
        <Row className="g-3">
          {/* Sector Filter */}
          <Col xs={12}>
            <Form.Group>
              <Form.Label>Sector</Form.Label>
              <Form.Select 
                value={filters.sector || ''}
                onChange={(e) => updateFilter('sector', e.target.value)}
              >
                <option value="">All Sectors</option>
                {filterOptions.sectors?.map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Topic Filter */}
          <Col xs={12}>
            <Form.Group>
              <Form.Label>Topic</Form.Label>
              <Form.Select 
                value={filters.topic || ''}
                onChange={(e) => updateFilter('topic', e.target.value)}
              >
                <option value="">All Topics</option>
                {filterOptions.topics?.map(topic => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Region Filter */}
          <Col xs={12}>
            <Form.Group>
              <Form.Label>Region</Form.Label>
              <Form.Select 
                value={filters.region || ''}
                onChange={(e) => updateFilter('region', e.target.value)}
              >
                <option value="">All Regions</option>
                {filterOptions.regions?.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Country Filter */}
          <Col xs={12}>
            <Form.Group>
              <Form.Label>Country</Form.Label>
              <Form.Select 
                value={filters.country || ''}
                onChange={(e) => updateFilter('country', e.target.value)}
              >
                <option value="">All Countries</option>
                {filterOptions.countries?.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          {/* PESTLE Filter */}
          <Col xs={12}>
            <Form.Group>
              <Form.Label>PESTLE</Form.Label>
              <Form.Select 
                value={filters.pestle || ''}
                onChange={(e) => updateFilter('pestle', e.target.value)}
              >
                <option value="">All PESTLE</option>
                {filterOptions.pestles?.map(pestle => (
                  <option key={pestle} value={pestle}>{pestle}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Source Filter */}
          <Col xs={12}>
            <Form.Group>
              <Form.Label>Source</Form.Label>
              <Form.Select 
                value={filters.source || ''}
                onChange={(e) => updateFilter('source', e.target.value)}
              >
                <option value="">All Sources</option>
                {filterOptions.sources?.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}