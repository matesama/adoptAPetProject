const express = require('express')
const app = express()
const port = 8000
const petList = require('./petList.js');

app.get('/', (req, res) => {
  res.send(`
  <h1>Adopt a Pet!</h1>
  <p>Browse through the links below to find your new furry friend:</p>
  <ul> 
    <li><a href='/animals/dogs'>Dogs</a></li> 
    <li><a href='/animals/cats'>Cats</a></li> 
    <li><a href='/animals/rabbits'>Rabbits</a></li>
    </ul>
    `);
})

app.get('/animals/:pet_type', (req, res) => {
    const type = req.params.pet_type;
  
    if(petList[type]) {
      const arrayOfPet = petList[type];
    console.log(arrayOfPet);

    res.send(`
      <html>
        <header>
          <h2>List of ${req.params.pet_type}</h2>
        </header>
        <body>
            <ul>
              ${arrayOfPet.map((pet, index) => {
                if(pet.name) {
                  return `<li><a href='/animals/${type}/${index}'>${pet.name}</a></li>`;
                } else {
                  return '';
                }
              }).join('')}
            </ul>
        </body>
      </html>
      `);
    } else {
      res.status(404).send('Pet not found');
    }
})


app.get('/animals/:pet_type/:pet_id', (req, res) => {
    const type = req.params.pet_type;
    const petId = parseInt(req.params.pet_id);
    
    const arrayOfPet = petList[type];
    
    const findPet = arrayOfPet.find((e , index) => arrayOfPet[petId] && petId === index) 
    console.log(findPet);
    console.log(petId);
    if(!findPet) {
        return res.status(404).send('Pet not found');
    }

    res.send(`
    <h2>${findPet.name}</h2>
    <img src='${findPet.url}' />
    <p>${findPet.description}</p>
    <ul> 
      <li>Breed: ${findPet.breed}</li> 
      <li>Age: ${findPet.age}</li> 
    </ul>
    `);
})



app.listen(port, () => {
  console.log(`Adopt a dog Express practice listening on port ${port}`)
})