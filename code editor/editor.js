require.config({ paths: { vs: 'https://unpkg.com/monaco-editor@0.45.0/min/vs' } });

let editor;

require(['vs/editor/editor.main'], function () {
  editor = monaco.editor.create(document.getElementById('editor'), {
    value: `// Your JS code here can use variable "input"\nconsole.log("Hello World!");`,
    language: 'javascript',
    theme: 'vs-dark',
    automaticLayout: true
  });
});

document.getElementById('run-btn').addEventListener('click',  () => {
  const jsCode = editor.getValue();
  const userInput = document.getElementById('userInput').value;

  const iframeContent = `
    <html>
      <body>
        <pre id="console-output"></pre>
        <script>
          const input = ${JSON.stringify(userInput)};
          const oldLog = console.log;
          console.log = function(...args) {
            document.getElementById('console-output').innerText += args.join(' ') + '\\n';
            oldLog.apply(console, args);
          };
          try {
            ${jsCode}
          } catch(e) {
            console.log('Error:', e.message);
          }
        <\/script>
      </body>
    </html>
  `;

  const blob = new Blob([iframeContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const iframe = document.getElementById('output');
  iframe.src = url;
  iframe.onload = () => URL.revokeObjectURL(url);
});
