export function toEnglishDigits(str: string): string {
  const persianDigits: string[] = [
    '۰',
    '۱',
    '۲',
    '۳',
    '۴',
    '۵',
    '۶',
    '۷',
    '۸',
    '۹',
  ];
  const arabicDigits: string[] = [
    '٠',
    '١',
    '٢',
    '٣',
    '٤',
    '٥',
    '٦',
    '٧',
    '٨',
    '٩',
  ];

  let result: string = str;
  for (let i: number = 0; i < 10; i++) {
    result = result
      .split(persianDigits[i])
      .join(String(i))
      .split(arabicDigits[i])
      .join(String(i));
  }

  return result;
}
