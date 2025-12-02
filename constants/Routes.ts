export const ROUTES = {
  DASHBOARD: '/',
  // 거래 내역
  PAYMENTS: '/payments',
  // 가맹점
  MERCHANTS: '/merchants',
} as const;

export const ROUTE_LABELS = {
  [ROUTES.PAYMENTS]: '거래 내역',
  [ROUTES.MERCHANTS]: '가맹점',
} as const;
