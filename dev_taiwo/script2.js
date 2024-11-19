const movieImg = document.querySelector('.main-view-top');
const title = document.querySelector('.movie-title');
const overview = document.querySelector('.overview');
const movieDate= document.querySelector('.movie-date');
const movieDuration = document.querySelector('.movie-duration');

const play = document.getElementById("play");
const apiKey = '1834f81129b73b73383a021cd0725af4';



async function fetchMovieDetails(movieId) {
    try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=videos,images`;
        const response = await fetch(url);
        const movie = await response.json();
       console.log(movie);

       movieImg.innerHTML= ` <div class = "main-view-topimg">
         <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" id="result_movie_img">
            </div>`

        title.innerHTML= `${movie.title}`
        overview.innerHTML=`${movie.overview}`
        movieDate.innerHTML= `${movie.release_date.substring(0, 4)}`

    
    } catch (error) {
        console.log('Error fetching movie details:', error);
    }

   
}
fetchMovieDetails(786892)


//Retrieve movie_id from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('movie_id');

// Fetch and display movie details when the page loads
if (movieId) {
    fetchMovieDetails(movieId);
} else {
    console.log('No movie_id parameter found in the URL');
}


   
play.addEventListener('click', function() {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=videos`).then((res) =>
        res.json())
    .then((data) => {

        const trailerkey = data?.videos?.results?.[0]?.key;

               if (trailerkey){
                   window.open(`https://www.youtube.com/watch?v=${trailerkey}`, '_blank')
               }else{
                   alert('NO trailer found for this movie');
               }
    }).catch(error =>{
        console.log('error', error);
    })
})