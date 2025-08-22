import {
  Card,
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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Configuracion() {

    const projectStatus = [
        { name: 'EN CURSO', value: 5 }, { name: 'EN RIESGO', value: 2 }, { name: 'FUERA DE CURSO', value: 1 }
    ];

    const timeToFirstResponse = [
        { name: 'Ene', time: 20 }, { name: 'Feb', time: 30 }, { name: 'Mar', time: 18 }
    ];

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
    )
}