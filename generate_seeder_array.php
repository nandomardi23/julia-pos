<?php

$lines = file('temp_user_data.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
$products = [];

foreach ($lines as $line) {
    // Split by tabs or multiple spaces
    $parts = preg_split('/(?:\t| {2,})/', trim($line));
    $parts = array_values(array_filter($parts, function ($v) {
        return trim($v) !== ''; }));

    if (count($parts) < 8)
        continue;

    // 0: No (ID)
    // 1: Name
    // 2: Category
    // 3: Buy
    // 4: Sell
    // 5: Unit
    // 6: Barcode
    // 7: Qty

    $id = (int) $parts[0];
    $name = trim($parts[1]);
    $category = trim($parts[2]);
    $buy = (float) str_replace(['Rp', ',', ' '], '', $parts[3]);
    $sell = (float) str_replace(['Rp', ',', ' '], '', $parts[4]);
    $unit = trim($parts[5]);
    $barcode = trim($parts[6]);
    $qty = (float) trim($parts[7]); // Keep as float for now, but in seeder we might want specific formatting

    // Escape single quotes in name
    $name = str_replace("'", "\'", $name);

    echo "            [{$id}, '{$name}', '{$category}', {$buy}, {$sell}, '{$unit}', '{$barcode}', {$qty}],\n";
}
