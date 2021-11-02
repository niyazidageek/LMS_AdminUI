export default function normalizedDate(date) {
  let resultDate;
  resultDate = Date.parse(date);
  resultDate = new Date(resultDate);
  resultDate = resultDate.toDateString();
  resultDate = resultDate.replace(/\s+/g, "/");
  return resultDate;
}
