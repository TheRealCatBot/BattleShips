let currentDroppable = null;
var allElements = null;
var rotation = 0;
let belowCurrentDroppable = null;
var lever = false;
var lever2 = false;
let lever3 = false;
let sentFromOvrlp = false;
var location_buffer;
var tagged_elements = [""];
let baseLocation = Array(2);

var overlapTaggedElements = new Array(21);
for (var i = 0; i < overlapTaggedElements.length; i++) {
  overlapTaggedElements[i] = new Array(2);
}

oriani_1.onmousedown = function(event){drag_and_drop(event, oriani_1, 2)};
oriani_2.onmousedown = function(event){drag_and_drop(event, oriani_2, 2)};
oriani_3.onmousedown = function(event){drag_and_drop(event, oriani_3, 2)};
samiani_1.onmousedown = function(event){drag_and_drop(event, samiani_1, 3)};

      function drag_and_drop(event, selfObj, length) {
        let shiftX = event.clientX - selfObj.getBoundingClientRect().left - 25;                                   //FIX THIS
        let shiftY = event.clientY - selfObj.getBoundingClientRect().top - 25;
        // let shiftX = selfObj.getBoundingClientRect().left - 25;
        // let shiftY = selfObj.getBoundingClientRect().top - 25;
        selfObj.style.position = 'absolute';
        selfObj.style.zIndex = 1000;
        document.body.append(selfObj);
        // baseLocation = [selfObj.x, selfObj.y]
        baseLocation = [697.6, 8];

        moveAt(event.pageX, event.pageY);
  
        function moveAt(pageX, pageY) {
          if((pageX - shiftX >= 5 && pageX - shiftX <= 605) && (pageY - shiftY >= 100 && pageY - shiftY <= 700)){     
            selfObj.style.left = pageX - shiftX - (pageX - shiftX) % 50 +5+ 'px';
            selfObj.style.top = pageY - shiftY - (pageY - shiftY) % 50 + 'px';
          }else{
            selfObj.style.left = pageX - shiftX + 'px';
            selfObj.style.top = pageY - shiftY + 'px';
          }
          for (let i = 1; i < amongaia.length; i++) {
            amongaia[i].style.background = 'pink';
          }
          for(var i = 0; i < amongaia.length; i++){
            overlapTaggedElements[i][0] = amongaia[i].x + 7;
            // console.log((amongaia[i].x + 7))
            overlapTaggedElements[i][1] = amongaia[i].y;
            }
          if(lever3){
          for(var i = 0; i<overlapTaggedElements.length;i++){
            let tempLocatVarX = Math.floor((pageX - shiftX + 50)/50)*50-50
            let tempLocatVarY = Math.floor((pageY - shiftY - 50)/50)*50+50                                 
            // console.log(overlapTaggedElements[i][1])                              //FIXED
            // console.log(tempLocatVarY + " templocatx")
            // console.log(overlapTaggedElements[i][1] == tempLocatVarY && overlapTaggedElements[i][0]-12 == tempLocatVarX)
            if((overlapTaggedElements[i][0]-12 == tempLocatVarX && overlapTaggedElements[i][1] == tempLocatVarY) || (overlapTaggedElements[i][0]-12 == tempLocatVarX - (50 * rotation) && overlapTaggedElements[i][1] == tempLocatVarY + 50*(1-rotation))){
              
              // document.removeEventListener('mousemove', onMouseMove);             //THIS ACTUALLY WORKS, BUT LOCKS THE SHIP AFTER JUMP, NEEDS FIXING
              console.log("im legit working dead on jod")                             
              selfObj.style.left = `${baseLocation[0]}px`
              selfObj.style.top = `${baseLocation[1]}px`
              sentFromOvrlp = true;
              // document.querySelector(`[id^="x=${overlapTaggedElements[i][0]} y=${overlapTaggedElements[i][1]}"]`).style.background = "red"; //FIX THIS WITH PROPER COORDINATES
            }
          }}


        document.addEventListener('mouseup', function(event) {   
          document.removeEventListener('mousemove', onMouseMove);
          selfObj.onmouseup = null;
          if((pageX - shiftX >= 5 && pageX - shiftX <= 605) && (pageY - shiftY >= 100 && pageY - shiftY <= 700 && !sentFromOvrlp)){        //THIS NEEDS FIXING, WHENEVER SHIP IS DRAGGED ON TO THE GRID, THEN DRAGGED OFF, IT STILL FREEZES EVEN THOUGH IT IS OUTSIDE THE GRID
            selfObj.onmousedown = function(event){};
          };
          setInStone();
          lever3 = true;
          //AQ UNDA CHAVAMATO KODI, ROMELIC POULOBS DA AGNISHNAVS YVELA DATAGULI ELEMENTIS KOORDINATEBS

        });

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
                selfObj.style.tansform = 'rotate(90)';
              }
              amogus();
              setInStone();
            }
            
        });

          document.addEventListener('keyup', function(event) { 
              lever = false;
          });


          if (!elemBelow) return;
  
          let droppableBelow = elemBelow.closest('.droppable');
          let droppableBelowBelow = elemBelowBelow.closest(".droppable");
          function amogus(){
            if (currentDroppable != droppableBelow) {
              if (currentDroppable) { // null when we were not over a droppable before this event
                leaveDroppable(breakAwayLeaveDroppable(currentDroppable, length, rotation));

                // console.log(breakAwayLeaveDroppable(droppableBelow, 2, 0)) //abrunebs location-s, location aris array romelshic aris koordinatebi aseve arrays saxit
              }
              currentDroppable = droppableBelow;
              belowCurrentDroppable = droppableBelowBelow;
              if (currentDroppable) { // null if we're not coming over a droppable now
                // (maybe just left the droppable)
                // console.log(enterDroppable(breakAwayLeaveDroppable(currentDroppable, 2, rotation)));
                if(!sentFromOvrlp)  enterDroppable(breakAwayLeaveDroppable(currentDroppable, length, rotation));
                sentFromOvrlp = false;
              }
              allElements = document.querySelectorAll('[id$="tagged"]');
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
          object.style.background = 'pink';
          object.id += " tagged";
        })
        tagged_elements = document.querySelectorAll('[id$="tagged"]');        
        var x = new Array(20);
        var y = new Array(20);
        for (let i = 0; i < tagged_elements.length; i++) {
          for (let j = 0; j < 2; j++) {
            split_id = tagged_elements[i].id.split(" ");
            x[i] = parseInt(split_id[0].split("=")[1]);             
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
        corePos = _corePos.split(" ");
        for (let i = 0; i < corePos.length; i++) {
          temp = corePos[i].split("=");
          corePos[i] = parseInt(temp[1]);
        }

        var location = new Array(shipLength-1);
        for (let i = 0; i < shipLength; i++) {
          location[i] = new Array(1);
        }
        if(rotation == 0){ //gemis cxviri iyureba qvevit
          if(location_buffer != null){
          leaveDroppable(location_buffer);
          }
          for (let i = 0; i < shipLength; i++) {
            if(corePos[1] < (13 - shipLength)){             //ADD ROTATION
              location[i][0] = corePos[0];            
              location[i][1] = corePos[1] + i;
            }else{
              location[i][0] = corePos[0];            
              location[i][1] = corePos[1] - i;
            }
          }
          location_buffer = location;
          // if(location[location.length-1][1] >= 11) location[location.length-1][1] = corePos[1] - 50*(shipLength+1)
          // if(location[location.length-1][1] > 11) console.log("+11 haha")

          return location;
          
        }else if(rotation == 1){ //gemis cxviri iyureba marcxniv
          leaveDroppable(location_buffer);
          for (let i = 0; i < shipLength; i++) {
            if(corePos[0] > shipLength){
            location[i][0] = corePos[0] - i;
            location[i][1] = corePos[1];
            }else{
            location[i][0] = corePos[0] + i;
            location[i][1] = corePos[1];
            }
          }
          location_buffer = location;
          // if(location[location.length-1][0] >= 11) location[location.length-1][0] = corePos[0] + 50*(shipLength+1)
          // if(location[location.length-1][0] > 11) console.log("-11 haha")
          
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
          // console.log(temp2);
          amongaia = Array.prototype.concat.call(...amongaia , ...temp2);
          for (let i = 1; i < amongaia.length; i++) {
            amongaia[i].style.background = 'pink';
          }
          sentFromOvrlp = false;
        }
      }

      function enemyCoords(coords, selfCoords){
        element = document.querySelector(`[id^="${coords}"]`);
        checkerElement = document.querySelectorAll(`[id$="tagged"]`);
        self = document.querySelectorAll(".clickable")[selfCoords];
        if(!amongaia.includes(element)){                                             
          element.style.background = "blue";
          self.style.background = "black";
          function miss(){
          element.style.background = 'cyan';
          }
          window.setTimeout(miss, 150);
        }
        else if(amongaia.includes(element)){
          element.style.background = "red";
          self.style.background = "white";
        }
        else{
          console.log("Something went wrong!!");
        }
        self.onclick = function(event){}; //es ashorebs click powers basiskali
        // self.hidden = true;              es sxva versia zeda xazis, tumca lamazi araris, tan amit fers ver shevucvli
      
      }



      //almost done with overlapping, needs a bit more polishing, but its mostly good to go
      //there is a bit of a visual glitch in the algorithm, if ships core block is the one overlapping and the rest of the ship is sticking out, it will still color them pink but will not get tagged
      //
      //NEXT UP ON THE LIST: fixing the code for ships that are larger (and smaller) that 2