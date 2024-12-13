import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPage.css";
import { useUser } from "./Login";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth"; // 추가
import defaultProfile from "../assets/default-profile.png";

const MyPage = () => {
  const navigate = useNavigate();
  const { user: contextUser } = useUser();
  const { user: supabaseUser } = useSupabaseAuth();
  const [imageLoaded, setImageLoaded] = useState(true);

  useEffect(() => {
    if (!contextUser) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
    }
  }, [contextUser, supabaseUser, navigate]);

  if (!contextUser) return null;
  return (
    <div className="mypage-wrapper">
      <h2 className="mypage-title">마이페이지</h2>
      <div className="mypage-content">
        <div className="profile-section">
          <div className="profile-image-wrapper">
            <img
              src={defaultProfile}
              alt="프로필"
              className={`profile - img ${imageLoaded ? "loaded" : ""}`}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                e.target.src = defaultProfile;
                setImageLoaded(true);
              }}
            />
          </div>
          <div className="profile-info">
            <div className="info-item">
              <span className="info-label">이메일</span>
              <span className="info-value">{useUser.email}</span>
            </div>
            {useUser.nickname && (
              <div className="info-item">
                <span className="info-label">닉네임</span>
                <span className="info-value">{useUser.nickname}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
