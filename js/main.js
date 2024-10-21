(function () {
  document.getElementById("birthdateForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const birthdate = document.getElementById("birthdate");

    if (birthdate) {
      window.location.href = `./html/mori.html?birthdate=${birthdate.value}`;
    }
  });
})();
