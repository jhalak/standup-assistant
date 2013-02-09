<?php
require_once 'includes/config.php';
$query = !empty($_GET['q']) ? $_GET['q'] : '';
switch($query) {
  case 'projects':
    $data = get_projects();
    header('Content-Type: application/json');
    echo json_encode(array('data' => $data));
    break;
    
  case 'talents':
    $data = get_talents();
    header('Content-Type: application/json');
    echo json_encode(array('data' => $data));
  	break;
  	
  case 'project':
    $action = $_GET['action'];
    switch($action) {
      case 'add':
        addProject();
        break;
        
      case 'update':
        updateProject();
        break;
        
      case 'delete':
        deleteProject();
        break;
        
      case 'list':
      default:
        $data = get_projects();
        show_as_json($data);
        break;
    }
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