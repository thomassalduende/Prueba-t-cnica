import { useState, useMemo } from 'react'
import './App.css'
import { SortBy, type User } from './types.d'
import { UsersList } from './components/UsersList'
import { useUser } from './hook/useUser'



function App() {

  const { isError, isLoading, users, refetch, fetchNextPage, hasNextPage } = useUser()

  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const SortCountry = () => {
    const newSortingValue = sorting == SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }
  //Filtrar por country
  const filteredUsers = useMemo(() => {
    return typeof filterCountry == 'string' && filterCountry.length > 0
      ? users.filter((user) => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
      : users
  }, [users, filterCountry])

  //Orden alfabetico
  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
    
  }, [filteredUsers, sorting])
  //memoriza lo ordenado, pero con el memo
  // dice, quiero que lo ejecutes de nuevo cuando se modifica
  // el fiteredUsers o el sortByCountry

  //Eliminar user
  const handleDelete = (email: string) => {
    const filterdUsers = users.filter((user) =>  user.email != email)
     // setUsers(filterdUsers)
  }

  const handleReset = async () => {
    //setUsers(originalUsers.current)
    // .current para recuperar el valor actual
    await refetch()
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }



  return (
    <div>
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={toggleColors}>
          Colorear filas
        </button>
        <button onClick={SortCountry}>
          {
            sorting == SortBy.COUNTRY ? 'No ordenar por Pais' : 'Ordenar por Pais'
          }
        </button>
        <button onClick={handleReset}>
          Resetear filas
        </button>
        <input 
          type="text" 
          placeholder='ingrese Country'
          onChange={(e) => {setFilterCountry(e.target.value)}}
        />
      </header>
      <main>
        {users.length > 0 && 
          <UsersList changeSorting={handleChangeSort} deleteUser={handleDelete} showColors={showColors} users={sortedUsers}/>
        }
        {isLoading && <strong>Cargando...</strong>}
        {isError && <p>Ha habido un error</p>}
        {!isLoading && !isError && users.length == 0 && <p>No hay users</p>}
        {!isLoading && !isError && hasNextPage == true &&
         <button onClick={() => {void fetchNextPage()}}>Cargar mas resultados</button>
        } 
        {!isLoading && !isError && hasNextPage == false && <p>Ya no hay mas resultados</p>} 
      </main>
    </div>
  )
}

export default App
