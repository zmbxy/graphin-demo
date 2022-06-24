const RouteSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.88 33.18" width="47.88" height="33.18">
    <defs>
      <style>.cls-1{fill:#1b9bdb;}.cls-2{fill:#3ed6ff;}.cls-3{fill:#fff;}</style>
    </defs>
    <path class="cls-1" d="M0,10.12V22.91c.08,5.24,10.77,10.27,23.94,10.27s23.85-5,23.94-10.27V10.12Z" />
    <path class="cls-2" d="M47.88,10.08c0,5.56-10.72,10.86-23.94,10.86S0,15.64,0,10.08,10.72,0,23.94,0,47.88,4.51,47.88,10.08Z" />
    <path class="cls-3" d="M21.85,5h1.6V8.5h1.62L25,5h1.59L24.22.76Zm3.25,5.92H23.45V15H21.77l2.54,4.21L26.82,15H25.13Zm6.68-2-.07-1.68-4,2.52,4.2,2.52-.07-1.68h6.94l-.14-1.68Zm-15,0H9.86l-.13,1.68h7l-.06,1.68L20.79,9.7l-4-2.52Z" />
  </svg>
`;

const src = `data:image/svg+xml;base64,${window.btoa(RouteSVG)}`;
console.log(src)

const file = new File([RouteSVG], 'route.svg', {});

const reader = new FileReader();

reader.onload = (e) => {
  const ImgBase64 = `data:image/svg+xml;base64,${window.btoa(e.target.result)}`;
  console.log(ImgBase64);
}

reader.readAsText(file);
