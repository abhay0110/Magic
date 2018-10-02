(function() {
  var app, container, renderComplete = false,
    page = 1,
    xhr = new XMLHttpRequest();

  function loadData(pageNum, pageSize) {
    var url =
      `https://api.magicthegathering.io/v1/cards?page=${pageNum}&pageSize=${pageSize}`;
    xhr.open('GET', url, true);
    xhr.send();
  }

  function filterCards(f) {
    var type = f.types,
      image = f.imageUrl;
    if (type.includes("Creature") && (image !== null || image !== '')) {
      console.log("hello");
      return 1;
    }
    return 0;
  }

  function renderCards(cardData) {
    cardData.forEach(function(cards, index) {
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
      originalType.textContent =
        `Original Type: ${cards.originalType}`;

      container.appendChild(card);
      card.appendChild(h2);
      card.appendChild(p);
      card.appendChild(artist);
      card.appendChild(setName);
      card.appendChild(originalType);
    })
  }

  function initApp() {
    app = document.getElementById('root');
    container = document.createElement('div');
    container.setAttribute('class', 'container');
    app.appendChild(container);

    xhr.onload = function() {
      if (xhr.status === 200) {
        var data = JSON.parse(this.responseText);
        // filter based on type: creature and has image
        var filterreddata = data.cards.filter(function(i) {
          var type = i.types,
            image = i.imageUrl;
          if (type.includes("Creature") && (image !== null || image !==
              ''))
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
        renderCards(filterreddata);
        if (page === 1) {
          renderComplete = true; //initial load complete, activate scroll handler
        }
      } else {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = `Something is not working!`;
        app.appendChild(errorMessage);
      }
    }

    loadData(1, 10);
  }

  //app entry point
  initApp();

  //util method
  function getDistFromBottom() {
    var scrollPosition = window.pageYOffset,
      windowSize = window.innerHeight,
      bodyHeight = document.body.offsetHeight;

    return Math.max(bodyHeight - (scrollPosition + windowSize), 0);
  }

  //check scroll position and load next page
  document.addEventListener('scroll', function() {
    if (renderComplete && getDistFromBottom() < 10) {
      page++;
      loadData(page, 20);
    }
  });

})();
