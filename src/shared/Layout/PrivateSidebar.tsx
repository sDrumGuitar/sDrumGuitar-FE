import { useNavigate } from 'react-router-dom';
import { MenuList } from './menuList/MenuList';
import { IoIosLogOut } from 'react-icons/io';

function PrivateSidebar() {
  return (
    <div className="min-w-50 bg-primary-light flex flex-col justify-between">
      <div>
        <LogoName />
        <MenuList />
      </div>

      <LogoutButton />
    </div>
  );
}
export default PrivateSidebar;

const LogoName = () => {
  return (
    <p className="text-2xl font-bold px-4 py-10">
      에스드럼기타
      <br />
      음악교습소
    </p>
  );
};

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 👉 추후 실제 로그아웃 로직 추가 가능
    // ex) auth.signOut(), 토큰 삭제 등
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  return (
    <div
      onClick={handleLogout}
      className="px-4 py-6 text-left hover:text-black text-gray-500 hover:font-bold flex gap-1 items-center"
    >
      <IoIosLogOut size={18} />
      로그아웃
    </div>
  );
};
