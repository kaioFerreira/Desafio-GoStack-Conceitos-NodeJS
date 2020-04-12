const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// PRONTO
app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

// PRONTO
app.post("/repositories", (request, response) => {
  const {title,url,techs} = request.body;
  const likes = 0;

  const repository = {id: uuid(),title, url,techs,likes}; 
  repositories.push(repository);

  return response.json(repository);
});

// PRONTO
app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title,url,techs} = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0 ) {
    return response.status(400).json({error: 'Repository not found.'});
  }
  const {likes} = repositories[repositoryIndex]; 
  const repository = {
    id,
    title,
    url,
    techs,
    likes,
  }

  repositories[repositoryIndex] = repository;

  return response.json(repository);

});

// PRONTO
app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0) {
    return response.status(400).json({error: 'Repository not found.'});
  }

  repositories.splice(repositoryIndex,1);

  return response.status(204).send();
});

// PRONTO
app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0){
    return response.status(400).json({error: 'Repository not found.'});
  }

  let {url, title,techs,likes} = repositories[repositoryIndex];
  likes = likes + 1;
  repositories[repositoryIndex] = {id,url,title,techs,likes};

  return response.json({id,title,url,techs,likes});
});

module.exports = app;
