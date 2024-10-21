const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1; // Jan = 0, so adding 1
const maxAge = 80;
const ageGroup = 12 * 5; // Five years

function isValidYear(yy) {
  if (currentYear - yy > maxAge || currentYear < yy) {
    alert("Fake! No one lives that much! - Go back and insert a valid date");
    return false;
  }
  return true;
}

function monthsLived(yy, mm) {
  const yearsLived = currentYear - yy;
  const months = yearsLived * 12 + (currentMonth - mm);
  return months;
}

(function () {
  const params = new URLSearchParams(document.location.search);
  if (params.size === 0) {
    window.location.href = "/";
    return;
  }
  const birthdate = params.get("birthdate");
  const date = birthdate.split("-");

  const day = parseInt(date[2]);
  const month = parseInt(date[1]);
  const year = parseInt(date[0]);

  if (!isValidYear(year) || !day || !month || !year) {
    alert("Invalid date my friend");
    window.location.href = "/";
    return;
  }

  const timeLivedInMonths = monthsLived(year, month);
  const maxAgeInMonths = maxAge * 12;
  const lifeDiv = document.getElementById("life");

  for (let i = 0; i < maxAgeInMonths; i += ageGroup) {
    const blockDiv = document.createElement("div");
    blockDiv.classList.add("block");

    const ageLabel = document.createElement("h2");
    ageLabel.innerText = `${i / 12 + 5} years`;
    blockDiv.appendChild(ageLabel);

    const monthContainer = document.createElement("div");
    monthContainer.classList.add("month-container");

    for (let j = i; j < i + ageGroup; j++) {
      let div = document.createElement("div");
      div.classList =
        "month " + (j < timeLivedInMonths ? "month-lived" : "month-tolive");

      monthContainer.appendChild(div);
    }

    blockDiv.appendChild(monthContainer);
    lifeDiv.appendChild(blockDiv);
  }

  document.getElementById("exportBtn").addEventListener("click", function () {
    const element = document.getElementById("life");

    element.classList.add("printable");

    html2pdf()
      .from(element)
      .set({
        margin: 0.5,
        filename: "life-in-months.pdf",
        html2canvas: {
          scale: 3,
          useCORS: true,
        },
        jsPDF: { orientation: "portrait", unit: "in", format: "letter" },
      })
      .save()
      .then(() => {
        element.classList.remove("printable");
      });
  });
})();
