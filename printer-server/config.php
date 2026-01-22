<?php
/**
 * Printer Server Configuration
 * 
 * This file contains all configuration for the standalone print server.
 * It is completely independent from Laravel's configuration.
 */

return [
    // WebSocket Server Configuration
    'websocket' => [
        'host' => '0.0.0.0',
        'port' => 9100,
        'workers' => 1,
    ],

    // Printer Configuration
    'printer' => [
        'default_name' => 'POS-80', // Default printer name for Windows
        'paper_width' => 48, // Character width for 80mm paper
    ],

    // Receipt Configuration
    'receipt' => [
        'feed_lines' => 3, // Lines to feed before cutting
        'cut' => true, // Auto cut paper after printing
    ],

    // Logging
    'logging' => [
        'enabled' => true,
        'timezone' => 'Asia/Jakarta',
    ],
];
