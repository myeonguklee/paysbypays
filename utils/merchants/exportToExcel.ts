import * as XLSX from 'xlsx';
import { Merchant } from '@/api/merchants/type';
import { MerchantStatus } from '@/api/type';

/**
 * 가맹점 데이터를 Excel 파일로 다운로드
 */
export const exportMerchantsToExcel = (
  data: Merchant[],
  merchantStatusMap: Record<MerchantStatus, string>,
  filename: string = '가맹점목록'
): void => {
  // Excel 시트에 표시할 데이터 변환
  const excelData = data.map((merchant) => ({
    가맹점명: merchant.mchtName,
    가맹점코드: merchant.mchtCode,
    업종: merchant.bizType,
    상태:
      merchantStatusMap[merchant.status as Exclude<MerchantStatus, string>] ||
      merchant.status,
  }));

  // 워크북 생성
  const worksheet = XLSX.utils.json_to_sheet(excelData);

  // 컬럼 너비 설정
  const columnWidths = [
    { wch: 20 }, // 가맹점명
    { wch: 20 }, // 가맹점코드
    { wch: 12 }, // 업종
    { wch: 10 }, // 상태
  ];
  worksheet['!cols'] = columnWidths;

  // 워크북 생성 및 시트 추가
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, '가맹점목록');

  // 파일명에 현재 날짜 추가
  const date = new Date();
  const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
  const finalFilename = `${filename}_${dateStr}.xlsx`;

  // Excel 파일 다운로드
  XLSX.writeFile(workbook, finalFilename);
};
