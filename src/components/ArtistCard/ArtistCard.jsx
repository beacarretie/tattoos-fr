import "./ArtistCard.css"

export const ArtistCard = ({ artist, handleClick }) => {

    return (
        <div className="artist-card" onClick={handleClick}>
            <h4>{artist.name}</h4>
            <h5>{artist.species}</h5>
            <img src={artist.image}></img>
        </div>
    )
}