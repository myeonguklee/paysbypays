export const API_ENDPOINTS = {
  PAYMENT: {
    LIST: '/api/v1/payments/list',
  },
  MERCHANTS: {
    LIST: '/api/v1/merchants/list',
    DETAILS: '/api/v1/merchants/details',
    DETAIL: (mchtCode: string) => `/api/v1/merchants/details/${mchtCode}`,
  },
  COMMON: {
    PAYMENT_STATUS: '/api/v1/common/payment-status/all',
    // TODO: 엔드포인트 오타, 백엔드 수정 후 수정 필요
    PAYMENT_TYPE: '/api/v1/common/paymemt-type/all',
    MERCHANT_STATUS: '/api/v1/common/mcht-status/all',
  },
} as const;
