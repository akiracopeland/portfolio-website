// event listener for sending the post request using postMeme function
document.querySelector('.post-meme').addEventListener('click', postMeme);

getMeme();

getApod();


// function for sending get request to retrieve the template images from Meme Generator API
function getMeme(){

  const url = 'https://api.imgflip.com/get_memes';
  const xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);
  
  xhr.onload = function() {
    if(this.status === 200) {
      let memes = JSON.parse(this.responseText).data.memes; 
      
      //looping through the memes array in the response to create the img elements of the template images for memes
      for (i in memes) { 
        let memeImage = new Image(150, 175);
        memeImage.src = memes[i].url;
        memeImage.title = memes[i].name;
        memeImage.id = memes[i].id;
        memeImage.className = "meme-image";
        document.getElementById("memes").appendChild(memeImage);

        // adding event listeners to display the image and the title below when clicked
        memeImage.addEventListener("click", function(e){
          let selectedImage = document.querySelector(".selected-meme");
          selectedImage.src = e.target.src;
          selectedImage.id = e.target.id;

          let selectedTitle = document.getElementById("selected-title");
          selectedTitle.innerHTML = e.target.title;
        });
      } 
    }
  }
  xhr.send();
}

// function for sending post request to the Meme Generator API
function postMeme(){
  const url = 'https://api.imgflip.com/caption_image';
  const xhr = new XMLHttpRequest();

  // constructing formdata which will be sent as the body of this post request
  let memeData = new FormData();

  // appending key-value pairs to the formdata 
  memeData.append('template_id', document.querySelector(".selected-meme").id);
  memeData.append('username', 'akiracopeland');
  memeData.append('password', '567ujmnbgtyh');
  memeData.append('text0', document.getElementById("text0").value);
  memeData.append('text1', document.getElementById("text1").value);

  xhr.open("POST", url, true);

  xhr.onload = function() {
    if (this.status === 200) { 
      let meme = JSON.parse(this.responseText);

      // displaying the response image and the page link url
      let selectedImage = document.querySelector(".response-meme");
      let linkUrl = document.querySelector("#link-url");
      
      selectedImage.src = meme.data.url;
      linkUrl.href = meme.data.page_url;
      linkUrl.innerHTML = meme.data.page_url;

      document.querySelector("#page-link").innerHTML = "Link url:"
    }
  };

  xhr.send(memeData);
}

// function for sending get request to the NASA API
function getApod(){

  const url = 'https://api.nasa.gov/planetary/apod?api_key=R2VWa31hvZQArHe6gNO7OJR4HgVzI0SShtZ6TeBY';
  const xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);
  
  xhr.onload = function() {
    if(this.status === 200) {
      let response = JSON.parse(this.responseText);

      // displaying the image, title and explanation in the response
      document.getElementById("nasa-img").src = response.url;
      document.getElementById("nasa-title").textContent = response.title;
      document.getElementById("nasa-explanation").textContent = response.explanation;
    }
  }

  xhr.send();
}