// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { FaMicrochip } from 'react-icons/fa';
//import axios from 'axios';

import {
  Navbar,
  Nav,
  Container,
  Card,
  Table,
  Button,
  Spinner,
} from 'react-bootstrap';
import {
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import Inicio from './Inicio';
import Spring from './Spring';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [jiraData, setJiraData] = useState(null);
  const [loading, setLoading] = useState(false);

  const actualizarJira = () => {
    setLoading(true);
    fetch('https://systechsa.atlassian.net/rest/api/latest/issues') // Reemplazá esta URL
      .then((res) => res.json())
      .then((data) => {
        console.log('Datos desde JIRA:', data);
        setJiraData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al obtener datos de JIRA:', err);
        setLoading(false);
      });
  };


  const projectStatus = [
    { name: 'EN CURSO', value: 5 },
    { name: 'EN RIESGO', value: 2 },
    { name: 'FUERA DE CURSO', value: 1 },
  ];

  const timeToFirstResponse = [
    { name: 'Ene', time: 20 },
    { name: 'Feb', time: 30 },
    { name: 'Mar', time: 18 },
  ];

  const pendingTasks = [
    { assignee: 'Carlos Puente', task: 'Revisar lista de bebidas para el miércoles', due: 'Mié, 27 Mar' },
    { assignee: 'Íñigo González', task: 'Diseñar maqueta del tour espacial', due: 'Vie, 29 Mar' },
    { assignee: 'Alguien', task: 'Crear notificación por correo', due: 'Mié, 06 Dic' },
  ];


  const renderContent = () => {
    switch (activeTab) {
      case 'inicio':
        return (
          <Inicio />
        );
      case 'tareas':
        return (
          <div className="row">
            <div className="col-md-6 mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Tareas Pendientes</Card.Title>
                  <Button variant="primary" onClick={actualizarJira} className="mb-3">
                    {loading ? <Spinner size="sm" animation="border" /> : 'Actualizar desde JIRA'}
                  </Button>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>Responsable</th>
                        <th>Tarea</th>
                        <th>Para</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(jiraData || pendingTasks).map((task, idx) => (
                        <tr key={idx}>
                          <td>{task.assignee}</td>
                          <td>{task.task}</td>
                          <td>{task.due}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </div>
          </div>
        );
      case 'sprint':
        return (
          <Spring />
        );
      case 'configuracion':
        return (
          <div className="row">
            <div className="col-md-6 mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Estado del Proyecto</Card.Title>
                  <PieChart width={300} height={200}>
                    <Pie
                      data={projectStatus}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {projectStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-6 mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Tiempo hasta primera respuesta</Card.Title>
                  <LineChart width={300} height={200} data={timeToFirstResponse}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="time" stroke="#82ca9d" />
                  </LineChart>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-6 mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Tickets de Soporte Pendientes</Card.Title>
                  <h3>26%</h3>
                  <p className="text-muted">144 de 558</p>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-6 mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Indicadores de Fórmula</Card.Title>
                  <p>Soporte gastado: <strong>$62.34k</strong></p>
                  <p>Tiempo por ticket: <strong>33.52 horas</strong></p>
                </Card.Body>
              </Card>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar bg="bg-dark text-light" variant="bg-dark text-light" expand="lg" className="mb-4 shadow-sm">
        <Container>
          <Navbar.Brand href="#home">
            <FaMicrochip className="me-2" />
            Panel de Control
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => setActiveTab('inicio')}>Inicio</Nav.Link>
              <Nav.Link onClick={() => setActiveTab('tareas')}>Tareas</Nav.Link>
              <Nav.Link onClick={() => setActiveTab('sprint')}>Sprint</Nav.Link>
              <Nav.Link onClick={() => setActiveTab('configuracion')}>Configuración</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container mb-5">{renderContent()}</div>
      <footer className="text-center py-3 bg-dark text-light"
        style={{ position: 'fixed', bottom: 0, width: '100%' }}>
        <small>© 2025 Tu Empresa. Todos los derechos reservados.</small>
      </footer>
    </>
  );
}
