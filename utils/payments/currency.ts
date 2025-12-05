// 고정 환율 적용
// TODO: 실제 환율 API 연동 및 추가 통화 지원 필요

const EXCHANGE_RATE = {
  KRW: 1,
  USD: 1300, // 1 USD = 1300 KRW
} as const;

export const convertToKRW = (amount: number, currency: string): number => {
  const rate = EXCHANGE_RATE[currency as keyof typeof EXCHANGE_RATE] || 1;
  return amount * rate;
};
