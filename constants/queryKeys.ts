export const QUERY_KEYS = {
  PAYMENT: {
    base: ['payment'] as const,
    LIST: () => [...QUERY_KEYS.PAYMENT.base, 'list'] as const,
  },

  MERCHANTS: {
    base: ['merchants'] as const,
    LIST: () => [...QUERY_KEYS.MERCHANTS.base, 'list'] as const,
    DETAILS: () => [...QUERY_KEYS.MERCHANTS.base, 'details'] as const,
    DETAIL: (mchtCode: string) =>
      [...QUERY_KEYS.MERCHANTS.base, 'detail', mchtCode] as const,
  },

  COMMON: {
    base: ['common'] as const,
    PAYMENT_STATUS: () =>
      [...QUERY_KEYS.COMMON.base, 'payment-status'] as const,
    PAYMENT_TYPE: () => [...QUERY_KEYS.COMMON.base, 'payment-type'] as const,
    MERCHANTS_TYPE: () =>
      [...QUERY_KEYS.COMMON.base, 'merchants-status'] as const,
  },
};
