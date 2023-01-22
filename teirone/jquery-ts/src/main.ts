import './style.css';
import $ from "jquery";

$(() => {
  $("<h1>Hello jQuery TS</h1>").insertBefore("#app");
  $('#app').css({border: '1px dotted pink'})
  $('<img>', 
  {
    src: '../smile.png',
    alt: 'Smile Face',
    title: 'Rajahwu Programmer Logo',
    css: {
      cursor: 'pointer',
      border: '4px solid black',
      padding: '12px 12px 20px 14px',
      backgroundColor: 'blue'
    },
    click: function() {
      alert($(this).attr('title'))
    }
  })
  .appendTo('#app')
})
