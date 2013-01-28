<?php

function get_projects() {
  $db = get_db_handler();
  $result = $db->query('SELECT * FROM projects');
  $rows = array();
  while($res = $result->fetchArray()) {
    $rows[] = $res;
  }
  return $rows;
}

function get_talents() {
  $db = get_db_handler();
  $result = $db->query('SELECT * FROM talents');
  $rows = array();
  while($res = $result->fetchArray()) {
    $rows[] = $res;
  }
  return $rows;
}