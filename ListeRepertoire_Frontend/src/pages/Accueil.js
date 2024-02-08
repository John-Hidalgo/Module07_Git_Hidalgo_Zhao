import React from "react"
import { Album } from "../composants/Album.js"
import { Footer } from "../composants/Footer.js"
export function Accueil () {
    return (
        <>
            <header className="bg-dark py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">Shop Musique de caractère</h1>
                        <p className="lead fw-normal text-white-50 mb-0">Choisissez votre propre album de musique</p>
                    </div>
                </div>
            </header>
            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <div id="myBody" className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        <Album />
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}