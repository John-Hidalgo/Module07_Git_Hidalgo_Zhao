import React from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from "react"
import { ListePieces } from "../composants/ListePieces"
import Repertoire from "../composants/Repertoire"

export function Admin () {
    const [repertoire, setrepertoire] = useState(Repertoire())

    function deletePiece () {
        //

    }


    function modifierPiece () {
        //

    }


    return (
        <ListePieces pieces={repertoire} handlClickDelete={deletePiece} handlClickModifier={modifierPiece} />
    )


}