const search = document.getElementById("search");
const matchList = document.querySelector("#output");

/* 입력한 값에 따라 나라를 출력하는 함수 */
const searchStates = async (searchText) => {
  const res = await fetch("states.json");
  const states = await res.json();

  //  Array.filter(function)
  //  주어진 함수의 테스트를 통과하는 모든 요소를 모아 배열로 반환
  let matches = states.filter((state) => {
    // i: i플래그가 붙으면 대소문자 구분없이 검색
    // g: 패턴과 일치하는 모든 것을 반환, 없으면 첫번째 결과만 반환
    const regex = new RegExp(`^${searchText}`, "gi");

    // String.match(regexp)
    // 정규식 개체와 일치하는 전체 문자열을 배열로 반환
    /* 정규식과 일치하는 state.name 이나 abbr을 반환 */
    return state.name.match(regex) || state.abbr.match(regex);
  });
  // console.log(matches);

  /* 입력한 값이 없을 경우, matches 배열을 비우고 HTML도 비운다. */
  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }

  /* matches 배열을 인자로 넘겨 HTML 코드로 출력*/
  outputHtml(matches);
};

/* HTML을 출력하는 함수 */
const outputHtml = (matches) => {
  /* 입력한 값이 있다면 */
  if (matches.length) {
    // Array.prototype.map(callback)
    // 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를
    // 모아 새로운 배열을 반환

    // Array.prototype.join([separator])
    // 배열의 모든 요소를 구분자로 연결해 하나의 문자열로 만듬
    const html = matches
      .map(
        (match) => `<div class="card card-body mb-1">
        <h4>${match.name} (${match.abbr}) <span class="text-primary"${match.capital}></span></h4>
        <small>Lat: ${match.lat} / Long: ${match.long}</small>
        </div>
        `
      )
      .join("");
    // console.log(html);

    /* matchList(div)에 html을 집어넣음 */
    matchList.innerHTML = html;
  }
};

/* 검색창에 입력이 들어올때 searchStates 함수가 호출됨 */
search.addEventListener("input", () => searchStates(search.value));
