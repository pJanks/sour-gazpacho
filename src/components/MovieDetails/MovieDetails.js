import React from 'react';
import './MovieDetails.scss';
import { connect } from 'react-redux';


const MovieDetails = ({ movie, userId, ratings }) => {
  let month;
  const sectionStyle = {
    backgroundImage: `url(${movie.backdrop_path})`
  }
  const formatDate = movie.release_date.split('-')
  for(var i = 0; i < 13; i++) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    if (formatDate[1] === '10') {
      month = 'October'
    } else if (formatDate[1].includes(0)) {
      if(`0${i}` === formatDate[1]) {
        month = months[i - 1]
      }
    } else {
      if (`${i}` === formatDate[1]) {
        month = months[i - 1]
      }
    }
  }

  const mapRating = ratings.find(rating => rating.movie_id === movie.id)

  return (
    <section className="movie-details" style={ sectionStyle }>
      <h1 className='movie-title-detail'>{movie.title}</h1>
      <div className='movie-detail-card'>
        <img src={movie.poster_path} alt='movie poster' className='movie-poster-detail' />
        <h2 className='detail-title'>{movie.title}</h2>
        <h3 className='detail-rating'>Average Rating: {Math.floor(movie.average_rating)}</h3>
        {mapRating && <h3 className='detail-rating'>{`Your Rating: ${mapRating.rating}`}</h3>}
        <h3 className='detail-release'>Release Date: {month} {formatDate[2]}, {formatDate[0]}</h3>
        <p className='detail-summary'>Overview: {movie.overview}</p>
      </div>
    </section>
  )
}

const mapStateToProps = state => ({
  userId: state.user.id,
  ratings: state.ratings
})

export default connect(mapStateToProps)(MovieDetails);
