

 const getBtnValue = document.querySelector('button')
const input = document.querySelector('.input')
const resultHeading = document.querySelector('.resultHeading')
const movieResult = document.querySelector('.movie_result')
let movieImg = document.querySelector('#result_movie_img')
let movieTitle = document.querySelector('.result_movie_title')
let movieID = document.querySelector('.result_movie_id')
let movieRelease = document.querySelector('.result_movie_releaseDate')
let movieOverview = document.querySelector('.result_movie_overview')
let movieTrailer = document.querySelector('.moviePlay')
let playBtn = document.querySelector('.btn-toplay')



function searchMovie(e){
    e.preventDefault()

     const apiKey = '1834f81129b73b73383a021cd0725af4'
     const maxSearch = 8;
 
     // to get the search value
    const query = input.value

    if (query.trim()){

        fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`).then((res) =>
            res.json())
        
        .then((data) => {
            console.log(data);
            resultHeading.innerHTML = `search result for ${query}`;

            
            if(data.results === null){
                resultHeading.innerHTML = `Oops! no result for ${query}`
                
            }else{
                movieResult.innerHTML = data.results.map((result) => 

                    `  <div class="result-container">
                        <img src="https://image.tmdb.org/t/p/original${result.poster_path}" id="result_movie_img">
                        <div class="result_movie_releaseDate"> ${result.release_date}</div>
                        <div class="result_movie_title"><h4>${result.title}</h4></div>
                        <div class="result_movie_id"> ${result.id}</div>
                    </div>`
                    
                 )
   
            }
            }).catch(error => {
                    console.error('error',error);
                })
                input.value = '';
            }else{
                console.log('please enter movie to search for');
            }
}

 getBtnValue.addEventListener('click', searchMovie)
  
//what

function playById(e){
    e.preventDefault()
 
    togetid = '453026'
    const apiKey = '1834f81129b73b73383a021cd0725af4'
 
     fetch(`https://api.themoviedb.org/3/movie/${togetid}?&append_to_response=videos&api_key=${apiKey}`).then((response) =>
       response.json())
      //console.log(response);
     .then((data) => {
        console.log(data);

      movieTitle = data.title
      console.log(data.title);
      movieID.innerHTML = data.id
      movieRelease.innerHTML =  data.release_date
      movieOverview.innerHTML =  data.overview
      movieImg.innerHTML =  data.poster_path

                      
    
    }).catch(error => {
        console.error('Error fetching movie details:', error);
    })  
    
          
}


playBtn.addEventListener('click', playFromTmbd)

//playFromTmbd (' 343611', '1834f81129b73b73383a021cd0725af4')
async function playFromTmbd(e) {
    e.preventDefault();
        const  movie_id = '343611'
        const  api_key = '1834f81129b73b73383a021cd0725af4'
    try{

        const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${api_key}&append_to_response=videos`

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        const trailerkey = data?.videos?.results?.[0]?.key;

        if (trailerkey){
            window.open(`https://www.youtube.com/watch?v=${trailerkey}`, '_blank')
        }else{
            console.log('NO trailer found for this movie');
        }

    }catch(error){
        console.log('error fetching data');
    }
   
}






const movieList = document.querySelector('.movie-list');
const mainViewToPlay = document.querySelector('.main-view')

// movieList.addEventListener('click', function() {

//     mainViewToPlay.style.display = 'block'

// })