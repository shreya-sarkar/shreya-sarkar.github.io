var fimg;
var bimg;
var fcnv;
var bcnv;

function loadForegroundImage(){
  //Getting foreground canvas
  fcnv=document.getElementById("cnv1");
  //Getting foreground input
  var imgip1=document.getElementById("ip1");
  //Setting fimg to the input
  fimg=new SimpleImage(imgip1);
  //Display fimg
 fimg.drawTo(fcnv);
  //Alert
  alert("Foreground Image Loaded!");
}


function loadBackgroundImage(){
  //Getting Background Canvas
  bcnv=document.getElementById("cnv2");
  //Getting background input
  var imgip2=document.getElementById("ip2");
  //Setting bimg to the input
  bimg=new SimpleImage(imgip2);
  //Display bimg
 bimg.drawTo(bcnv);
  //Alert
  alert("Background Image Loaded!");
}


function doGreenScreen(){
   //Check that images are loaded
  if (fimg == null  || ! fimg.complete()) {
    alert("Foreground image not loaded");
  }
  if (bimg == null || ! bimg.complete()) {
    alert("Background image not loaded");
  }
  // clear canvases
  clear();
  // call createComposite, which does green screen algorithm and returns a composite image
  var finimg = createComposite();
  finimg.drawTo(fcnv);
}

function createComposite(){
  //Creating output image variable
  var output=new SimpleImage(fimg.getWidth(),fimg.getHeight());
  //Define threshold value of green pixels
  var greenThreshold=240;
  //Getting green pixel values and replacing them with bimg pixels
  for (var pixel of fimg.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (pixel.getGreen() > greenThreshold) {
      //pixel is green, use background
      var bgPixel = bimg.getPixel(x,y);
      output.setPixel(x,y,bgPixel);
    }
    else {
      //pixel is not green, use foreground
      output.setPixel(x,y,pixel);
    }
  }
  return output;
}

function clear(){
  fcnv=document.getElementById("cnv1");
  bcnv=document.getElementById("cnv2");
  var ctx1 = fcnv.getContext("2d");
  ctx1.clearRect(0,0,fcnv.width,fcnv.height);
  var ctx2 = bcnv.getContext("2d");
  ctx2.clearRect(0,0,bcnv.width,bcnv.height);
  fcnv.value="";
  bcnv.value="";
}