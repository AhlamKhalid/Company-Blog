// module to format date
// input: 2020-03-04
// output: Mar 4, 2020

// Reformat date
const getDate = (date) => {
    // split by "-"
    const dateArray = date.split("-");
    // get year, month as number, day
    const [year, month_number, day] = dateArray;
    // format month
    const month_txt = getMonth(month_number);
    // format day
    const trunc_day = getDay(day);
    // get date as month day, year
    return `${month_txt} ${trunc_day}, ${year}`;
  }
  // format month by return the corresponding word
  const getMonth = (month_number) => {
    let month_txt = "";
    switch (month_number) {
      case "01":
        month_txt = "Jan";
        break;
      case "02":
        month_txt = "Feb";
        break;
      case "03":
        month_txt = "Mar";
        break;
      case "04":
        month_txt = "Apr";
        break;
      case "05":
        month_txt = "May";
        break;
      case "06":
        month_txt = "Jun";
        break;
      case "07":
        month_txt = "Jul";
        break;
      case "08":
        month_txt = "Aug";
        break;
      case "09":
        month_txt = "Sept";
        break;
      case "10":
        month_txt = "Oct";
        break;
      case "11":
        month_txt = "Nov";
        break;
      case "12":
        month_txt = "Dec";
        break;
    }
    return month_txt;
  }
  // format day by deleting the leading zero
  const getDay = (day) => {
    return day.charAt(0) === "0" ? day.substr(1) : day;
  }

  module.exports = getDate;