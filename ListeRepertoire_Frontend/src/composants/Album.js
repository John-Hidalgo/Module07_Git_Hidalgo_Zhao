import React from 'react'
import { getAllPieces } from "../requestApi/piece_request.js"
import { useEffect, useState } from "react"

export function Album () {
    const [pieces, setpieces] = useState([])
    useEffect(() => {
        async function fetchData () {
            try {
                const data = await getAllPieces() // appeler api
                setpieces(data) // setState
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

    return (
        <>
            {
                pieces.map((p, index) => {
                    return (
                        <div className='col mb-5' key={index}>
                            <div className='card h-100'>
                                <img id='pht_couvt' className='card-img-top' src={p.url} alt=' '></img>
                                <div className='card-body p-4'>
                                    <div className='text-center'>
                                        <h5 id='titre' fontSize="16px" className='fw-bolder'>{p.titre}</h5>
                                        <p id='artiste' fontSize="14px" className=''>{p.artiste}</p>
                                        <i id='categorie' fontSize="14px" className=''>{p.categorie}</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}
