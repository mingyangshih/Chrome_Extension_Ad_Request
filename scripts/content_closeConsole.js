(function () {
  removeConsole();
  // Render console
  function removeConsole() {
    let RAFID = localStorage.getItem('RAFID');
    localStorage.removeItem('RAFID');
    cancelAnimationFrame(RAFID);
    let adBoard = window.document.getElementById('position_board');
    window.document.body.removeChild(adBoard);
  }
})();
