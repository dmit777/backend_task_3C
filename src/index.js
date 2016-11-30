import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';

const app = express();
app.use(cors());
const pokemons = require('./pokemons.json');

app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

function sortByTag(tag = 'name') {
  function nameCompare(a, b) {
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  }

  function fatCompare(a, b) {
    if (a.height === 0 || b.height === 0) return;
    return (a.weight / a.height) < (b.weight / b.height) ? 1
     : (a.weight / a.height) > (b.weight / b.height) ? -1
     : (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
  }

  function angularCompare(a, b) {
    if (a.height === 0 || b.height === 0) return;
    return (a.weight / a.height) < (b.weight / b.height) ? -1
     : (a.weight / a.height) > (b.weight / b.height) ? 1
     : a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  }

  function heavyCompare(a, b) {
    return (a.weight < b.weight) ? 1 : (a.weight > b.weight) ? -1
     : (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
  }

  function lightCompare(a, b) {
    return (a.weight < b.weight) ? -1 : (a.weight > b.weight) ? 1
     : (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
  }

  function hugeCompare(a, b) {
    return (a.height < b.height) ? 1 : (a.height > b.height) ? -1
     : (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
  }

  function microCompare(a, b) {
    return (a.height < b.height) ? -1 : (a.height > b.height) ? 1
     : (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
  }

  if (tag === 'name') pokemons.sort(nameCompare);
  if (tag === 'fat') pokemons.sort(fatCompare);
  if (tag === 'angular') pokemons.sort(angularCompare);
  if (tag === 'heavy') pokemons.sort(heavyCompare);
  if (tag === 'light') pokemons.sort(lightCompare);
  if (tag === 'huge') pokemons.sort(hugeCompare);
  if (tag === 'micro') pokemons.sort(microCompare);
}

function getOffset(limit, offset) {
  return pokemons.slice(offset, offset + limit).map(pokemon => {
        return pokemon.name;
      });
}

app.use((req, res, next) => {
    req.limit = req.query.limit || 20;
    req.offset = req.query.offset || 0;
    next();
  });

app.get('/task3C/?(:type)?', (req, res) => {
    sortByTag(req.params.type);
    res.json(getOffset(+req.limit, +req.offset));
  });

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
