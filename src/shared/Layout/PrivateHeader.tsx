import { MenuList } from "./sidebar/MenuList";

function PrivateSidebar() {
  return (
    <div className="min-w-50 bg-primary-light flex flex-col">
      <LogoName />
      <MenuList />
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
