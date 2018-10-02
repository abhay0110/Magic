var distToBottom, data, dataObj;
var page = 1;
var pollingForData = false;
var xhr = new XMLHttpRequest();
//var contentContainer = document.getElementsByClassName('content-container')[0];
//var loadingContainer = document.getElementsByClassName('loading-container')[0];
const app = document.getElementById('root');


const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);
function getDistFromBottom () {

  var scrollPosition = window.pageYOffset;
  var windowSize     = window.innerHeight;
  var bodyHeight     = document.body.offsetHeight;

  return Math.max(bodyHeight - (scrollPosition + windowSize), 0);

}

xhr.onload = function() {
  if(xhr.status === 200) {
    pollingForData = false;
    data = xhr.responseText
    dataObj = JSON.parse(data);
		console.log(dataObj);

    // for iterating through the data
    // Using a ForEach

    dataObj.cards.forEach(function(cards, index){
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
    })

//     // Using a For Loop
//     for(var i = 0; i <= dataObj.posts.length; i++ ) {
//       console.log('data ', i);
//     }

    // removing the spinner
    // loadingContainer.classList.remove('no-content');

  }
};

xhr.open('GET', 'https://api.magicthegathering.io/v1/cards?page=1&Page-Size=5', true);
xhr.send();
pollingForData = true;

document.addEventListener('scroll', function() {
        distToBottom = getDistFromBottom();
         console.log('scrolling', getDistFromBottom());

        if (!pollingForData && distToBottom > 0 && distToBottom <= 8888) {
          pollingForData = true;
          loadingContainer.classList.add('no-content');

          page++;
          xhr.open('GET', 'https://api.magicthegathering.io/v1/cards?page='+page+'&Page-Size=10', true);
          xhr.send();

        }
});
