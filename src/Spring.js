// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import {
    Card,
    Tooltip,
} from 'react-bootstrap';
import {
    BarChart,
    Bar, 
    XAxis,  
    YAxis
} from 'recharts';

export default function Spring() {

    const sprintVelocity = [
        { name: 'Sprint 1', Comprometido: 4, Completado: 3, Reabierto: 1 },
        { name: 'Sprint 2', Comprometido: 5, Completado: 5, Reabierto: 0 },
    ];

    const sprintGoals = [
        'Implementar barreras inteligentes',
        'Presentar el roadmap',
        'Alinear la página interna',
    ];

    return (
        <>
            <div className="row">
                <div className="col-md-6 mb-4">
                    <Card>
                        <Card.Body>
                            <Card.Title>Objetivos del Sprint</Card.Title>
                            <ul>
                                {sprintGoals.map((goal, i) => (
                                    <li key={i}>{goal}</li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-md-6 mb-4">
                    <Card>
                        <Card.Body>
                            <Card.Title>Velocidad del Sprint</Card.Title>
                            <BarChart width={300} height={200} data={sprintVelocity}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="Comprometido" fill="#8884d8" />
                                <Bar dataKey="Completado" fill="#82ca9d" />
                                <Bar dataKey="Reabierto" fill="#ffc658" />
                            </BarChart>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )
}