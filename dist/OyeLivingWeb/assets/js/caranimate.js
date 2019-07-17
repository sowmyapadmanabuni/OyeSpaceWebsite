window.onload = function () {
    var mycar = document.getElementsByClassName('carClass');
    console.log(mycar);

    var top_stage1 = 410;
    var left_stage1 = 340;
    
    var top_stage2 = 317;
    var left_stage2 = 170;
    
    var top_stage3 = 330;
    var left_stage3 = 220;



    var start_moving = function () {
        
        if (top_stage1 > top_stage2 && left_stage1 > left_stage2) { //left-149 top-314

            top_stage1 = top_stage1 - 1;
            left_stage1 = left_stage1 - 2;
            mycar[0].style.top = top_stage1 + 'px';
            mycar[0].style.left = left_stage1 + 'px';
        }
        if(left < 240 && top > 260 ){
            mycar[0].src = 'car2.png';
            top = top - 1;
            left = left + 1;
             mycar[0].style.left = left + 'px';
            mycar[0].style.top = top + 'px';
        }
        setTimeout(start_moving, 100);

    }

    //start_moving();
}

