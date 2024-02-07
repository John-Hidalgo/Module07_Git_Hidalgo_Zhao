import { useEffect, useState } from 'react'

const Commandes = () =>
{
    const [ commandes, setCommandes ] = useState([]);
    useEffect(() =>{
        const obtiensCommandes = async () =>
        {
            try
            {
                //console.log("calling fetch");
                const reponse = await fetch('/api/commandes');
                const data = await reponse.json();
                setCommandes(data);
            }
            catch (erreur)
            {
                console.error(erreur);
            }
        };
        obtiensCommandes();
    },[]);
    return commandes;
}

export default Commandes