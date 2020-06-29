import React, { useState, useEffect } from 'react';

import api from './services/api'

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories')
      .then(response => setRepositories(response.data))
  }, [])

  async function handleAddRepository() {
    const index = repositories?.length + 1 || 1

    const data = {
      title: `Repositório ${index}`,
      techs: ['Tecnologia 1', 'Tecnologia 2'],
      url: 'http://teste.com/teste'
    }

    const response = await api.post('repositories', data)

    return setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`)

      const rep = repositories.filter(repository => repository.id !== id)

      setRepositories(rep)
    } catch (e) {
      return alert(`Error on delete repository, [${e}]`)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
