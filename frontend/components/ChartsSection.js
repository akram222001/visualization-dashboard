'use client';
import { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { api } from '@/services/api';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function ChartsSection({ statistics }) {
  const [chartData, setChartData] = useState({});
  console.log("chartData",chartData)

useEffect(() => {
  const loadChartData = async () => {
    try {
      const [intensityRes, countryRes, sectorRes] = await Promise.all([
        api.getCharts('intensity'),
        api.getCharts('country'),
        api.getCharts('sector')
      ]);
      
      setChartData({
        intensity: intensityRes.data,
        country: countryRes.data,
        sector: sectorRes.data
      });
    } catch (error) {
      console.error('Error loading chart data:', error);
    }
  };
  loadChartData();
}, []);

  return (
    <Row className="g-4">
      {/* Intensity Chart */}
      <Col xs={12} lg={6}>
        <Card className="custom-card h-100">
          <Card.Header>
            <Card.Title className="mb-0">Average Intensity by Sector</Card.Title>
          </Card.Header>
          <Card.Body>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.intensity || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" name="Average Intensity" />
              </BarChart>
            </ResponsiveContainer>
          </Card.Body>
        </Card>
      </Col>

      {/* Country Distribution */}
      <Col xs={12} lg={6}>
        <Card className="custom-card h-100">
          <Card.Header>
            <Card.Title className="mb-0">Records by Country</Card.Title>
          </Card.Header>
          <Card.Body>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.country || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" name="Record Count" />
              </BarChart>
            </ResponsiveContainer>
          </Card.Body>
        </Card>
      </Col>

      {/* Sector Distribution Pie Chart */}
      <Col xs={12} lg={6}>
        <Card className="custom-card h-100">
          <Card.Header>
            <Card.Title className="mb-0">Sector Distribution</Card.Title>
          </Card.Header>
          <Card.Body>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData.sector || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ _id, value }) => `${_id}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.sector?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card.Body>
        </Card>
      </Col>

      {/* Statistics Metrics */}
      <Col xs={12} lg={6}>
        <Card className="custom-card h-100">
          <Card.Header>
            <Card.Title className="mb-0">Data Metrics</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row className="g-3">
              <Col xs={6}>
                <div className="text-center p-3 bg-primary bg-opacity-10 rounded">
                  <h6 className="text-muted">Avg Intensity</h6>
                  <h4 className="text-primary">
                    {statistics.intensityStats?.avg ? statistics.intensityStats.avg.toFixed(2) : '0'}
                  </h4>
                </div>
              </Col>
              <Col xs={6}>
                <div className="text-center p-3 bg-success bg-opacity-10 rounded">
                  <h6 className="text-muted">Max Intensity</h6>
                  <h4 className="text-success">
                    {statistics.intensityStats?.max || '0'}
                  </h4>
                </div>
              </Col>
              <Col xs={6}>
                <div className="text-center p-3 bg-info bg-opacity-10 rounded">
                  <h6 className="text-muted">Avg Likelihood</h6>
                  <h4 className="text-info">
                    {statistics.likelihoodStats?.avg ? statistics.likelihoodStats.avg.toFixed(2) : '0'}
                  </h4>
                </div>
              </Col>
              <Col xs={6}>
                <div className="text-center p-3 bg-warning bg-opacity-10 rounded">
                  <h6 className="text-muted">Total Regions</h6>
                  <h4 className="text-warning">
                    {statistics.totalRegions || '0'}
                  </h4>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}