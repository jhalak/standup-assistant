<?php

function get_projects() {
  $db = get_db_handler();
  $result = $db->query('SELECT * FROM projects');
  $rows = array();
  $count = 0;
  while($res = $result->fetchArray()) {
    $rows[$count]['id'] = $res['id'];
    $rows[$count]['name'] = $res['name'];
    $rows[$count]['type'] = $res['type'];
    $count++;
  }
  return $rows;
}

function get_talents() {
  $db = get_db_handler();
  $result = $db->query('SELECT * FROM talents');
  $rows = array();
  while($res = $result->fetchArray()) {
    $rows[] = (object)$res;
  }
  return $rows;
}

function addProject() {
  try{
    $data = json_decode($_GET['models']);
    $db = get_db_handler();
    $project = $data[0];
    $result = $db->query('INSERT INTO projects (name, type) VALUES("' . $project->name . '", "main")');
    show_as_json($data);
  }catch(Exception $e){
    echo $e->getMessage();
  }
}

function updateProject() {
  try{
    $data = json_decode($_GET['models']);
    $db = get_db_handler();
    $project = $data[0];
    $result = $db->query('UPDATE projects SET name="' . $project->name . '" WHERE id=' . $project->id);
    show_as_json($data);
  }catch(Exception $e){
    echo $e->getMessage();
  }
}

function deleteProject() {
  try{
    $data = json_decode($_GET['models']);
    $db = get_db_handler();
    $project = $data[0];
    $result = $db->query('DELETE FROM projects WHERE id=' . $project->id);
    show_as_json($data);
  }catch(Exception $e){
    echo $e->getMessage();
  }
}

function toObject($array) {
  $obj = new stdClass();
  foreach ($array as $key => $val) {
    $obj->$key = is_array($val) ? toObject($val) : $val;
  }
  return $obj;
}

function show_as_json($data) {
  header('Content-Type: application/json');
  echo json_encode($data);
}

