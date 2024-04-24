import { saveAs } from 'file-saver';
import Excel from 'exceljs';


export const colums:Array<COLUMS> = [
  {header: 'No', key: 'qno', width: 7, alignment: 'center'},
  {header: '질문', key: 'qquestion', width: 125, alignment: 'left'},
  {header: '작성자', key: 'qwriter', width: 25, alignment: 'center'},
  {header: '카테고리', key: 'qcategory', width: 10, alignment: 'center'},
  {header: '작성일자', key: 'qcreatedAt', width: 23, alignment: 'center'},
]

export const exportToExcel = async (search: string, list:Array<any>) => {
  const workSheetName = '질문목록탭';
  const workBookName = '추가한 질문 목록';
  const workbook = new Excel.Workbook();
  try {
    const fileName = search.length > 0 ? search : workBookName;
    const worksheet = workbook.addWorksheet(workSheetName);

    //@ts-ignore
    worksheet.columns = colums;
    worksheet.getRow(1).font = { bold: true };

    worksheet.columns.forEach((column:any)=> {
      column.width = column.width;
      column.alignment = { horizontal: 'left' };
      column.font = { name: '굴림', size: 10 };
    });

    //현재 sorting 되어져 있는 목록을 excel 에 출력
    list.forEach(singleData => {
      worksheet.addRow(singleData);
    });

    worksheet.eachRow({ includeEmpty: false }, row => {
      //@ts-ignore
      const currentCell = row._cells;
      //@ts-ignore
      currentCell.forEach(singleCell => {
        const cellAddress = singleCell._address;
        // apply border
        worksheet.getCell(cellAddress).border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    });

    const buf = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buf]), `${fileName}.xlsx`);

  } catch (error) {
    console.log(error)
  }
}


export type COLUMS = {
  header: string,
  key: string,
  width?: number,
  alignment?: string
}