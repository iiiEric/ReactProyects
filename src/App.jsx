import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useEffect, useRef, useState } from 'react' //useRef persiste su valor entre renderizados

function App() {
  const [sort, setSort] = useState(false)
  const { movies, getMovies, loading } = useMovies( {sort} )
  // (fc) const [query, setQuery] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    /* forma no controlada --> no se renderiza cada vez que se escriba algo en el input, más rápido y eficiente */
    const { query } = Object.fromEntries(new FormData(event.target))
    if (query === ''){
      toast.error("Movie name is necessary");
      return
    }
    
    getMovies({query})

    //forma controlada (fc)
    /*
    if (query === ''){ //tmb añadir required al input
      toast.error("Movie name is necessary");
      return
    }
    */
  }

  const handleSort = () => {
    setSort(!sort)
  }

  /* (fc)
  const handleChange = (event) => {
    setQuery(event.target.value)
  }
  */

  return (
    <>
      <div className='page'>
        <header>
          <h1>Movies search</h1>
          <form className='form' onSubmit={handleSubmit}>
          <div className="group">
            <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
            <input name='query' placeholder="Avengers, Harry Potter..." type="text" className="input" /* (fc) value={query} onChange={handleChange} *//>
          </div>
            <input type='submit' name='searchButton' value='Search' />
          </form>
          <div>
            <input className='sort' type='checkbox' onChange={handleSort} checked={sort}/> Order by date
          </div>
        </header>

        <main className='main'>
          {
            loading 
              ? <div className="spinner">
                  <div className="bounce1"></div>
                  <div className="bounce2"></div>
                  <div className="bounce3"></div>
                </div>
              : <Movies movies={movies}/>
          }     
        </main>
      </div>

      <ToastContainer />
    </>
  )
}

export default App
