function ListOfMovies({movies}) {
  return (
    <ul className="movies">
    {
      movies.map(m => (
        <li className="movie" key={m.id}>
          <h3>{m.title}</h3>
          <p>{m.year}</p>
          <img src={m.poster} alt={`Image of ${m.title}`} />
        </li>
      ))
    }
  </ul> 
  )
}

function NoMoviesResult(){
    return (
        <p>No result</p>
    )
}

export function Movies({movies}){
    
    const hasMovies = movies?.length > 0

    return (
        hasMovies
        ? <ListOfMovies movies={movies} />
        : <NoMoviesResult/>   
    ) 
}
