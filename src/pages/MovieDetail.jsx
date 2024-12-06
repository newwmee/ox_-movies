import movieDetailData from "../data/movieDetailData.json";

const MovieDtail = () => {
  const baseUrl = "https://image.tmdb.org/t/p/w500"; // 이미지 URL 베이스
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // movieListData.json에서 results를 상태에 저장
    setMovies(movieDetailData.results);
  }, []);
};
