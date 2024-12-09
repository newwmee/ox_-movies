import axios from "axios";

const apiKey = import.meta.env.VITE_REACT_APP_TMDB_API_KEY;
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
}); // axios 라이브러리를 활용 api 통신을 위한 instanxdce(정의하는)코드

export const getMovieList = async () => {
  try {
    const response = await instance.get(
      `/movie/popular?api_key=${apiKey}&language=ko-KR`
    );
    const filteredMovieList = response.data.results.filter(
      (movie) => !movie.adult
    );
    return filteredMovieList;
  } catch (error) {
    console.error("영화 목록을 가져오는 중 오류 발생:", error);
    throw new Error("영화 목록을 가져오는 데 실패했습니다.");
  }
};

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
