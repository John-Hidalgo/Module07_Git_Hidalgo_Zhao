import React from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from "react"
import Table from 'react-bootstrap/Table';
export function ListePieces ({ pieces, handlClickDelete, handlClickModifier }) {
    return (
        <Table>{
            pieces.map((p, index) => {
                <Row>
                    <Col>
                        <div>{p.titre}</div>
                    </Col>
                    <Col>
                        <div>{p.artiste}</div>
                    </Col>
                    <Col>
                        <div>{p.categorie}</div>
                    </Col>
                    <Col>
                        <Button alt={index} variant="danger" onClick={() => handlClickDelete(index)} size="sm" className="m-1">Delete</Button>
                    </Col>
                    <Col>
                        <Button alt={index} variant="warning" onClick={() => handlClickModifier(index)} size="sm" className="m-1">Modifier</Button>
                    </Col>
                </Row>
            })}
        </Table >
    )
}