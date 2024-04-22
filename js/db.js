const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyY2I4YWI3MzJjNzg3MmM3MzZiNGEzYjg5NjVkYTJmOCIsInN1YiI6IjYzMWI0MDFiNzdiMWZiMDA4MDdjMGM1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ntir1NwhV1WmEvgv2Od4TB1bguUQx6f1LiwHDqZojOM",
  },
};

/**
 * TMDB에서 데이터 가져오기
 */
fetch(
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    printCard(response.results);
    clickedCard();
  })
  .catch((err) => console.error(err));

/**
 * Card 만드는 함수
 */
const createCard = ({
  id,
  overview,
  vote_average,
  title,
  release_date,
  backdrop_path,
}) => {
  const score = vote_average.toFixed(1) * 10 + "%";
  const imgPath = `https://image.tmdb.org/t/p/w500/${backdrop_path}`;
  const emptyPath = `./assets/emptyImage.png`;

  return `
  <li id=${id} class="card">
    <img src=${
      backdrop_path === null ? emptyPath : imgPath
    } alt="${title} poster" />
    <div class="card-info">
      <h2 class="card-info__title">${title}</h2>
      <div class="card-info__date">${release_date}</div>
      <div class="card-info__vote">
        <p class="card-info__aver">${vote_average.toFixed(1)}</p>
        <span class="empty-star">
          <span class="shining-star" style="width:${score}"></span>
        </span>
      </div>
      <p class="card-info__description">${overview}</p>
    </div>
  </li>
  `;
};

/**
 * 검색 결과 없을 시
 */
const empty = () => {
  return `
    <div class="main-empty">이런.. 검색 결과가 없네요..</div>
  `;
};

/**
 * DOM에 Card 뿌려주는 함수
 */
const printCard = (movies) => {
  const container = document.querySelector(".container");
  if (movies.length) {
    movies.forEach((movie) => {
      container.innerHTML += createCard(movie);
    });
  } else container.innerHTML += empty();
};

/**
 * 클릭 시 id를 alert으로 띄워주는 함수
 */
const clickedCard = () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const cardImage = card.firstElementChild;
    cardImage.addEventListener("click", () => {
      alert(`영화 Id : ${card.id}`);
    });
  });
};

/**
 * card 지우기
 */
const deleteCard = () => {
  const container = document.querySelector(".container");
  container.innerHTML = "";
};

/**
 * 검색
 */
document.getElementById("searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const query = document.getElementById("searchInput").value.toLowerCase();
  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      deleteCard();
      printCard(response.results);
      clickedCard();
    })
    .catch((err) => console.error(err));
});
