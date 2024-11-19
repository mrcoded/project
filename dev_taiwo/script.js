
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyD_a77StL_JoevesqpuekiC-zw7d7HtQoE",
    authDomain: "my-moviebox.firebaseapp.com",
    projectId: "my-moviebox",
    storageBucket: "my-moviebox.appspot.com",
    messagingSenderId: "529119394066",
    appId: "1:529119394066:web:bd16e8ab4571fa531f1bcb"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth=getAuth();
  const db=getFirestore();

  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('loggedUserFName').innerText=userData.firstName;
                document.getElementById('loggedUserEmail').innerText=userData.email;
                document.getElementById('loggedUserLName').innerText=userData.lastName;

            }
            else{
                console.log("no document found matching id")
            }
        })
        .catch((error)=>{
            console.log("Error getting document");
        })
    }
    else{
        console.log("User Id not Found in Local storage")
    }
  })

  const logoutButton=document.getElementById('logout');

  logoutButton.addEventListener('click',()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href='index.html';
    })
    .catch((error)=>{
        console.error('Error Signing out:', error);
    })
  })

const getBtnValue = document.querySelector('button')
const input = document.querySelector('.input')
const resultSearch = document.querySelector('.result-search')
const movieResult = document.querySelector('.all-search-result')
const trigger_search = document.querySelector('.trigger_search');
const inputSearch = document.querySelector('.input-in');


const apiKey = '1834f81129b73b73383a021cd0725af4';
const Url = 'https://api.themoviedb.org/3/movie/popular'; // Example endpoint

let totalPages = 36;
const contentLimit = 12;
let currentPage = 1; // should be the index of the current page
const pageCount = Math.round(totalPages / contentLimit);
 const maxNumber = 12

const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const pageNumbers = document.getElementById("pageNumbers");


const displayPageNumbers = (index) => {
    const pagenumber = document.createElement("button");
    pagenumber.innerText = index;
    pagenumber.setAttribute('href', "#");
    pagenumber.className = "innerIndex";
    pagenumber.setAttribute("index", index);
    pageNumbers.appendChild(pagenumber);
};

const getPageNumbers = () => {
    for (let i = 1; i <= pageCount; i++) {
        displayPageNumbers(i);
    }
};

// Function that disables and enables the button
const disableButton = (button) => {
    button.classList.add("disabled");
    button.setAttribute("disabled", true);
};

const enableButton = (button) => {
    button.classList.remove("disabled");
    button.removeAttribute("disabled");
};

// Function to control the button status on the prev and next button
const controlButtonsStatus = () => {
    if (currentPage === 1) { // if you are on the current page which is 1, the prev button should be disabled
        disableButton(prevButton);
    } else {
        enableButton(prevButton);
    }
    if (currentPage === pageCount) { // if you are on the last page, the next button should be disabled
        disableButton(nextButton);
    } else {
        enableButton(nextButton);
    }
};

const handleActivePageNumber = () => {
    document.querySelectorAll('.innerIndex').forEach((button) => {
        button.classList.remove("active");
        const pageIndex = Number(button.getAttribute("index"));
        if (pageIndex === currentPage) {
            button.classList.add('active');
        }
    });
};

const setCurrentPage = (pageNum) => {
    currentPage = pageNum;

    handleActivePageNumber();
    controlButtonsStatus();

    const prevRange = (pageNum - 1) * contentLimit;
    const currRange = pageNum * contentLimit;

    document.querySelectorAll(".result-search").forEach((item, index) => {
        item.classList.add('hidden');

        if (index >= prevRange && index < currRange) {
            item.classList.remove('hidden');
        }
    });
};

const fetchMovies = async (page) => {
    try {
        const response = await fetch(`${Url}?api_key=${apiKey}&page=${page}`);
        const data = await response.json();
        totalPages = data.total_pages;
        const allres = data.results.slice(0,12);
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

window.addEventListener('load', () => {
    getPageNumbers();
    setCurrentPage(1);
    dataTable(1);

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            dataTable(currentPage - 1);
        }
    });

    nextButton.addEventListener("click", () => {
        if (currentPage < pageCount) {
            setCurrentPage(currentPage + 1);
            dataTable(currentPage + 1);
        }
    });

    document.querySelectorAll('.innerIndex').forEach((button) => {
        const pageIndex = Number(button.getAttribute('index'));
        if (pageIndex) {
            button.addEventListener('click', () => {
                setCurrentPage(pageIndex);
                dataTable(pageIndex);
            });
        }
    });
});






