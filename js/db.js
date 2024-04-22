const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyY2I4YWI3MzJjNzg3MmM3MzZiNGEzYjg5NjVkYTJmOCIsInN1YiI6IjYzMWI0MDFiNzdiMWZiMDA4MDdjMGM1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ntir1NwhV1WmEvgv2Od4TB1bguUQx6f1LiwHDqZojOM",
  },
};

/**
 * 방문 시 데이터 가져오기
 */
fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    printCard(response.results);
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
  const cardHTML = `
  <li id=${id} class="card">
    <img src="https://image.tmdb.org/t/p/w500/${backdrop_path}" alt="${title} poster" />
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

  return cardHTML;
};

/**
 * DOM에 Card 뿌려주는 함수
 */
const printCard = (movies) => {
  const container = document.querySelector(".container");
  movies.forEach((movie) => {
    container.innerHTML += createCard(movie);
  });
};
