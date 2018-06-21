  var barWidth = 10;
  var leftRight = new Partition({
    direction: 'vertical',
    a: '#left',
    b: '#right',
    barWidth: barWidth
  });
  
  var htmlJs = new Partition({
    direction: 'horizontal',
    a: '#html',
    b: '#js',
    barWidth: barWidth
  });
  
  var cssPreview = new Partition({
    direction: 'horizontal',
    a: '#css',
    b: '#preview',
    barWidth: barWidth
  })
  
  window.onmouseup = function () {
    cssPreview.fullStop();
    htmlJs.fullStop();
    //console.log('Mouseup')
  }
  
  var html = CodeMirror(document.getElementById('html'), {
    lineNumbers: true,
    mode: 'text/html',
    theme: 'hopscotch',
    autoCloseTags: true,
    autoCloseBrackets: true,
    value: window.sessionStorage.getItem('body')
  });
  var js = CodeMirror(document.getElementById('js'),  {
    lineNumbers: true,
    mode: 'javascript',
    theme: 'hopscotch',
    autoCloseTags: true,
    autoCloseBrackets: true,
    value: window.sessionStorage.getItem('script')
  });
  var css = CodeMirror(document.getElementById('css'), {
    lineNumbers: true,
    mode: 'css',
    theme: 'hopscotch',
    autoCloseTags: true,
    autoCloseBrackets: true,
    value: window.sessionStorage.getItem('style')
  });
  
  var iframe = document.getElementById('iframe');
  
  CodeMirror.on(html, 'change', function() {
    window.sessionStorage.setItem('body', html.getValue())
    updateFrame()
  });
  
   CodeMirror.on(css, 'change', function() {
    window.sessionStorage.setItem('style', css.getValue())
    iframe.contentWindow.document.getElementById('style').innerHTML = css.getValue();
    // updateFrame()
  });
  
  CodeMirror.on(js, 'change', function() {
    window.sessionStorage.setItem('script', js.getValue())
    updateFrame()
  });
  
  function updateFrame() {
    iframe.src = '/preview'
  }