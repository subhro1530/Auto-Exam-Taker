document.addEventListener("DOMContentLoaded", function () {
  const pdfs = [
    "1.pdf",
    "2.pdf",
    "3.pdf",
    "4.pdf",
    "5.pdf",
    "6.pdf",
    "7.pdf",
    "8.pdf",
    "9.pdf",
    "10.pdf",
  ];
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  let remainingTime;
  let nextExamTime;
  let isEmailButtonVisible = true;

  function updatePDFViewer(pdfName) {
    const pdfViewer = document.getElementById("pdfViewer");
    pdfViewer.innerHTML = `<embed src="${pdfName}" type="application/pdf" width="100%" height="100%">`;
  }

  function updateCounter() {
    const counter = document.getElementById("counter");
    if (remainingTime > 0) {
      const hours = Math.floor(remainingTime / 3600);
      const minutes = Math.floor((remainingTime % 3600) / 60);
      const seconds = remainingTime % 60;
      if (remainingTime >= 7200) {
        counter.innerHTML = `Next exam at ${nextExamTime}`;
      } else {
        counter.innerHTML = `Time left for submission: ${hours}h ${minutes}m ${seconds}s`;
      }
    } else {
      counter.innerHTML = "Good luck!";
      if (isEmailButtonVisible) {
        document.getElementById("emailButton").style.display = "none";
        isEmailButtonVisible = false;
      }
    }
    remainingTime--;
  }

  function getNextExamTime() {
    const currentHour = currentDate.getHours();
    if (currentHour >= 4 && currentHour < 6) {
      nextExamTime = "11:00";
      remainingTime = (6 - currentHour - 1) * 3600;
    } else if (currentHour >= 11 && currentHour < 13) {
      nextExamTime = "16:00";
      remainingTime = (13 - currentHour - 1) * 3600;
    } else {
      nextExamTime = "11:00";
      remainingTime = (24 - currentHour + 4 - 1) * 3600;
    }
  }

  function checkExamAvailability() {
    getNextExamTime();
    const currentExamIndex =
      currentDate.getHours() >= 4 && currentDate.getHours() < 6
        ? 0
        : currentDate.getHours() >= 11 && currentDate.getHours() < 13
        ? 1
        : -1;
    if (currentExamIndex !== -1 && currentDay >= 15 && currentDay <= 19) {
      const currentExam = pdfs[currentDay - 15];
      updatePDFViewer(currentExam);
      updateCounter();
      setInterval(updateCounter, 1000);
    } else {
      document.getElementById("pdfViewer").innerHTML =
        "<p>No exam available at the moment.</p>";
    }
  }

  checkExamAvailability();
});
