const getBtnValue = document.querySelector('button')
const input = document.querySelector('.input')
const resultSearch = document.querySelector('.result-search')
const movieResult = document.querySelector('.all-search-result')
const trigger_search = document.querySelector('.trigger_search');
const inputSearch = document.querySelector('.input-in');



const apiKey = '1834f81129b73b73383a021cd0725af4';
const Url = 'https://api.themoviedb.org/3/movie/popular'; // Example endpoint
const page = 7;

const fetchMovies = async (page) => {
    try {
        const response = await fetch(`${Url}?api_key=${apiKey}&page=${page}`);
        const data = await response.json();
        totalPages = data.total_pages;
        const allres = data.results;
        console.log(allres);
        return allres;
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
};


// Function for trending/popular movies
async function dataTable(page) {
    const rawdata = await fetchMovies(page);
    movieResult.innerHTML = rawdata.map(movie =>
        `<div class="movie">

           <a href="http://127.0.0.1:5501/project/dev_taiwo/Movie-view.html?movie_id=${movie.id}">
            <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" id="result_movie_img">
            </a>
            <div class="result_info">
                <div class="result_movie_releaseDate"></div>
                <div class="result_movie_id">USA</div>
            </div>
            <div class="result_movie_title"><h4>${movie.title}</h4></div>
            <div class="rating2" id="card-rating">
                <div class="first card-first">
                    <img src="img/imbd.png" class="first-img">82.0/100
                </div>
                <div class="second card-second">
                    <img src="img/apple.png" class="second-img">70%
                </div>
            </div>
            <div class="favorite">
                <p class="bg hidden">TV SERIES</p>
                <div class="circle">
                    <i class="fa-solid fa-heart"></i>
                </div>
            </div>
        </div>`
    ).join("");
}
dataTable(page)