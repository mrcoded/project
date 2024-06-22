

 const getBtnValue = document.querySelector('button')
const form = document.querySelector('.input')


//https://github.com/mrcoded/project
 
//const output = form.value;

 const apiKey = '1834f81129b73b73383a021cd0725af4'

 async function searchMovie(query){
         
     try {

       const response =  await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}r&api_key=${apiKey}`);
        console.log(response);
        const data = await response.json();
        console.log(data);

        if (data.results && data.results.lenght < 0){
            //process each movie result
            data.results.forEach(movie => {
                const {id, title, poster_path, release_date, overview}  = movie;
                
                //const posterUrl = poster_path ? `https://image.tmdb.org/t/p/original${poster_path}`:`https://via.placeholder.com/150`;

                //display the data require
                console.log(`ID: ${id}`);
                console.log(`relesde date: ${release_date}`);
                console.log(`title: ${title}`);
                console.log(`overview: ${overview}`);
                console.log(`poster-url: ${poster_path}`);
            });

        }else{
            console.log('no movie,  match not found');
        }

    }catch(err){
        console.log(err);
    }

}

function tohandleevent(){
    const query = document.querySelector('.input').value;
    searchMovie(query)

}
 getBtnValue.addEventListener('click', tohandleevent)
  

//,mn


// fetch('https://api.themoviedb.org/3/search/movie?query=home%20alone&api_key=1834f81129b73b73383a021cd0725af4').then((data) => {

//         console.log(data);
//         return data.json();
//     }).then((completedata) => {
//         console.log(completedata);
//         let data1 = "";
//         completedata.map((values) =>{
//             data1 = `<div class="card">
//                         <h1 class="title">${values} </h1>
//                         <p class="category">${values.category}</p>
//                         <p class="price">${values.price}</p>
//                     </div>`
    
//                 })
// }).catch((err) =>{
//     console.log(err);
// })
    

  
// document.getElementById("card").innerHTML = data1

// https://api.themoviedb.org/3/movie/{movie_id}
//https://developer.themoviedb.org/reference/intro/getting-started
/*
const movies = [
    {title: 'Stranger Things', year: '2016', country: 'usa' },
    {title: 'Batman Begins', year: '2005', country: 'usa' },
    {title: 'Spider-man: Into The Spider verse', year: '2018', country: 'usa' },
    {title: 'Dunkirk', year: '2017', country: 'usa' }
]

console.log(movies);

// function to search and print the details

function searchMovie(title){
    const foundMovies = movies.filter(movie =>
         movie.title.toLowerCase() === title.toLowerCase());

         if (foundMovies.length > 0){
            foundMovies.forEach(movie =>{
                console.log(`movie: ${movie.title}`);
                console.log(`year: ${movie.year}`);
                console.log(`country: ${movie.country}`);
                // sepertion btw movies
                console.log('----');
            

            });
         } else{
            console.log(`no movie found with title ${title}`);
         }
}
const inpuValue = 'stranger things'
searchMovie(inpuValue)


*/

//creat an array that saves all the movie compnent called allmovies
//  if the search input found a match === to any allmovies child
//the movie should be display first, then the other should follow
// if not no found match



// async function AllmovieData(){
//     try{
//        const response = await fetch('jhgfdsdfghj')
//        console.log(response);//geting the movie details

//        const movieData = response.json
//        console.log(movieData);

//       }
 
//     catch(error){
//      console.log('abc does not exist');
//     }
//     finally{
//      console.log('code run anyways ');
//     }
     
//  
 //const apiUrl ='https://api.themoviedb.org/3/search/movie?query=${}r&api_key=API_KEY'

 //fetch(`https://api.themoviedb.org/3/search/movie?query=${output}r&api_key=${apiKey}`)