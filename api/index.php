<?php
require_once 'includes/config.php';
$query = !empty($_GET['q']) ? $_GET['q'] : '';
switch($query) {
  case 'projects':
    $data = get_projects();
    echo json_encode(array('data' => $data));
    break;
  case 'talents':
    $data = get_talents();
    echo json_encode($data);
  	break;
  default:
    $data = array(
  		'projects' => get_projects(),
  		'talents' => get_talents(),
    );
    echo json_encode($data);
    break;
}
die();