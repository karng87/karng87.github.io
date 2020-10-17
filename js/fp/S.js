!function(){

  const $ = sel => document.querySelector(sel);

  $.el = curried(
    html => {
      const parent = document.createElement('div');
      parent.innerHTML = html;
      return parent.children.length == 1 ? parent.children[0] : parent.children;
    }
  );


  $.append = curried((parent, child) => parent.appendChild(child));
  //$.append = function(parent, child) {
  //   if (arguments.length == 1) return child => $.append(parent, child);
  //   else return parent.appendChild(child); 
  //} 
  
  $.on = (delegateTarget, eventName, selector, f)=>{
    delegateTarget.addEventListener(eventName, f);
  }

  window.$ = $;
} ();
