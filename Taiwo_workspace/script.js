
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
