<?php
/**
 * Create Storage Symlink for Shared Hosting
 * 
 * USAGE:
 * 1. Upload this file to your project root on the server
 * 2. Access via browser: https://yourdomain.com/create_symlink.php
 * 3. DELETE THIS FILE IMMEDIATELY after symlink is created!
 * 
 * WARNING: Delete this file after use for security reasons!
 */

// Adjust paths if your public_html structure is different
$targetFolder = __DIR__ . '/storage/app/public';
$linkFolder = __DIR__ . '/public/storage';

// For Hostinger/cPanel where public_html IS the public folder
// Uncomment these lines instead if your structure is: public_html/storage, storage/app/public
// $targetFolder = dirname(__DIR__) . '/storage/app/public';
// $linkFolder = __DIR__ . '/storage';

echo "<h2>Laravel Storage Symlink Creator</h2>";
echo "<hr>";

// Check if symlink already exists
if (file_exists($linkFolder)) {
    if (is_link($linkFolder)) {
        echo "<p style='color: green;'>✓ Symlink already exists at: <code>{$linkFolder}</code></p>";
        echo "<p>Target: <code>" . readlink($linkFolder) . "</code></p>";
    } else {
        echo "<p style='color: orange;'>⚠ A folder/file already exists at: <code>{$linkFolder}</code></p>";
        echo "<p>Please remove it manually first if you want to create a symlink.</p>";
    }
    exit;
}

// Check if target exists
if (!file_exists($targetFolder)) {
    echo "<p style='color: red;'>✗ Target folder does not exist: <code>{$targetFolder}</code></p>";
    echo "<p>Make sure your storage/app/public folder exists.</p>";
    exit;
}

// Try to create symlink
try {
    $result = symlink($targetFolder, $linkFolder);
    
    if ($result) {
        echo "<p style='color: green;'>✓ Symlink created successfully!</p>";
        echo "<p>Link: <code>{$linkFolder}</code></p>";
        echo "<p>Target: <code>{$targetFolder}</code></p>";
        echo "<hr>";
        echo "<p style='color: red; font-weight: bold;'>⚠ IMPORTANT: DELETE THIS FILE NOW!</p>";
        echo "<p>This file should be deleted immediately for security reasons.</p>";
    } else {
        echo "<p style='color: red;'>✗ Failed to create symlink.</p>";
        echo "<p>Your hosting may not support symlinks. Try using FILESYSTEM_DISK=public_direct in .env instead.</p>";
    }
} catch (Exception $e) {
    echo "<p style='color: red;'>✗ Error: " . $e->getMessage() . "</p>";
    echo "<p>Your hosting may not support symlinks. Try using FILESYSTEM_DISK=public_direct in .env instead.</p>";
}
