<?php
require_once 'includes/functions.php';
require_once 'includes/data.php';

function get_db_handler() {
  $db = new SQLite3('db/data.db');
  if (!$db) {
    die($sqliteerror);
  }
  return $db;
}
