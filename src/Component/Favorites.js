import React from 'react'
import './styles/main.scss'
import PropTypes from 'prop-types'

const Favorites = ({ favorites, removeFavorite, activePage, addFavorites }) => {
  const cards = favorites.map((favorite) => {
    if (favorite.category === 'characters') {
      return (
      <div className="character-card card">
        <h1>{favorite.name}</h1>
        <p> {favorite.homeworld} </p>
      </div>
      )
    }
    if (favorite.category === 'planets') {
       return (
      <div className="character-card card">
        <h1>{favorite.planet}</h1>
        <p> {favorite.population} </p>
      </div>
      )
    }
    if(favorite.category === 'vehicles') {
       return (
      <div className="character-card card">
        <h1>{favorite.name}</h1>
        <p> {favorite.class} </p>
      </div>
      )
    }
})

return (
  <section className="cardContainer">
    {cards}
  </section>
)

}

Favorites.propTypes = {
  favorites: PropTypes.array.isRequired,
  removeFavorite: PropTypes.func.isRequired
}

export default Favorites
