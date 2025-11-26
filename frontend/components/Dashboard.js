'use client';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import FilterPanel from './FilterPanel';
import StatisticsCards from './StatisticsCards';
import ChartsSection from './ChartsSection';
import DataTable from './DataTable';
import { api } from '@/services/api';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [statistics, setStatistics] = useState({});
  const [filterOptions, setFilterOptions] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    loadStatistics();
    loadFilterOptions();
  }, []);

  useEffect(() => {
    loadData();
  }, [filters]);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await api.getData(filters);
      setData(response.data.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStatistics = async () => {
    try {
      const response = await api.getStatistics();
      setStatistics(response.data);
    } catch (error) {
      console.error('Error loading statistics:', error);
    }
  };

  const loadFilterOptions = async () => {
    try {
      const response = await api.getFilters();
      setFilterOptions(response.data);
    } catch (error) {
      console.error('Error loading filters:', error);
    }
  };

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="h2 mb-0">📊 Data Visualization Dashboard</h1>
            <Nav variant="pills" activeKey={activeTab} onSelect={setActiveTab}>
              <Nav.Item>
                <Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="data">Raw Data</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </Col>
      </Row>

      {/* Statistics Cards */}
      <StatisticsCards statistics={statistics} />

      <Row>
        {/* Filters Sidebar */}
        <Col lg={3} className="mb-4">
          <FilterPanel 
            filters={filters}
            setFilters={setFilters}
            filterOptions={filterOptions}
          />
        </Col>

        {/* Main Content */}
        <Col lg={9}>
          {activeTab === 'dashboard' ? (
            <ChartsSection statistics={statistics} />
          ) : (
            <DataTable data={data} loading={loading} />
          )}
        </Col>
      </Row>
    </Container>
  );
}