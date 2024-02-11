import { useEffect, useState } from 'react'

const CommandesActifs = () =>
{
    const [ commandes, setCommandes ] = useState([]);
    useEffect(() =>{
        const obtiensCommandes = async () =>
        {
            try
            {
                //console.log("calling fetch");
                const reponse = await fetch('/api/commandes/actif');
                const data = await reponse.json();
                console.log(data)
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

export default CommandesActifs