//function to activate see more button
async function toSeeMore(){
    await productTable();
    console.log(productDate);
    //pagination start here
     
    movieResult.innerHTML = productDate.map(movie =>
        ` <div class="movie">

                <a href="http://127.0.0.1:5500/project/dev_taiwo/index2.html?movie_id=${movie.id}">

                <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" id="result_movie_img">

                </a>
                
                <div class="result_info">  

                <div class="result_movie_releaseDate">${movie.release_date.substring(0, 4)}</div>

                <div class="result_movie_id">USA</div>

                </div>    
                
                <div class="result_movie_title"><h4>${movie.title}</h4></div>

                    <div class="rating2" id="card-rating">

                        <div class="first card-first">

                            <img src="img/imbd.png" class="first-img">
                            82.0/100

                        </div>

                        <div class="second card-second">

                            <img src="img/apple.png" class="second-img">

                            70%

                        </div>

                    </div>

                    <div class="favorite">
                    <p class="bg hidden">TV SERIES</p>
                    <div class="circle">
                        <i class="fa-solid fa-heart"></i>
                    </div>
                </div>
                </div> 
            `
    ).join("");
}
const seeMore = () => {
    heroPage.style.display = 'none';
    toSeeMore()
    pagination.style.display = 'none';
    seeAll.style.display = 'none';
    
}
 //seeAll.addEventListener("click", seeMore, false)



//function to handle small screen search

 const searchDisplay = () => {
    if (!inputSearch.classList.contains('input-open')){
        inputSearch.classList.add('input-open');
        trigger_search.innerHTML = "<i class='fas fas fa-times'></i>"  
    }
    else{
        inputSearch.classList.remove('input-open');
        trigger_search.innerHTML = '<i class="fas fas fa-search"></i>'
    }

}

const searchMovie2 = async (query1) => {
    try{

       const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query1}&api_key=${apiKey}`);
       const res = await data.json();
        //console.log(res);

        AllMovie = res.results
         console.log(AllMovie);

         const allSearchResult = () => {
           resultSearch.innerHTML = AllMovie.map(movie =>
           ` <div class="movie">
   
                   <a href="http://127.0.0.1:5501/project/dev_taiwo/Movie-view.html?movie_id=${movie.id}">
   
                   <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" id="result_movie_img">
   
                   </a>
                   
                   <div class="result_info">  
   
                   <div class="result_movie_releaseDate">${movie.release_date.substring(0, 4)}</div>
   
                   <div class="result_movie_id">USA</div>
   
                   </div>    
                   
                   <div class="result_movie_title"><h4>${movie.title}</h4></div>
   
                       <div class="rating2" id="card-rating">
   
                           <div class="first card-first">
   
                               <img src="img/imbd.png" class="first-img">
                               82.0/100
   
                           </div>
   
                           <div class="second card-second">
   
                               <img src="img/apple.png" class="second-img">
   
                               70%
   
                           </div>
   
                       </div>
   
                       <div class="favorite">
                       <p class="bg hidden">TV SERIES</p>
                       <div class="circle">
                           <i class="fa-solid fa-heart"></i>
                       </div>
                   </div>
                   </div> 
               `
       ).join("");
       }
            
       if (AllMovie.length < maxNumber){
           allSearchResult()
           dataTable()
       }
       else if(AllMovie.length == maxNumber) {
           allSearchResult()
       }
       else {
           allSearchResult()
       }
                               
       input.value = "";             
               
       }catch(error){
           console.log(error);
       }
}
const handleSearch = () =>{
    searchDisplay();

    const query1 = inputSearch.value;

    if (query1){
        searchMovie2(query1);
    }
}

trigger_search.addEventListener("click", handleSearch);



//FUNCTION THAT HANDLE SEARCHING...
async function searchMovie(){
    try{
         const query = input.value;

        const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`);
        const res = await data.json();
         //console.log(res);
         
         let AllMovie = res.results
          console.log(AllMovie);

          const allSearchResult = () => {
            movieResult.innerHTML = AllMovie.map(movie =>
            ` <div class="movie">
    
                    <a href="http://127.0.0.1:5500/project/dev_taiwo/index2.html?movie_id=${movie.id}">
    
                    <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" id="result_movie_img">
    
                    </a>
                    
                    <div class="result_info">  
    
                    <div class="result_movie_releaseDate">${movie.release_date.substring(0, 4)}</div>
    
                    <div class="result_movie_id">USA</div>
    
                    </div>    
                    
                    <div class="result_movie_title"><h4>${movie.title}</h4></div>
    
                        <div class="rating2" id="card-rating">
    
                            <div class="first card-first">
    
                                <img src="img/imbd.png" class="first-img">
                                82.0/100
    
                            </div>
    
                            <div class="second card-second">
    
                                <img src="img/apple.png" class="second-img">
    
                                70%
    
                            </div>
    
                        </div>
    
                        <div class="favorite">
                        <p class="bg hidden">TV SERIES</p>
                        <div class="circle">
                            <i class="fa-solid fa-heart"></i>
                        </div>
                    </div>
                    </div> 
                `
        ).join("");
        }
             
        if (AllMovie.length < maxNumber){
            allSearchResult()
            
        }
        else if(AllMovie.length == maxNumber) {
            allSearchResult()
        }
        else {
            allSearchResult()
        }
                                
        input.value = "";             
                
        }catch(error){
            console.log(error);
        }
        //   (  error => {
        //             console.error('error',error);
        //         })
        //         input.value = '';
        //     }else{
        //         console.log('please enter movie to search for');
        //     })
}
getBtnValue.addEventListener("click",searchMovie)

//hambuger
const iconHambuger = document.querySelector('.icon').addEventListener("click",
    function () {
        document.getElementById('hambuger').style.display = 'block'
    }
)
iconHambuger()











      