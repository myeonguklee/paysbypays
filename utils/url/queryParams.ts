/**
 * URL 쿼리 파라미터에서 문자열 값 파싱
 */
export const parseQueryParam = (
  value: string | null,
  defaultValue: string
): string => {
  return value || defaultValue;
};

/**
 * URL 쿼리 파라미터에서 숫자 값 파싱
 */
export const parseNumberParam = (
  value: string | null,
  defaultValue: number
): number => {
  const parsed = value ? parseInt(value, 10) : defaultValue;
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * URL 쿼리 파라미터 생성
 */
export const buildQueryParams = (
  params: Record<string, string | number>
): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      searchParams.set(key, String(value));
    }
  });

  return searchParams.toString();
};
