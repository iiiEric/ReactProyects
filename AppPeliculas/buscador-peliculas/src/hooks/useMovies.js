import { useRef, useState, useMemo } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies( {sort} ){

    /*
    const initialMovies = () => {
      const localStorageCart = localStorage.getItem('ls_movies')
      return localStorageCart ? JSON.parse(localStorageCart) : []
    }
    const [movies, SetMovies] = useState(initialMovies)
    */
    const [movies, SetMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const previousSearch = useRef()

    /*
    useEffect(() => {
      localStorage.setItem('ls_movies', JSON.stringify(movies))
    }, [movies])
    */

    const getMovies = async ({query}) => {

      if (query === previousSearch.current)
        return

      try
      {
        setLoading(true)
        previousSearch.current = query
        const newMovies = await searchMovies( {query} )
        SetMovies(newMovies)
      }
      catch (e){
        throw new Error(e.message)
      }
      finally{
        setLoading(false)
      }
    }

    const sortedMovies = useMemo(() => {
      return sort 
      ? [...movies].sort((a, b) => new Date(a.year) - new Date(b.year))
      : movies
    }, [movies, sort])
  
    return { movies: sortedMovies, getMovies, loading }
  }