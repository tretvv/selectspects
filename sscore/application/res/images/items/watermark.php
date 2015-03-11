<?php

$wimage = 'selectspecs.png';

if(isset($_SERVER['HTTP_HOST']))
{
   if (stripos($_SERVER['HTTP_HOST'], 'omnioptics') !== false) $wimage = 'omnioptics.png';
   if (stripos($_SERVER['HTTP_HOST'], 'optix') !== false) $wimage = 'optix.png';
}

water_mark($_SERVER['REQUEST_URI'], $wimage, "middle=0,center=0");

function water_mark($original, $watermark, $placement) 
{ 
   $arr = explode('/', urldecode($original));
   $original = $arr[count($arr)-2].'/'.$arr[count($arr)-1];
   $info_o = @getImageSize($original); 
   if (!$info_o) return false; 
         
   $info_w = @getImageSize($watermark); 
   if (!$info_w) return false; 
         
   list($vertical, $horizontal) = explode(',', $placement,2); 
   list($vertical, $sy) = explode('=', trim($vertical),2); 
   list($horizontal, $sx) = explode('=', trim($horizontal),2); 

   switch (trim($vertical)) { 
      case 'bottom': 
         $y = $info_o[1] - $info_w[1] - (int)$sy; 
         break; 
      case 'middle': 
         $y = ceil($info_o[1]/2) - ceil($info_w[1]/2) + (int)$sy; 
         break; 
      default: 
         $y = (int)$sy; 
         break; 
      } 

   switch (trim($horizontal)) { 
      case 'right': 
         $x = $info_o[0] - $info_w[0] - (int)$sx; 
         break; 
      case 'center': 
         $x = ceil($info_o[0]/2) - ceil($info_w[0]/2) + (int)$sx; 
         break; 
      default: 
         $x = (int)$sx; 
         break; 
      } 

   header("Content-Type: ".$info_o['mime']); 
   
   $original = @imageCreateFromString(file_get_contents($original)); 
   $watermark = @imageCreateFromString(file_get_contents($watermark)); 
   $out = imageCreateTrueColor($info_o[0],$info_o[1]); 

   imageCopy($out, $original, 0, 0, 0, 0, $info_o[0], $info_o[1]);
   if( ($info_o[0] > $info_w[0]) && ($info_o[1] > $info_w[1]) )
   {
        imageCopy($out, $watermark, $x, $y, 0, 0, $info_w[0], $info_w[1]);
   }
   else
        {
            $diff = $info_o[0]/1.2;
            $new_w = round($diff);
            $new_h = round($info_w[1]/($info_w[0]/$diff));
            $x = ceil($info_o[0]/2) - ceil($new_w/2) + (int)$sx;
            $y = ceil($info_o[1]/2) - ceil($new_h/2) + (int)$sy;
            imagecopyresampled($out, $watermark, $x, $y, 0, 0, $new_w, $new_h, $info_w[0], $info_w[1]);
        }

   switch ($info_o[2]) { 
      case 1: 
         imageGIF($out); 
         break; 
      case 2: 
         imageJPEG($out); 
         break; 
      case 3: 
         imagePNG($out); 
         break; 
         } 

   imageDestroy($out); 
   imageDestroy($original); 
   imageDestroy($watermark); 

   return true; 
}