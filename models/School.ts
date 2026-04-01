export interface SchoolRaw {
  "SCHOOL NO.": number;
  "ENGLISH CATEGORY": string;
  "中文類別": string;
  "ENGLISH NAME": string;
  "中文名稱": string;
  "ENGLISH ADDRESS": string;
  "中文地址": string;
  "LONGITUDE": number;
  "經度": number;
  "LATITUDE": number;
  "緯度": number;
  "EASTING": number;
  "坐標東": number;
  "NORTHING": number;
  "坐標北": number;
  "STUDENTS GENDER": string;
  "就讀學生性別": string;
  "SESSION": string;
  "學校授課時間": string;
  "DISTRICT": string;
  "分區": string;
  "FINANCE TYPE": string;
  "資助種類": string;
  "SCHOOL LEVEL": string;
  "學校類型": string;
  "TELEPHONE": string;
  "聯絡電話": string;
  "FAX NUMBER": string;
  "傳真號碼": string;
  "WEBSITE": string;
  "網頁": string;
  "RELIGION": string;
  "宗教": string;
}

export interface School {
  schoolNo: number;
  category: string;
  name: string;
  address: string;
  longitude: number;
  latitude: number;
  gender: string;
  session: string;
  district: string;
  financeType: string;
  schoolLevel: string;
  telephone: string;
  fax: string;
  website: string;
  religion: string;
}
