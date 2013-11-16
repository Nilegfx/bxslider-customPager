$(function(){

  
  var bxNile = $('ul.bxslider').bxSlider({
    captions: true,
    pager:false,
    startSlide:5,
    mode:"vertical",
    onSliderLoad:function(currentSlide){
      pagerBuilder.build(bxNile,this,"insertBefore",$(".nile"),true);
    }
  });
  
  pagerBuilder = {
    build:function(sliderElement,sliderObj,relevantAction,relevantElement,includeNextPrev){
      var _t = this;
      var relevantElement = relevantElement || sliderElement.parent(".bx-viewport"),
          relevantAction = relevantAction || "insertAfter",
          customPagerUlProp = {
        "class":"bx-custom-pager"
      },
      //create empty list to contain all pager items (LIs)
      customPagerUl = $("<ul>",customPagerUlProp);
      
      if(includeNextPrev){ 
        $("<a>", {
              "text":"Prev",
              on:{
                click:function(){
                  sliderElement.goToPrevSlide();
                  _t.indicateCurrentSlide(customPagerUl,sliderElement,"active");
                }
              }
        })[relevantAction](relevantElement);

        $("<a>", {
              "text":"Next",
              on:{
                click:function(){
                  sliderElement.goToNextSlide();
                  _t.indicateCurrentSlide(customPagerUl,sliderElement,"active");
                }
              }
        })[relevantAction](relevantElement);
      }

      sliderElement.children().not(".bx-clone").each(function(i,el){
        var props = {
              "text":"go to"+(i + 1),
              data:{"goto":i}/*, //we can do it here or one time for the parent UL
              on:{
                click:function(){
                sliderElement.goToSlide(i)
              }
            }*/
        }
        $("<li>",props).appendTo(customPagerUl);

      });
      customPagerUl[relevantAction](relevantElement);
      _t.indicateCurrentSlide(customPagerUl,sliderElement,"active");
      customPagerUl.on("click",">li",function(){
        var $this = $(this);
        sliderElement.goToSlide($this.data("goto"));
        _t.indicateCurrentSlide(customPagerUl,sliderElement,"active");
      });

    },
    indicateCurrentSlide:function(pagerElemet,sliderElement,activeClass){
      pagerElemet.find("li").removeClass(activeClass).eq(sliderElement.getCurrentSlide()).addClass(activeClass);
    }
  }

});