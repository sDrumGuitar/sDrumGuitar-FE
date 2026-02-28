import { useNavigate } from 'react-router-dom';
import { MenuList } from './menuList/MenuList';
import { IoIosLogOut } from 'react-icons/io';

function PrivateSidebar() {
  return (
    <div className="w-full md:min-w-50 md:w-50 bg-primary-light flex flex-col">
      <div className="flex items-center justify-between md:block px-4 py-4 md:px-0 md:py-0">
        <LogoName />
        <div className="md:hidden">
          <LogoutButton compact />
        </div>
      </div>

      <MenuList />

      <div className="hidden md:block mt-auto">
        <LogoutButton />
      </div>
    </div>
  );
}
export default PrivateSidebar;

const LogoName = () => {
  return (
    <p className="text-lg md:text-2xl font-bold md:px-4 md:py-10">
      에스드럼기타
      <span className="ml-1 inline md:ml-0 md:block">음악교습소</span>
    </p>
  );
};

const LogoutButton = ({ compact = false }: { compact?: boolean }) => {
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
      className={`text-left hover:text-black text-gray-500 hover:font-bold flex gap-1 items-center ${
        compact ? 'px-3 py-2 text-sm' : 'px-4 py-6'
      }`}
    >
      <IoIosLogOut size={18} />
      로그아웃
    </div>
  );
};
