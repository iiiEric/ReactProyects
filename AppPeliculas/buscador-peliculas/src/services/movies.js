const api_key = import.meta.env.VITE_FILM_API_KEY

export const searchMovies = async ( {query} ) => {
    try
    {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${api_key}&s=${query}&type=movie`)
        const json = await response.json()
        const movies = json.Search
        return movies?.map(m => (
            {
              id: m.imdbID,
              title: m.Title,
              year: m.Year,
              poster: m.Poster
            }
          ))
    } catch (e) {
        throw new Error('Error searching movies')
    }   
}