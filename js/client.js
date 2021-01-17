let nominatedMovies = [];
let allMovies = [];

//search function
function movieSearch(){
    let query = document.getElementById("search").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            movieList(JSON.parse(this.responseText), query);
        }
    };
    xmlhttp.open("GET", "http://www.omdbapi.com/?&apikey=ba543aa5&s=" + query, true);
    xmlhttp.setRequestHeader('Accept', 'application/json');
    xmlhttp.send();
}


//Prints out movie lists
function movieList(movies, query){
    //gets the container and empties it
    let movieID = 0;
    document.getElementById("movies").innerHTML = "nominate";
    let view = "";
    view += `<br><div class="p1">Results for "${query}"</div>`;
    view += `<ul>`
    movies.Search.forEach(movie =>{
        view += `<li><div class="result-txt">${movie.Title} (${movie.Year})</div><button type="submit" id=${movieID} onclick="nominate('${movie.Title}', '${movie.Year}','${movieID}')">Nominate</button>`;
        let newMovie = {title: movie.Title, year: movie.Year, id: movieID};
        allMovies.push(newMovie);
        movieID++;
    })
    document.getElementById("movies").innerHTML = view;  
}

//Gets the new list of nominated movies
function nominate(title, year, movieID){
    let banner = "";
    let nominatedList = "";
    var movieObj = {title: title, year: year, iD: movieID};
    nominatedMovies.push(movieObj);
    nominatedList += `<br><div class="p1">Nominated</div>`
    nominatedList += `<ul>`
    document.getElementById("nominate").innerHTML = "";
    nominatedMovies.forEach(movie =>{
        nominatedList += `<li><div class="result-txt">${movie.title} (${movie.year})</div><button type="submit" id="nominate" onclick="remove('${movie.title}', '${movie.year}', '${movie.iD}')">Remove</button>`;
    })
    document.getElementById(movieID).disabled = true;
    document.getElementById("nominate").innerHTML = nominatedList;
    //checks if length of nominated is 5 and shows a banner
    if(nominatedMovies.length >= 5){
        banner += `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>`;
        banner += `<img src='banner.png' style="height:200px;transition: 2s;display: block;margin-left: auto;margin-right: auto;">`;
        for(let i = 0; i < allMovies.length; i++){
            document.getElementById(allMovies[i].id).disabled = true;
        }
        document.getElementById("alert").innerHTML = banner;
         
    }
    
}
  

function remove(title, year, movieID){
    let removedList = "";
    if(nominatedMovies.length == 5){
        for(let i = 0; i < allMovies.length; i++){  
            let index = nominatedMovies.findIndex(movie => movie.iD == allMovies[i].id);
            if(index == -1)
                document.getElementById(allMovies[i].id).disabled = false;
        }
    }
    var index = nominatedMovies.findIndex(movie => movie.iD === movieID);
    if (index > -1) {
        nominatedMovies.splice(index, 1);
    }
    removedList += `<br><div class="p1">Nominated</div>`
    removedList += `<ul>`
    nominatedMovies.forEach(movie =>{
        removedList += `<li><div class="result-txt">${movie.title} (${movie.year})</div><button type="submit" id="remove" onclick="remove('${movie.title}', '${movie.year}', '${movie.iD}')">Remove</button>`;
    })
    document.getElementById(movieID).disabled = false;
    document.getElementById("nominate").innerHTML = removedList;
} 

