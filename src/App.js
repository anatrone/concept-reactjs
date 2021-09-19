import React, { useState, useEffect } from "react";

import api from "services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositories(res.data);
    });
  }, []);

  async function handleAddRepository() {
    let qtdRespositories = repositories.length + 1;

    const resAPI = await api.post('repositories', {
      title: 'Novo projeto',
      url: '/projeto-' + qtdRespositories,
      techs: ['javascript', 'reactjs']
    });

    const repository = resAPI.data;

    setRepositories([ ...repositories, repository ]);
  }

  async function handleRemoveRepository(id) { 
    const resAPI = await api.delete(`repositories/${id}`)
      .then(res => {
        setRepositories(repositories.filter(repository => repository.id !== id));
      });

    repositories.splice(id, 1);
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repositories =>
          <li key={repositories.id}> 
            <a href={repositories.url}>
              {repositories.title}
            </a>
            <span style={{marginLeft: '10px'}} > | Likes: {repositories.likes} |</span>
            <br />
            {repositories.techs.map(techs => techs + " ")}
            <button onClick={() => handleRemoveRepository(repositories.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
