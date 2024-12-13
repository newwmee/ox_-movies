import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPage.css";
import { useUser } from "./Login";

const MyPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="mypage-wrapper">
      <h2 className="mypage-title">마이페이지</h2>
      <div className="mypage-content">
        <div className="profile-section">
          <div className="profile-image-wrapper">
            <img
              src={user.profileImageUrl || "/profile_image.jpg"}
              alt="프로필"
              className="profile-img"
              onError={(e) => {
                e.target.src = "/profile_image.jpg";
              }}
            />
          </div>
          <div className="profile-info">
            <div className="info-item">
              <span className="info-label">이메일</span>
              <span className="info-value">{user.email}</span>
            </div>
            {user.nickname && (
              <div className="info-item">
                <span className="info-label">닉네임</span>
                <span className="info-value">{user.nickname}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
