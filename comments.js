window.onload = function() {
  const wrappers = document.querySelectorAll('.fb-comments-wrapper');
  
  // Показ всех блоков сразу
  wrappers.forEach(function(wrapper) {
      wrapper.style.display = 'block';
  });
};
