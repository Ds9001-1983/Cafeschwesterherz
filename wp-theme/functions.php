<?php
/**
 * Basic Theme Setup
 */

if (!defined('ABSPATH')) {
  exit;
}

add_action('after_setup_theme', function () {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
});

/**
 * Optional: Admin-Bar im Frontend ausblenden (häufig bei "Headless/Static"-Themes sinnvoll)
 * Wenn du die Adminbar behalten willst: diese Zeile löschen.
 */
add_filter('show_admin_bar', '__return_false');