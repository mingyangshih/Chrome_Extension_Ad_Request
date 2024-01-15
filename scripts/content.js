let ympb_checker = setInterval(function () {
  console.log(window.YMPB_DATA);
  console.log(
    'typeof YMPB_DATA === object: ' + (typeof window.YMPB_DATA === 'object')
  );
  if (typeof window.YMPB_DATA === 'object') {
    //renderConsole();
    //gptEventLogging();
    //window.requestAnimationFrame(render);
    clearInterval(ympb_checker);
  }
}, 1000);
