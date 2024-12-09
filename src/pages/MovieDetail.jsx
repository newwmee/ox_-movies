import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetail } from "../axios"; // API 호출 함수
import "./MovieDetail.css";

const MovieDetail = () => {
  // URL 파라미터에서 movieId 가져오기 - useParams 훅 사용
  const { movieId } = useParams();
  //상태정의
  //movieDetail: Api에서 가져온 영화 상세 데이터 저장
  //isLoading: 데이터 로딩 상태 관리
  // error: API 호출 실패 시 에러 메시지 저장
  const [movieDetail, setMovieDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //데이터가져오기 useEffect 사용
  // 컴포넌트가 마운트되거나 movieId가 변경될 때 TMDb API에서 데이터를 가져옴
  useEffect(() => {
    const fetchDetail = async () => {
      setIsLoading(true); //로딩 상태 시작
      try {
        //Api 호출을 통해 영화 상세데이터 가져오기
        const detail = await getMovieDetail(movieId);
        setMovieDetail(detail); //성공하면 영화 데이터 상태 업그레이드
      } catch (err) {
        console.error("영화 상세 정보를 가져오는 중 오류 발생:", err);
        setError("영화 상세 정보를 가져오는 데 실패했습니다."); //에러 상태 설정
      } finally {
        setIsLoading(false); //로딩 상태 종료
      }
    };

    fetchDetail();
  }, [movieId]); //movieId가 변경될 때마다 Api 호출

  //로딩및 에러상태 처리
  if (isLoading) {
    return <div>로딩 중...</div>; //데이터 로딩중 화면 표시 - 있으면 좋다 사용자가 보기 편하기 때문
  }

  if (error) {
    return <div>{error}</div>; //에러 발생 시 화면 표시
  }

  //영화 상세 정보 렌더링
  return (
    <div className="movie-detail-container">
      {movieDetail && (
        <div className="movie-detail-item">
          <img
            className="movie-detail-poster"
            src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
            alt={movieDetail.title}
          />
          <div className="movie-detail-info">
            <h1 className="movie-title">{movieDetail.title}</h1>
            <p className="movie-vote">
              ⭐ {movieDetail.vote_average} ({movieDetail.vote_count} votes)
            </p>
            <div className="movie-genres">
              {movieDetail.genres.map((genre) => (
                <span key={genre.id} className="genre">
                  {genre.name}
                </span>
              ))}
            </div>
            <p className="movie-overview">{movieDetail.overview}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
