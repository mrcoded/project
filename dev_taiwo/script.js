

 const getBtnValue = document.querySelector('button')
const input = document.querySelector('.input')
const resultHeading = document.querySelector('.resultHeading')
const movieResult = document.querySelector('.all-search-result')
let moviedisplayDetailes = document.querySelector('.moviedisplayDetailes')
let playBtn = document.querySelector('.btn-toplay')
const nextPage = document.querySelector('.movie-description')
const previewOverview = document.querySelector('.preview-overview')



const apiKey = '1834f81129b73b73383a021cd0725af4'
const maxNumber = 16;

trending()

async function trending(){
    try{
         
        const url = (`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&append_to_response=videos,images`)

        const response = await fetch(url);
        const data = await response.json();
            console.log(data);
               
            movieResult.innerHTML = data.results.map((result) => 

            `
              <div class="movie">
                <a href="http://127.0.0.1:5500/project/dev_taiwo/index2.html?movie_id=${result.id}">
                <img src="https://image.tmdb.org/t/p/original${result.poster_path}" id="result_movie_img">
                <div class="result_info">  <div class="result_movie_releaseDate"> ${result.release_date}</div>
                <div class="result_movie_id"> ${result.id}</div>
                </div>    </a> 
                <div class="result_movie_title"><h4>${result.title}</h4></div>
                    <div class="rating" id="card-rating">
                        <div class="first card-first">
                            <img src="img/imbd.png" class="first-img">
                            82.0/100
                        </div>
                        <div class="second card-second">
                            <img src="img/apple.png" class="second-img">
                            70%
                        </div>
                    </div>
                    <div class="title">
                    <p class="bg hidden">TV SERIES</p>
                    <div class="circle">
                        <i class="fa-solid fa-heart"></i>
                    </div>
                </div>
                </div> 
                </div>`
                

            )               

    }
    catch(error){
        console.log('error fetching data');
    }
      
}




function searchMovie(e){
    e.preventDefault()
 
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
  
//playBtn.addEventListener('click', playFromTmbd)


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




//getBtnValue.addEventListener('click', toGetInfo)
//code to play the movie by id
/*
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
*/
/*
function moviedisplayDetailes(){
    document.querySelector('.movie').addEventListener('click', function () {
        l
        moviedisplayDetailes.innerHTML = data.results.map((result) =>` 
            <div>
                
                <img src="https://image.tmdb.org/t/p/original${result.poster_path}" id="result_movie_img"></img>

                <div class="title-description">
                    <div class="result_movie_title"><h4>${result.title}</h4></div>
                    <div class="result_movie_releaseDate">${result.release_date}</div>
                 </div>

                 <div class="result_movie_overview">${result.overview}</div>
                 <div class="result_directors">
                    <p>Directors: <span>${result.directors}</span></p>
                    <p>Writer:<span>${result.writer}</span></p>
                    <p>Star:<span>${result.star}</span></p>
                 </div>
            </div> `
        )
    }) 
 
}*/
// `  <div class="movie">
// <a href="http://127.0.0.1:5500/project/dev_taiwo/index2.html" target="_blank">
// <img src="https://image.tmdb.org/t/p/original${result.poster_path}" id="result_movie_img">
// <div class="result_info">  <div class="result_movie_releaseDate"> ${result.release_date}</div>
// <div class="result_movie_id"> ${result.id}</div>
// </div>    </a> 
// <div class="result_movie_title"><h4>${result.title}</h4></div>
//       <div class="rating" id="card-rating">
//         <div class="first card-first">
//             <img src="img/imbd.png" class="first-img">
//             82.0/100
//         </div>
//         <div class="second card-second">
//             <img src="img/apple.png" class="second-img">
//             70%
//         </div>
//     </div>
//      <div class="title">
//     <p class="bg hidden">TV SERIES</p>
//     <div class="circle">
//         <i class="fa-solid fa-heart"></i>
//     </div>
// </div>
// </div> 
// </div>`