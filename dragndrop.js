let currentDroppable = null;
var allElements = null;
var rotation = 0;
let belowCurrentDroppable = null;
var lever = false;
var lever2 = false;
var location_buffer;
var tagged_elements = [""];
var amongaia = [""];

oriani_1.onmousedown = function(event){drag_and_drop(event, oriani_1)};
oriani_2.onmousedown = function(event){drag_and_drop(event, oriani_2)};
oriani_3.onmousedown = function(event){drag_and_drop(event, oriani_3)};

      function drag_and_drop(event, selfObj) {
        let shiftX = event.clientX - selfObj.getBoundingClientRect().left - 25;    
        let shiftY = event.clientY - selfObj.getBoundingClientRect().top - 25;
  
        selfObj.style.position = 'absolute';
        selfObj.style.zIndex = 1000;
        document.body.append(selfObj);

        moveAt(event.pageX, event.pageY);
  
        function moveAt(pageX, pageY) {
          if(pageX - shiftX <= 600 && (pageY - shiftY >= 100 && pageY - shiftY <= 700)){
            selfObj.style.left = pageX - shiftX - (pageX - shiftX) % 50 + 'px';
            selfObj.style.top = pageY - shiftY - (pageY - shiftY) % 50 + 'px';
          }else{
            selfObj.style.left = pageX - shiftX + 'px';
            selfObj.style.top = pageY - shiftY + 'px';
          }
          // console.log("im working");
          for (let i = 1; i < amongaia.length; i++) {
            amongaia[i].style.background = 'pink';
          }
          
        document.addEventListener('mouseup', function(event) {   
          // console.log("I WORK HERE??")
          document.removeEventListener('mousemove', onMouseMove);
          selfObj.onmouseup = null;                                 
          selfObj.onmousedown = function(event){}                    // FIXXED (MAGRAM ISE QENI ROM MXOLOD ROCA UJREBSHI SHEDIS MASHIN GAETISHOS)  
          setInStone();
        });


        // document.addEventListener('keyup', function(event){
        //   if(event.key == "z" || event.key == "Z") {
        //     setInStone();
        //     for (let i = 1; i < amongaia.length; i++) {
        //       amongaia[i].style.background = 'pink';
        //     }
        //   }
        // })
        }
  
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
  
          selfObj.hidden = true;
          let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
          let elemBelowBelow = document.elementFromPoint(event.clientX , event.clientY + 50);
          selfObj.hidden = false;
  

          document.addEventListener('keydown', function(event) {     
            lever2 = true;                                            //FIXED THE INITIAL SHIP LEAVING A SHADOW IF ROTATED
            if(event.key == "r" || event.key == "R") {
              if(!lever){
                lever = true;
                if(rotation < 1){
                rotation += 1;
                }else{
                  rotation = 0;
                }
                // selfObj.style.tansform = 'rotate(90)';
              }
              setInStone();
            }
            
        });

          document.addEventListener('keyup', function(event) { 
              lever = false;
              // amogus();                                                //FIX ME PLZ
          });


          if (!elemBelow) return;
  
          let droppableBelow = elemBelow.closest('.droppable');
          let droppableBelowBelow = elemBelowBelow.closest(".droppable");
          function amogus(){
            if (currentDroppable != droppableBelow) {
              if (currentDroppable) { // null when we were not over a droppable before this event
                leaveDroppable(breakAwayLeaveDroppable(currentDroppable, 2, rotation));
                // console.log(breakAwayLeaveDroppable(droppableBelow, 2, 0)) //abrunebs location-s, location aris array romelshic aris koordinatebi aseve arrays saxit
              }
              currentDroppable = droppableBelow;
              belowCurrentDroppable = droppableBelowBelow;
              if (currentDroppable) { // null if we're not coming over a droppable now
                // (maybe just left the droppable)
                // console.log(enterDroppable(breakAwayLeaveDroppable(currentDroppable, 2, rotation)));
                enterDroppable(breakAwayLeaveDroppable(currentDroppable, 2, rotation));
              }
              allElements = document.querySelectorAll('[id$="tagged"]');
              // console.log(allElements); // es aris rac poulobs datagul ujrebs zionastoris mociquloido
            }}
            amogus();

        }
  
        document.addEventListener('mousemove', onMouseMove);
  
        selfObj.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          selfObj.onmouseup = null;
          lever2 = false;
        };
        
        selfObj.ondragstart = function() {
          return false;
        };
      };
  
      function enterDroppable(location) {
        location.forEach(element => {
          object = document.querySelector(`[id^="x=${element[0]} y=${element[1]}"]`);         

          // if(x.includes(element[0]) && y.includes(element[1])){
          //   console.log("very much so xd oi vey");
          // }
          // console.log("very much so xd oi vey");

          object.style.background = 'pink';
          object.id += " tagged";
        })
        tagged_elements = document.querySelectorAll('[id$="tagged"]');         //AQ IYO FUCKED UP YVELAFERI
        var x = new Array(20);
        var y = new Array(20);
        for (let i = 0; i < tagged_elements.length; i++) {
          for (let j = 0; j < 2; j++) {
            split_id = tagged_elements[i].id.split(" ");
            x[i] = parseInt(split_id[0].split("=")[1]);             //ES DAIKIDE, CADE ROM CURRENTDROPPABLE-DAN AMOIGO XD KACI
            y[i] = parseInt(split_id[1].split("=")[1]);
          }
        }


      }
  
      function leaveDroppable(location) {

        location.forEach(element => {
          object = document.querySelector(`[id^="x=${element[0]} y=${element[1]}"]`);

          object.style.background = 'cyan';
          objtemp = object.id.replace(" tagged", "");
          object.id = objtemp;
        });
      }

      function breakAwayLeaveDroppable(coreBlock, shipLength, rotation) {

        _corePos = coreBlock.id.substring(0, coreBlock.id.length);
        // console.log(coreBlock.id + " coreblock id");
        corePos = _corePos.split(" ");
        for (let i = 0; i < corePos.length; i++) {
          temp = corePos[i].split("=");
          corePos[i] = parseInt(temp[1]);
        }
        // console.log(corePos);

        var location = new Array(1);
        for (var i = 0; i <= 1; i++) {
          location[i] = new Array(1);
        }

        if(rotation == 0){ //gemis cxviri iyureba qvevit
          if(location_buffer != null){
          leaveDroppable(location_buffer);
          }
          for (let i = 0; i < shipLength; i++) {
            if(corePos[1] != 11){
              location[i][0] = corePos[0];            
              location[i][1] = corePos[1] + i;
            }else{
              location[i][0] = corePos[0];            
              location[i][1] = corePos[1] - i;
            }
          }
          location_buffer = location;
          return location;
          
        }else if(rotation == 1){ //gemis cxviri iyureba marcxniv
          leaveDroppable(location_buffer);
          for (let i = 0; i < shipLength; i++) {
            if(corePos[0] != 0){
            location[i][0] = corePos[0] - i;
            location[i][1] = corePos[1];
            }else{
            location[i][0] = corePos[0] + i;
            location[i][1] = corePos[1];
            }
          }
          location_buffer = location;
          return location;
        // }else if(rotation == 2){ //gemis cxviri iyureba zemot   //SCRAPPED CONCEPT, DROPPED CUZ ZEMOT YUREBA GLITCHAVS TF OUT OF YVELAFERI
        //   for (let i = 0; i < shipLength; i++) {
        //   location[i][0] = location_fixer[0];
        //   location[i][1] = location_fixer[1]-i;           
        //   }
        //   // leaveDroppable(location_fixer);
        //   // enterDroppable(location_fixer);
        //   return location;
        // }else if(rotation == 3){ //gemis cxviri iyureba marjvniv

        //   for (let i = 0; i < shipLength; i++) {
        //     location[i][0] = corePos[0] + i;
        //     location[i][1] = corePos[1];
        //   }
        //   leaveDroppable(location);
        //   enterDroppable(location);
        //   return location;
        }else{
          console.log("Something Went wrong! Rotation has Wrong Value!");
        }



      }

      amongaia = tagged_elements;
      function setInStone(){
        if(!lever2){
          lever2 = true;
          var temp2 = document.querySelectorAll('[id$="tagged"]');
          // console.log(temp);            //AQAUROBA DAFIXE PLS CUDADVAR UKVE
          console.log(temp2);
          // tagged_elements = temp2.concat(temp2);
          amongaia = Array.prototype.concat.call(...amongaia , ...temp2 );
          // console.log(amongaia);
          for (let i = 1; i < amongaia.length; i++) {
            amongaia[i].style.background = 'pink';
          }
        }
      }

      function enemyCoords(coords, selfCoords){
        element = document.querySelector(`[id^="${coords}"]`);
        checkerElement = document.querySelector(`[id="${coords} tagged"]`);
        self = document.querySelectorAll(".clickable")[selfCoords];
        if(checkerElement == null){                                             //FIX THIS
          element.style.background = "blue";
          self.style.background = "black";
          function miss(){
          element.style.background = 'cyan';
          }
          window.setTimeout(miss, 150);
        }
        else if(checkerElement == element){
          element.style.background = "red";
          self.style.background = "white";
        }
        else{
          console.log("Something went wrong!!");
        }
        self.onclick = function(event){}; //es ashorebs click powers basiskali
        // self.hidden = true;              es sxva versia zeda xazis, tumca lamazi araris, tan amit fers ver shevucvli
      
      }








      //CREATE FUNTCTION 'SET IN STONE'
      //WHEN TOUCHING OTHER SHIPS THE PINK BLOCKS DISSAPEAR
      //MAKE IT NOT DO THAT


      //FIRST DO THE PROPER ONMOUSEUP FUNCTION


      //DESIGN A SYSTEM THAT FINDS SHIPS IN REAL SPACE,