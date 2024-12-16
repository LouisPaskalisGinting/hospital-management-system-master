export function formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
}

export function formatTime(date) {
    const options = { hour: "numeric", minute: "numeric" };
    const formattedTime = date.toLocaleTimeString("en-US", options);
    return formattedTime;
}

export function formatSimpleDate(d) {
    const date = new Date(d);
    const yyyyMMdd =
      date.toLocaleString().split(",")[0].split(" ")[0].split("/")[2] +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0");
    return yyyyMMdd;
}