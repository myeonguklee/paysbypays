import * as XLSX from 'xlsx';
import { ProcessedPayment } from './transformPaymentData';

/**
 * 결제 데이터를 Excel 파일로 다운로드
 */
export const exportPaymentsToExcel = (
  data: ProcessedPayment[],
  filename: string = '거래내역'
): void => {
  // Excel 시트에 표시할 데이터 변환
  const excelData = data.map((payment) => ({
    거래시간: payment.paymentAtFormatted,
    가맹점: payment.mchtName,
    거래코드: payment.paymentCode,
    거래금액: `${payment.amount} ${payment.currency}`,
    결제수단: payment.payTypeKor,
    상태: payment.statusKor,
  }));

  // 워크북 생성
  const worksheet = XLSX.utils.json_to_sheet(excelData);

  // 컬럼 너비 설정
  const columnWidths = [
    { wch: 20 }, // 거래시간
    { wch: 15 }, // 가맹점
    { wch: 25 }, // 거래코드
    { wch: 15 }, // 거래금액
    { wch: 12 }, // 결제수단
    { wch: 10 }, // 상태
  ];
  worksheet['!cols'] = columnWidths;

  // 워크북 생성 및 시트 추가
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, '거래내역');

  // 파일명에 현재 날짜 추가
  const date = new Date();
  const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
  const finalFilename = `${filename}_${dateStr}.xlsx`;

  // Excel 파일 다운로드
  XLSX.writeFile(workbook, finalFilename);
};
