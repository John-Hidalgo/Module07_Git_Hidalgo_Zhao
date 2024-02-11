import { useEffect, useState } from 'react'

const Commandes = () => {
    const [commandes, setCommandes] = useState([])
    useEffect(() => {
        const obtiensCommandes = async () => {
            try 
            {
                console.log("calling commandes for top 5");
                const reponse = await fetch('/api/commandes');
                const data = await reponse.json();
                console.log("within fetch", data);
                setCommandes(data);
            }
            catch (erreur) 
            {
                console.error(erreur);
            }
        }
        obtiensCommandes()
    }, [])
    return commandes
}

export default Commandes