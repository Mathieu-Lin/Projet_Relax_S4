var currentImg = 0;
var imgs = document.querySelectorAll('.slider img');
let dots = document.querySelectorAll('.navigation-button .dot');


const progressBar = document.querySelector('.progress_bar');

progressBar.style.display = "block";
let  time = 0;
let tour = 1;
setInterval(function (){
  if(time == 1300) {
    changeSlide();
    if(tour == 4){
      tour = 1;
    }else{
      tour ++;
    }
    time = 0;
  }else{
    let percentage = Math.floor((time * 100) / 1250); // pourcentage du site déjà parcouru
    if(tour % 2 == 0 && tour % 4 != 0){
    // console.log('tour % 2 == 0')
      progressBar.style.left ='0' + percentage + '%';
      progressBar.style.right ='0%';
    }else if(tour % 3 == 0 ){
    // console.log('tour % 3 == 0')
      progressBar.style.left ='100' - percentage + '%';
      progressBar.style.right ='0%';
    }else if(tour % 4 == 0){
    // console.log('tour % 4 == 0')
      progressBar.style.right ='0' + percentage + '%';
      progressBar.style.left ='0%';
    }else{
    // console.log('else')
      progressBar.style.right ='100' - percentage + '%';
      progressBar.style.left ='0%';
    }
    time++;
  }
}, 0.25);


function changeSlide(n) {
  for (var i = 0; i < imgs.length; i++) {
    imgs[i].style.opacity = 0;
    dots[i].className = dots[i].className.replace(' active', '');
  }

  currentImg = (currentImg + 1) % imgs.length;

  if (n != undefined) {
    currentImg = n;
    time = 0;
  }

  imgs[currentImg].style.opacity = 1;
  dots[currentImg].className += ' active';
}
/************************************************************************************* */
var currentImgMini = 0;
var imgs_mini = document.querySelectorAll('.slider_mini img');
let dots_mini = document.querySelectorAll('.navigation-button_mini > .dot');



setInterval(changeSlideMini, 5000);
function changeSlideMini(n) {
  for (var i = 0; i < imgs_mini.length; i++) {
    imgs_mini[i].style.opacity = 0;
    dots_mini[i].className = dots_mini[i].className.replace(' active', '');
  }

  currentImgMini = (currentImgMini + 1) % imgs_mini.length;

  if (n != undefined) {
    currentImgMini = n;
  }

  imgs_mini[currentImgMini].style.opacity = 1;
  dots_mini[currentImgMini].className += ' active';
}