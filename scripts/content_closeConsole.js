(function () {
  removeConsole();
  // Remove console
  function removeConsole() {
    let RAFID = localStorage.getItem("RAFID");
    if (RAFID) {
      localStorage.removeItem("RAFID");
      cancelAnimationFrame(RAFID);
    }
    let adBoard = window.document.getElementById("position_board");
    if (adBoard) {
      window.document.body.removeChild(adBoard);
    }
  }
})();
