# Infinite Scroll on Facebook and Outside

One problem we face when using infinte scroll is that to get it to work inside the facebook chrome requires far more tinkering and fiddling than it does when outside on a normal webpage.

This plugin wraps up the different methods for infinite scrolling into a simple plugin that also you to set it up once and have it work across both scenarios.

## Setup

Include the ``canvas-infinite-scroll.js`` below your jQuery script tag.

Call the plugin on any selector to setup the scrolling for the page, supplying an object containing at least the ``onBottom`` key for what you want to happen when you hit the bottom. 
    
    $('body').canvasInfiniteScroll({
       onBottom: function(){
           alert('Im at the the bottom')
       } 
    });
    
Other options that can be passed in to override the sensible defaults

    {
        pollingTime: 800,  // how regularly in ms you want to check if were at the bottom
        
        tollerence: 700,   // will trigger when we are ~ 700px from the bottom of the page 
                           // There is a minimum tollerance setup on facebook scroll detection of 700 as 
                           // anything lower than this may not trigger that we have reached the bottom
    }