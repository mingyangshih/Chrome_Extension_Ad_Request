cancelAnimationFrame(RAFID);
removeConsole();
// Render console
function removeConsole() {
  let adBoard = window.document.getElementById('position_board');
  window.document.body.removeChild(adBoard);
}
