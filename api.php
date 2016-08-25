<?php

$total=0;
$uploaded=0;
$response=array();
$message="";
$file_names=array();
if(!empty($_FILES)){
	$total=count($_FILES);
	foreach ($_FILES as $key => $file) {

		// removing spaces in file name
		$name=str_replace(' ','',$file['name'].trim());

		$timeStamp=date('d-m-Y-His',time());

		// making the file name unique.
		$newfileName=$timeStamp.'-'.$name;
        
        if(move_uploaded_file($file['tmp_name'],'uploads/'.$newfileName)){
        	$uploaded++;
        	$file_names[]=$newfileName;
        }
	}
	$message="$uploaded out of $total file uploaded";
}
else{
	$message="No attached file.";
}
$response['message']=$message;
$response['files']=$file_names;
echo json_encode($response);

?>