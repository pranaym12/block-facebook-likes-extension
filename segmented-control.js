////////////////////////////////
// Highlight Buttons
/* 
Segmented Control made by Travis Arnold
Link to Segmented Control: https://codepen.io/souporserious/pen/pbkJD
Link to Github: https://github.com/souporserious?utf8=%E2%9C%93&tab=repositories&q=&type=&language=;
*/

var $highlight = $('.highlight');

function translate(obj) {
  
    var $this    = obj.addClass('active'),
        width    = $this.width(),
        margin   = $this.outerWidth(true) - $this.outerWidth(),
        position = $this.offset().left + margin/2;

    $highlight.css({
        width: parseInt(width) + 'px',
        transform: 'translate(' + parseInt(position) + 'px' + ')'
    });
}

// add transition after page load
$(window).on('load resize', function() {
    
    // wait a little bit to add transition so we don't see on page load
    setTimeout(function() {
        $highlight.css({
            transition: 'all .5s'
        });
    }, 100);

    // load highlight on active control
  translate($('li:first-child'));
});

// switch to active control on click
$('li:not(.highlight)').on('click', function() {
  
  $('li').removeClass('active');
  translate($(this));
});