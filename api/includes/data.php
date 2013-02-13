<?php

function get_talents() {
  $db = get_db_handler();
  $result = $db->query('SELECT * FROM talents ORDER BY name ASC');
  $rows = array();
  $count = 0;
  while($res = $result->fetchArray()) {
    $rows[$count]['id'] = $res['id'];
    $rows[$count]['name'] = $res['name'];
    $rows[$count]['email'] = $res['email'];
    $count++;
  }
  return $rows;
}

function addTalent($data) {
  try{
    $db = get_db_handler();
    $db->query('INSERT INTO talents (name, email) VALUES("' . $data['name'] . '", "' . urldecode($data['email']) . '")');
    $result = $db->query('SELECT id FROM talents ORDER BY id desc LIMIT 1');
    $res = $result->fetchArray();
    $id = $res['id']; 
    show_as_json(array('id' => $id));
  }catch(Exception $e){
    echo $e->getMessage();
  }
}

function updateTalent($data) {
  try{
    $db = get_db_handler();
    $result = $db->query('UPDATE talents SET name="' . $data->name . '", email="' . $data->email . '" WHERE id=' . $data->id);
    show_as_json($data);
  }catch(Exception $e){
    echo $e->getMessage();
  }
}

function detete_talent($id) {
  try{
    $db = get_db_handler();
    $db->query('DELETE FROM talents WHERE id = ' . $id);
  }catch(Exception $e){
    echo $e->getMessage();
  }
}

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

