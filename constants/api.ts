export const API_ENDPOINTS = {
  PAYMENT: {
    LIST: '/api/v1/payments/list',
  },
  MERCHANTS: {
    LIST: '/api/v1/merchants/list',
    ALL_DETAILS: '/api/v1/merchants/details',
    DETAIL: (mchtCode: string) => `/api/v1/merchants/details/${mchtCode}`,
  },
  COMMON: {
    PAYMENT_STATUS: '/api/v1/common/payment-status/all',
    PAYMENT_TYPE: '/api/v1/common/payment-type/all',
    MERCHANT_STATUS: '/api/v1/common/mcht-status/all',
  },
} as const;
