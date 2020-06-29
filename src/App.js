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
    const data = {
      title: `Repositório ${repositories.length + 1}`,
      techs: ['Tecnologia 1', 'Tecnologia 2'],
      url: 'http://teste.com/teste'
    }

    const response = await api.post('repositories', data)

    return setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <>
            <li key={repository.id}>
              {repository.title}
            </li>

            <button onClick={() => handleRemoveRepository(1)}>
              Remover
            </button>
          </>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
