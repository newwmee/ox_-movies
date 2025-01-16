import axios from "axios";
//환경변수로부터 Api키 와 토큰 가져오기
const apiKey = import.meta.env.VITE_REACT_APP_TMDB_API_KEY;
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

// axios 라이브러리를 활용 api 통신을 위한 instance 정의
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

// 영화목록(인기영화) 가져오는 함수
export const getMovieList = async () => {
  try {
    const response = await instance.get(
      `/movie/popular?api_key=${apiKey}&language=ko-KR` // movie/popular Api호출 데이터 가져옴
    );
    const filteredMovieList = response.data.results.filter(
      (movie) => !movie.adult // 데이터 필터링 성인용 콘텐츠 제외
    );
    return filteredMovieList;
  } catch (error) {
    console.error("영화 목록을 가져오는 중 오류 발생:", error);
    throw new Error("영화 목록을 가져오는 데 실패했습니다.");
  }
};

// 영화 상세 정보 가져오는 함수
export const getMovieDetail = async (id) => {
  try {
    const response = await instance.get(
      `/movie/${id}?api_key=${apiKey}&language=ko-KR`
    );
    return response.data;
  } catch (error) {
    console.error("영화 상세 정보를 가져오는 중 오류 발생:", error);
    throw new Error(
      "영화 상세 정보를 가져오는 데 실패했습니다. 잠시 후 다시 시도해주세요."
    );
  }
};

// 영화 검색 함수
export const searchMovies = async (query) => {
  try {
    const response = await instance.get(
      `/search/movie?api_key=${apiKey}&language=ko-KR&query=${query}`
    );
    return response.data.results; // 검색결과 반환
  } catch (error) {
    console.error("영화 검색 중 오류 발생", error);
    throw new Error("영화 검색에 실패했습니다.");
  }
};

// 비슷한 영화를 가져오는 함수
export const getSimilarMovies = async (movieId) => {
  try {
    const response = await instance.get(
      `/movie/${movieId}/similar?api_key=${apiKey}&language=ko-KR`
    );
    return response.data;
  } catch (error) {
    console.error("비슷한 영화 데이터 가져오기 실패:", error);
    throw error;
  }
};
