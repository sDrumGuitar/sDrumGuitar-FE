import { Outlet, useLocation } from 'react-router-dom';

const PAGE_TITLE_MAP: Record<string, string> = {
  '/home': '홈',
  '/student': '학생 관리',
  '/course': '수강 관리',
  '/schedule': '일정 관리',
  '/message': '메시지',
  '/message/send': '문자 보내기',
  '/message/history': '발송 내역',
  '/message/template': '문자 템플릿',
};

function OutletLayout() {
  const { pathname } = useLocation();

  const pageTitle =
    PAGE_TITLE_MAP[pathname] ??
    PAGE_TITLE_MAP[
      Object.keys(PAGE_TITLE_MAP).find((key) => pathname.startsWith(key)) ?? ''
    ] ??
    '페이지';

  return (
    <div className="pt-6 px-4 md:pt-10 md:px-10 w-full">
      <p className="text-xl font-bold">{pageTitle}</p>
      <hr className="my-4 text-gray-500" />
      <Outlet />
    </div>
  );
}

export default OutletLayout;
