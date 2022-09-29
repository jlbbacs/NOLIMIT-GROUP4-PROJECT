const url = 'https://wger.de/api/v2/exerciseinfo?limit=350';
const secondUrl = 'https://wger.de/api/v2/exerciseinfo/?limit=50&offset=100';
const thirdUrl = 'https://wger.de/api/v2/exerciseinfo/?limit=50&offset=150';
const fourthUrl = 'https://wger.de/api/v2/exerciseinfo/?limit=50&offset=200';
const fifthUrl = 'https://wger.de/api/v2/exerciseinfo/?limit=50&offset=250';
const sixthUrl = 'https://wger.de/api/v2/exerciseinfo/?limit=50&offset=350';
const subContainer = document.querySelector('.subContainer');
let counterPerPage = [1];
let currentPage,
   nextPage,
   previousPage,
   firstPage,
   secondPage,
   thirdPage,
   fourthPage,
   fifthPage,
   sixthPage,
   seventhPage = '';

let data = [];
//user input should show data
searchBox.addEventListener('keyup', (e) => {
   const inputEl = document.getElementById('searchBox');
   const searchTerm = e.target.value.toLowerCase();
   const filteredData = data.results.filter((item) => {
      return item.name.toLowerCase().includes(searchTerm);
   });
   console.log(data);
   displayData(filteredData);
});

const fetchData = async (url) => {
   const response = await fetch(url);
   data = await response.json();
   displayData(data.results);
};

const getFirstPage = function () {
   document.body.scrollTop = 0;
   document.documentElement.scrollTop = 0;
   fetchData(url);
};

const getSecondPage = function () {
   document.body.scrollTop = 0;
   document.documentElement.scrollTop = 0;
   fetchData(secondUrl);
};

const getThirdPage = function () {
   document.body.scrollTop = 0;
   document.documentElement.scrollTop = 0;
   fetchData(thirdUrl);
};

const getFourthPage = function () {
   document.body.scrollTop = 0;
   document.documentElement.scrollTop = 0;
   fetchData(fourthUrl);
};

const getFifthPage = function () {
   document.body.scrollTop = 0;
   document.documentElement.scrollTop = 0;
   fetchData(fifthUrl);
};

const getSixthPage = function () {
   document.body.scrollTop = 0;
   document.documentElement.scrollTop = 0;
   fetchData(sixthUrl);
};

const getPrevPage = function () {
   counterPerPage--;
   document.body.scrollTop = 0;
   document.documentElement.scrollTop = 0;
   fetchData(previousPage);
};
const getNextPage = function () {
   counterPerPage++;
   document.body.scrollTop = 0;
   document.documentElement.scrollTop = 0;
   console.log(data.next);
   fetchData(nextPage);
};

const displayData = (exercises) => {
   let htmlString = '';

   nextPage = data.next;
   previousPage = data.previous;

   exercises.map((item) => {
      let lang = item.language.short_name;
      if (lang == 'en') {
         let imageShow = item.images;
         let bedyow = item.videos;
         if (imageShow.length) {
            htmlString += `
            <h4 style="color: red">${item.name}</h4>
            <h5>${item.category.name}</h5>
            <p>${item.description}</p>
            ${item.images.map((el) => {
               return `<img class="exercisesImages" src="${el.image}"/>`;
            })}`;
         }
      }
   });

   subContainer.innerHTML = htmlString;
};
fetchData(url);