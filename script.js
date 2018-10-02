const app = document.getElementById('root');


const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);


var request = new XMLHttpRequest();
var url = "https://api.magicthegathering.io/v1/cards.json?page=1&count=2"
request.open('GET', url);
request.onload = function() {
  if (this.status == 200) {
    var data = JSON.parse(this.responseText);
    // filter based on type: creature and has image
    var filterreddata = data.cards.filter(function(i) {
      var type = i.types;
      var image = i.imageUrl;
      if (type.includes("Creature") && (image !== null || image !== ''))
        return 1;
      return 0;
    });
    // sorting the array as per name
    filterreddata.sort(function(a, b) {
      var nameA = a.name.toLowerCase(),
        nameB = b.name.toLowerCase();
      if (nameA < nameB) //sort string ascending
        return -1;
      if (nameA > nameB)
        return 1;
      return 0;
    });

    //Slicing data to first 20;
    //infinite scroll
    var limit = 7;
    var sliceddata = filterreddata.slice(0, limit);
    sliceddata.forEach(cards => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');
      const h2 = document.createElement('h2');
      h2.textContent = cards.name;

      var img = new Image();
      const p = document.createElement('img');
      p.src = cards.imageUrl;
      img.setAttribute("class", "creature-img");
      img.setAttribute("alt", "card image");

      const artist = document.createElement("p");
      artist.textContent = `Artist: ${cards.artist}`;
      //var x = document.createElement("LI");
      const setName = document.createElement('p');
      setName.textContent = `Set Name: ${cards.setName}`;

      const originalType = document.createElement("p");
      originalType.textContent = `Original Type: ${cards.originalType}`;

      container.appendChild(card);
      card.appendChild(h2);
      card.appendChild(p);
      card.appendChild(artist);
      card.appendChild(setName);
      card.appendChild(originalType);
    });
  } else {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = `Something is not working!`;
    app.appendChild(errorMessage);
  }
};
request.send();
