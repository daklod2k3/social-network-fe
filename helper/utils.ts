export const handlePasteImage = (e: any) => {
  return e.clipboardData.files;
};

export const FormatTime = (time: string | Date | undefined) => {
  // if (typeof window == "undefined") return;
  if (!time) return null;
  const postTime = new Date(time);
  const current = new Date();
  const diff = current.getTime() - postTime.getTime();
  // cons

  // console.log(diff / 1000 / 60);
  const second = diff / 1000;
  if (second < 60) {
    if (second < 1) return "Vừa xong";
    else return Math.floor(second) + " giây";
  }
  const minutes = second / 60;
  if (minutes < 60) return Math.floor(minutes) + " phút";
  const hours = minutes / 60;
  if (hours < 24) return Math.floor(hours) + " giờ";

  const day = hours / 24;
  // if ()
  if (day < 30) return Math.floor(day) + " ngày";

  if (current.getFullYear() !== postTime.getFullYear()) {
    return postTime.getTime();
  }

  // if (current.getMonth() !== postTime.getMonth())
  return postTime.toDateString();
  // console.log(postTime.toLocaleString("vi"));
};

export const CardHoverStyle =
  " transition-transform duration-200 ease-in-out hover:z-10 hover:-translate-y-2  hover:shadow-2xl";
