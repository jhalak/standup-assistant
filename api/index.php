<?php
require_once 'includes/config.php';
$method = $_SERVER['REQUEST_METHOD'];
$request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));

switch ($method) {
  case 'JSON':
  case 'GET':
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
    
      case 'all':
        $data = array(
      		'projects' => get_projects(),
      		'talents' => get_talents(),
      );
      echo json_encode($data);
      break;
    }
    break;
    
  case 'DELETE':
    $request = convertUrlQuery($_SERVER['QUERY_STRING']);
    $query = $request['q'];
    switch($query) {
      case 'projects':
        $data = get_projects();
        show_as_json($data);
        break;
    
      case 'talents':
        detete_talent($request['id']);
        $data = get_talents();
        show_as_json(array('data' => $data));
        break;
    }
    break;
    
  case 'PUT':
    $data = file_get_contents('php://input');
    $request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));
    switch ($request[0]) {
      case 'talent':
        switch($request[1]){
          case 'add':
            $request = convertUrlQuery($data);
            echo addTalent($request);
            break;
          case 'update':
            $data = json_decode($data);
            updateTalent($data);
            break;
        }
        break;
    }
    break;
}


die();