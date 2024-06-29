

 const getBtnValue = document.querySelector('button')
const input = document.querySelector('.input')
const resultHeading = document.querySelector('.resultHeading')
const movieResult = document.querySelector('.all-search-result')
let movieImg = document.querySelector('#result_movie_img')
let movieTitle = document.querySelector('.result_movie_title')
let movieID = document.querySelector('.result_movie_id')
let movieRelease = document.querySelector('.result_movie_releaseDate')
let movieOverview = document.querySelector('.result_movie_overview')
let movieTrailer = document.querySelector('.moviePlay')
let playBtn = document.querySelector('.btn-toplay')
const moviecontainer = document.querySelector('.result.container');
const mainViewToPlay = document.querySelector('.main-view')




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
           
                      
                   `  <div class="movie">
                        <img src="https://image.tmdb.org/t/p/original${result.poster_path}" id="result_movie_img">
                        <div class="result_movie_releaseDate"> ${result.release_date}</div>
                        <div class="result_movie_id"> ${result.id}</div>
                        <div class="result_movie_title"><h4>${result.title}</h4></div>
                    </div>`
                    
                 )
               .join()                   
            }
            }).catch(error => {
                    console.error('error',error);
                })
                input.value = '';
            }else{
                console.log('please enter movie to search for');
            }
}

 //getBtnValue.addEventListener('click', searchMovie)
  
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


function toGetInfo (e) {
    e.preventDefault()
    const query = input.value
    const apiKey = '1834f81129b73b73383a021cd0725af4'
    
    fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`).then((res) =>
        res.json())
    
    .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `search result for ${query}`;

        
        if(data.results === null){
            resultHeading.innerHTML = `Oops! no result for ${query}`
            
        }else{
            movieResult.innerHTML = data.results.map((result) => 
       
                  
               `  <div class="movie" onclick="pickID()">
                    <img src="https://image.tmdb.org/t/p/original${result.poster_path}" id="result_movie_img">
                    <div class="result_movie_id"> ${result.id}</div>
                     <div class="result_movie_releaseDate"> ${result.release_date}</div>
                     <div class="result_movie_title"><h4>${result.title}</h4></div>
                </div>`
            
               

            )

            input.value = '';
            async function pickID(){

             const  id = data.results[0].id
             const api_key = '1834f81129b73b73383a021cd0725af4'
             try{

                const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&append_to_response=videos`
        
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
            pickID()
            
        }
        }).catch(error => {
                console.error('error',error);
    })
            
        


}

getBtnValue.addEventListener('click', toGetInfo)

