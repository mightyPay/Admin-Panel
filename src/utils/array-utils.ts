export function chunkArray(arr: any[], chunkSize: number) {
  console.log("creating chunks of slides");
  const resultArray = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    console.log({ arr, chunk, chunkSize });
    resultArray.push(chunk);
  }

  console.log({ resultArray });
  return resultArray;
}
