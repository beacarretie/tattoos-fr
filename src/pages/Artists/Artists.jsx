import { useState } from "react"
import { bringAllArtists, bringArtistById } from "../../services/apiCalls"
import "./Artists.css"
import { ArtistCard } from "../../components/ArtistCard/ArtistCard"

export const Artists = () => {
    const [artists, setArtists] = useState([])
    const bringArtists = /*async*/ () => {

        // const apiResponse = await bringAllArtists()
        // lógica que me convenga usar

        bringAllArtists()
        .then((res) => {
            setArtists(res)
            console.log(res)
        })
        .catch((error) => {
            console.log(error, "ups")
        })
    }

    const artistCardClickHandler = (char) => {
        bringArtistById(char.id)
        .then((res) => {
            console.log(res)
        })
    }

    return (

        <div className="artists-design">
            HOLA, AQUI HABRA ARTISTAS
            <button onClick={bringArtists}>TRAER ARTISTAS</button>
            <ol>
                {artists.map((char) => {
                    return (
                        <ArtistCard key={char.id} 
                        artist={char}
                        handleClick={() => artistCardClickHandler(char)}
                        />
                    )
                })}       
            </ol>
        </div>
    )
}