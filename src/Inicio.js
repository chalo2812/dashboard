// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import {
    Card,
    ProgressBar
} from 'react-bootstrap';

export default function Inicio() {

    const epicProgress = [
        { name: 'Firmware para el Rover', progress: 40 },
        { name: 'Roadmap para Ingeniería', progress: 33 },
        { name: 'Merchandising para NASA', progress: 33 },
        { name: 'Starship en Plutón', progress: 0 },
    ];
    return (
        <>
            <div className="row" id="inicio">
                {epicProgress.map((epic, index) => (
                    <div className="col-md-6 mb-4" key={index}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{epic.name}</Card.Title>
                                <ProgressBar now={epic.progress} label={`${epic.progress}%`} />
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </>
    );
}